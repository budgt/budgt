package de.budgt.gateway.controllers;

import static org.springframework.http.ResponseEntity.ok;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.budgt.gateway.config.JwtTokenProvider;
import de.budgt.gateway.exceptions.PasswordToShortException;
import de.budgt.gateway.models.User;
import de.budgt.gateway.repositories.UserRepository;
import de.budgt.gateway.services.CustomUserDetailsService;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Autowired
  UserRepository users;

  @Autowired
  private CustomUserDetailsService userService;

  Logger logger = LogManager.getLogger(AuthController.class);

  @SuppressWarnings("rawtypes")
  @PostMapping("/login")
  public ResponseEntity login(@RequestBody AuthBody data) {
    try {
      String username = data.getEmail();
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
      String token = jwtTokenProvider.createToken(username, this.users.findByEmail(username).getRoles());
      Map<Object, Object> model = new HashMap<>();
      model.put("username", username);
      model.put("token", token);
      return ok(model);
    } catch (AuthenticationException e) {
      throw new BadCredentialsException("Invalid email/password supplied");
    }
  }

  @SuppressWarnings("rawtypes")
  @PostMapping("/register")
  public ResponseEntity register(@RequestBody User user) {
    User userExists = userService.findUserByEmail(user.getEmail());
    if (userExists != null) {
      throw new BadCredentialsException("User with username: " + user.getEmail() + " already exists");
    }

    if (user.getPassword().length() < 8) {
      throw new PasswordToShortException();
    }

    userService.saveUser(user);
    Map<Object, Object> model = new HashMap<>();
    model.put("message", "User registered successfully");
    return ok(model);
  }

}