package tnp_management.tnp.services;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.User;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Set;

@Service
public class JwtService {

    @Value("${jwt.secret_key}")
    private String secret_key;

    public SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(secret_key.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(User user){
        return   Jwts.builder()
                .subject(user.getId().toString())
                .claim("email" , user.getEmail())
                .claim("roles" , user.getRole().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 15*60*1000))
                .signWith(getSecretKey())
                .compact();
    }

    public String generateRefreshToken(User user){
        return   Jwts.builder()
                .subject(user.getId().toString())
                .claim("email" , user.getEmail())
                .claim("roles" ,user.getRole().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 7*24*60*60* 1000))
                .signWith(getSecretKey())
                .compact();
    }

    public Long getUserIdFromToken(String token){
        Claims claims = Jwts
                .parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return Long.valueOf(claims.getSubject());
    }

    public boolean isTokenExpired(String token){
        try {
            Claims claims = Jwts
                    .parser()
                    .verifyWith(getSecretKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            Date expiration = claims.getExpiration();
            return expiration.before(new Date());
        } catch (Exception e) {

            return true;
        }
    }
}
