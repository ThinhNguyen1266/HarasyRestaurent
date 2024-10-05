package group5.swp.HarasyProject.service;

public interface RedisService {
    public void addTokenToBlacklist(String jit, long expirationTime);
    public boolean isTokenInBlacklist(String jit);
    public void storeRefreshToken(String username, String jit, long expirationTimeInMillis);
    public boolean isRefreshToken(String username, String jitRequest);
    public void deleteRefreshToken(String username);
}
