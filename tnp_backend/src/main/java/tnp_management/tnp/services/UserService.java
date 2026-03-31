package tnp_management.tnp.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return   userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("user not found"));
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow( () -> new RuntimeException("jadedness"));
    }



}
