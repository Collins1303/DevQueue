package com.devqueue.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    /*
     * Creates the password encoder used to hash
     * and verify user passwords.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * Configures the security rules for the DevQueue API.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            /*
             * Enables CORS so that the React frontend
             * running on localhost:5173 can communicate
             * with our Spring Boot backend.
             */
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            /*
             * Disables CSRF for our current REST API setup.
             */
            .csrf(csrf -> csrf.disable())

            /*
             * Defines which API endpoints are currently
             * allowed without authentication.
             */
            .authorizeHttpRequests(auth -> auth

                /*
                 * Allows registration and login without authentication.
                 */
                .requestMatchers("/api/auth/**").permitAll()

                /*
                 * Temporarily allows organization endpoints
                 * while we connect the frontend and backend.
                 */
                .requestMatchers("/api/organizations/**").permitAll()

                /*
                 * Temporarily allows project endpoints
                 * while we connect the frontend and backend.
                 */
                .requestMatchers("/api/projects/**").permitAll()

                /*
                 * Temporarily allows task endpoints,
                 * including GET, POST, PUT and DELETE.
                 */
                .requestMatchers("/api/tasks/**").permitAll()

                /*
                 * Any other endpoint requires authentication.
                 */
                .anyRequest().authenticated()
            )

            /*
             * Disables Spring Security's default browser
             * login form because DevQueue has its own React login page.
             */
            .formLogin(form -> form.disable());

        /*
         * Builds and returns the security filter chain.
         */
        return http.build();
    }

    /*
     * Configures Cross-Origin Resource Sharing (CORS).
     *
     * This allows our React frontend at:
     *
     * http://localhost:5173
     *
     * to communicate with our Spring Boot backend at:
     *
     * http://localhost:8080
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        // Create a new CORS configuration.
        CorsConfiguration configuration = new CorsConfiguration();

        /*
         * Allow requests from our React development server.
         */
        configuration.setAllowedOrigins(
            java.util.List.of("http://localhost:5173")
        );

        /*
         * Allow the HTTP methods used by DevQueue.
         */
        configuration.setAllowedMethods(
            java.util.List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            )
        );

        /*
         * Allow all request headers.
         *
         * This is useful because React will send headers
         * such as Content-Type when sending JSON.
         */
        configuration.setAllowedHeaders(
            java.util.List.of("*")
        );

        /*
         * Apply this CORS configuration to every
         * endpoint in the Spring Boot application.
         */
        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}