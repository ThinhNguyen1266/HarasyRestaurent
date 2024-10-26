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
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {

    String[] PUBLIC_ENDPOINT = {
            "/users", "/regis/user", "/auth/**", "/uploadImage", "/profile/{AccountId}"
            , "/reservations", "/search", "/reservation/{id}"
            , "/branches",
    };
    String[] GET_PUBLIC_ENDPOINT ={
            "/branch/{id}","/branch/{id}/tables","/branch/{id}/menus",
            "/menu/{id}"
    };
    CustomJwtDecoder jwtDecoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(requests ->
                requests
                        .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.GET,GET_PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.GET, "/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/staff", "/sorted", "/staff/{role}").hasRole("BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.POST, "/branch").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/branch/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/branch/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/branch/{id}/tables").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/table/{id}").hasAnyRole("BRANCH_MANAGER","RECEPTIONIST","WAITER")
                        .requestMatchers(HttpMethod.POST,"/branch/{id}/menus").hasRole("BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.PUT,"/menu/{id}").hasRole("BRANCH_MANAGER")
                        .requestMatchers(HttpMethod.DELETE,"/menu/{id}","/table/{id}").hasRole("BRANCH_MANAGER")
                        .anyRequest().authenticated()
        );
        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())

                ).authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                        .accessDeniedHandler(new CustomAccessDeniedHandler())
        );
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
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
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedOrigin("http://localhost:3000");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}
