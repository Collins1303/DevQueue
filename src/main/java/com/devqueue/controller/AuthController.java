package com.devqueue.controller;

import com.devqueue.dto.LoginRequest;
import com.devqueue.dto.LoginResponse;
import com.devqueue.dto.RegisterRequest;
import com.devqueue.dto.RegisterResponse;
import com.devqueue.entity.User;
import com.devqueue.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Gives this controller access to the authentication business logic.
    private final AuthService authService;

    // Constructor injection provides AuthService to this controller.
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Handles POST requests sent to /api/auth/register.
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestBody RegisterRequest request) {

        // Create a new User entity from the registration information.
        User user = new User();

        // Copy the information from the request into the User object.
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        // Send the user to AuthService to validate and save it.
        User registeredUser = authService.register(user);

        // Create a safe response that does not contain the password.
        RegisterResponse response = new RegisterResponse(
                registeredUser.getId(),
                registeredUser.getFirstName(),
                registeredUser.getLastName(),
                registeredUser.getEmail(),
                registeredUser.getRole().name()
        );

        // Send the registration response back to the frontend.
        return ResponseEntity.ok(response);
    }

    // Handles POST requests sent to /api/auth/login.
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        // Ask AuthService to verify the email and password.
        User user = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        // Create a safe response without exposing the password.
        LoginResponse response = new LoginResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().name()
        );

        // Send the login response back to the frontend.
        return ResponseEntity.ok(response);
    }
}