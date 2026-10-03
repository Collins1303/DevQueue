package com.devqueue.dto;

// This class represents the information sent by a user
// when they attempt to log into DevQueue.
public class LoginRequest {

    // Stores the email entered by the user.
    private String email;

    // Stores the password entered by the user.
    private String password;

    // Empty constructor used when Spring creates this object
    // from the JSON request.
    public LoginRequest() {
    }

    // Returns the user's email.
    public String getEmail() {
        return email;
    }

    // Sets the user's email.
    public void setEmail(String email) {
        this.email = email;
    }

    // Returns the user's password.
    public String getPassword() {
        return password;
    }

    // Sets the user's password.
    public void setPassword(String password) {
        this.password = password;
    }
}