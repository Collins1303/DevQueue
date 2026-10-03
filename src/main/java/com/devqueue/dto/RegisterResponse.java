package com.devqueue.dto;

// This class defines the information we are allowed to
// send back to the frontend after a successful registration.
public class RegisterResponse {

    // The user's database ID.
    private Long id;

    // The user's first name.
    private String firstName;

    // The user's last name.
    private String lastName;

    // The user's email address.
    private String email;

    // The user's role in DevQueue.
    private String role;

    // Empty constructor required for creating the object.
    public RegisterResponse() {
    }

    // Constructor used to create a response from a User object.
    public RegisterResponse(Long id, String firstName, String lastName,
                            String email, String role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    // Returns the user's ID.
    public Long getId() {
        return id;
    }

    // Sets the user's ID.
    public void setId(Long id) {
        this.id = id;
    }

    // Returns the user's first name.
    public String getFirstName() {
        return firstName;
    }

    // Sets the user's first name.
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // Returns the user's last name.
    public String getLastName() {
        return lastName;
    }

    // Sets the user's last name.
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    // Returns the user's email.
    public String getEmail() {
        return email;
    }

    // Sets the user's email.
    public void setEmail(String email) {
        this.email = email;
    }

    // Returns the user's role.
    public String getRole() {
        return role;
    }

    // Sets the user's role.
    public void setRole(String role) {
        this.role = role;
    }
}