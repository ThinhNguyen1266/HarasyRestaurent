package group5.swp.HarasyProject.service;

public interface RedisService {
    void addTokenToBlacklist(String jit, long expirationTime);

    boolean isTokenInBlacklist(String jit);

    void storeRefreshToken(String username, String jit, long expirationTimeInMillis);

    boolean isRefreshToken(String username, String jitRequest);

    void deleteRefreshToken(String username);

    void addOtp(String otp,String email);

    boolean checkOtp(String otp,String email);

    void deleteOtp(String email);

}
