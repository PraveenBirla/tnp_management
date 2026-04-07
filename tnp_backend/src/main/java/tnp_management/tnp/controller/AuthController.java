package tnp_management.tnp.controller;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.annotation.*;
import tnp_management.tnp.dto.LoginRequest;
import tnp_management.tnp.dto.LoginResponse;
import tnp_management.tnp.dto.RegistrationRequestDTO;
import tnp_management.tnp.services.AuthService;

import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public  ResponseEntity<Map<String, String>> register( @Valid  @RequestBody RegistrationRequestDTO dto){
         authService.register(dto);
         return ResponseEntity.ok(Map.of("message", "add successfully"));

    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login( @Valid  @RequestBody LoginRequest request , HttpServletResponse response)
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

//    @Value("${MAIL_USERNAME}")
//    private  String testvariable;
//    @GetMapping("/hello")
//    public ResponseEntity<Map<String , String>> hello(){
//           return ResponseEntity.ok(Map.of("hello" , testvariable));
//    }
}
