package tnp_management.tnp.services;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.LoginRequest;
import tnp_management.tnp.dto.LoginResponse;
import tnp_management.tnp.repositories.UserRepository;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(JwtService jwtService, AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        Authentication authentication =authenticationManager.authenticate(
         new UsernamePasswordAuthenticationToken(request.getUsername() , request.getPassword())
        );

        User user =  (User) authentication.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);


         String role = String.valueOf(user.getRole());


        LoginResponse response = new LoginResponse(accessToken , refreshToken , role);

        return response;


    }

    public String register(User user) {
        User toBecreade = user;
        toBecreade.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "add successfully";
    }

    public LoginResponse refreshtoken(String refreshToken) {

        if (jwtService.isTokenExpired(refreshToken)) {
            throw new AuthenticationServiceException("Refresh token expired");
        }

        // 2. Extract user ID from token
        Long userId = jwtService.getUserIdFromToken(refreshToken);

        // 3. Load user from DB
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AuthenticationServiceException("User not found"));

        // 4. Generate new tokens
        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user); // optional: rotate refresh token


        LoginResponse response = new LoginResponse();
        response.setAccessToken(newAccessToken);
        response.setRefreshToken(newRefreshToken);
        response.setRole(user.getRole().toString());

        return response;


    }
}
