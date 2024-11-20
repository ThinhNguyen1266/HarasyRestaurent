package group5.swp.HarasyProject.config;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {

    String[] PUBLIC_ENDPOINT = {
            "/auth/login","/auth/validateOtp","/auth/introspect","/auth/refreshToken"
            ,"/users", "/regis/user", "/uploadImage", "/profile/{id}"
            , "/reservations", "/search", "/reservation/{id}"
            ,"/customer/branches","/foods","/staff","/reserve/availableTime","/resend/otp"
    };
    String[] GET_PUBLIC_ENDPOINT ={
                "/branch/{id}","/branch/{id}/tables","/branch/{id}/menus",
            "/menu/{id}","/food/{id}","/branches/home/**", "/otp","/branch/home/{id}"
    };
    CustomJwtDecoder jwtDecoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.cors(corsCustomizer -> corsCustomizer.configurationSource(corsConfigurationSource()));
        httpSecurity.authorizeHttpRequests(requests ->
                requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.GET,GET_PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.POST, "/branch").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/staff/{id}").hasAnyRole("ADMIN","BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.PUT,"/staff/{id}").hasAnyRole("ADMIN","BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.GET,  "/sorted").hasRole("BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.POST, "/branch","/regis/staff").hasAnyRole("ADMIN","BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/branch/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/branch/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/branch/{id}/tables").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/table/{id}").hasAnyRole("BRANCH_MANAGER","RECEPTIONIST","WAITER")
                        .requestMatchers(HttpMethod.POST, "/quickregis/user").hasRole("WAITER")
                        .requestMatchers(HttpMethod.POST,"/branch/{id}/menus","/food").hasRole("BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.PUT,"/menu/{id}","/food/{id}").hasRole("BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.DELETE,"/menu/{id}","/table/{id}","/food/{id}").hasRole("BRANCH_MANAGER")
                        .anyRequest().authenticated()
        );
        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())

                ).authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                        .accessDeniedHandler(new CustomAccessDeniedHandler())
        );
        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedOrigin("http://localhost:3000/");
        corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
