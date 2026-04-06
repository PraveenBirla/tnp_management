package tnp_management.tnp.services;


import org.modelmapper.ModelMapper;
import org.modelmapper.internal.bytebuddy.implementation.bytecode.Throw;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.LoginRequest;
import tnp_management.tnp.dto.LoginResponse;
import tnp_management.tnp.dto.RegistrationRequestDTO;
import tnp_management.tnp.repositories.UserRepository;

import java.util.Optional;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    public AuthService(JwtService jwtService, AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    public LoginResponse login(LoginRequest request) {

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            User user = (User) authentication.getPrincipal();

            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);


            String role = String.valueOf(user.getRole());


            LoginResponse response = new LoginResponse(accessToken, refreshToken, role);

            return response;

        }
        catch (BadCredentialsException ex){
            throw  new BadCredentialsException("Invalid email or password");
        }
    }



    public LoginResponse refreshtoken(String refreshToken) {

        if (jwtService.isTokenExpired(refreshToken)) {
            throw new AuthenticationServiceException("Refresh token expired");
        }


        Long userId = jwtService.getUserIdFromToken(refreshToken);


        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AuthenticationServiceException("User not found"));


        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user); // optional: rotate refresh token


        LoginResponse response = new LoginResponse();
        response.setAccessToken(newAccessToken);
        response.setRefreshToken(newRefreshToken);
        response.setRole(user.getRole().toString());

        return response;


    }

    public void register(RegistrationRequestDTO dto) {

        Optional<User> user  = userRepository.findByEmail(dto.getEmail());
        if(user.isPresent()){
            throw new BadCredentialsException("user with email already present");
        }

        User toBecreated = modelMapper.map(dto , User.class);
        toBecreated.setPassword(passwordEncoder.encode(toBecreated.getPassword()));
        userRepository.save(toBecreated);
    }
}
