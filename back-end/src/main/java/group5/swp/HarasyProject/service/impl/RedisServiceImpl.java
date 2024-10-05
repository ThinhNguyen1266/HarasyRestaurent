package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.service.RedisService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {
    private RedisTemplate<String, String> redisTemplate;


    public void addTokenToBlacklist(String jit, long expirationTime) {
        String key = "blacklist:"+jit;
        redisTemplate.opsForValue().set(key,"", expirationTime, TimeUnit.MILLISECONDS);
    }

    public boolean isTokenInBlacklist(String jit) {
        String key = "blacklist:"+jit;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void storeRefreshToken(String username, String jit, long expirationTimeInMillis) {
        redisTemplate.opsForValue().set("refreshToken:" + username, jit, expirationTimeInMillis, TimeUnit.MILLISECONDS);
    }

    public boolean isRefreshToken(String username, String jitRequest) {
        String jit = redisTemplate.opsForValue().get("refreshToken:" + username);
        return jit != null && jit.equals(jitRequest);
    }
    public void deleteRefreshToken(String username) {
        String key = "refreshToken:"+username;
        redisTemplate.delete(key);
    }
}
