package com.devqueue.service;

import com.devqueue.entity.User;
import com.devqueue.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    // Repository used to communicate with the users table.
    private final UserRepository userRepository;

    // Encoder used to securely hash and verify passwords.
    private final PasswordEncoder passwordEncoder;

    // Constructor injection provides the required dependencies.
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Registers a new user.
    public User register(User user) {

        // Check whether another account already uses this email.
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        // Hash the user's password before saving it.
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user in the database.
        return userRepository.save(user);
    }

    // Logs an existing user into DevQueue.
    public User login(String email, String password) {

        // Find the user using the email address.
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid email or password"));

        // Compare the entered password with the stored BCrypt hash.
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Return the authenticated user.
        return user;
    }
}