package tnp_management.tnp.controller;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.LoginRequest;
import tnp_management.tnp.dto.LoginResponse;
import tnp_management.tnp.services.AuthService;

import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user){
      return  authService.register(user);

    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request , HttpServletResponse response)
    {
       LoginResponse loginResponse = authService.login(request);

       String accessToken = loginResponse.getAccessToken();
       String refreshToken = loginResponse.getRefreshToken();

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60);

        response.addCookie(refreshCookie);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/refresh")
    public  ResponseEntity<LoginResponse> refresh(HttpServletRequest request){
        String refreshtoken = Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .map( cookie -> cookie.getValue())
                .orElseThrow( () -> new AuthenticationServiceException("refresh token not found")
                );

        LoginResponse loginResponseDto = authService.refreshtoken(refreshtoken);

        return ResponseEntity.ok(loginResponseDto);
    }
}
