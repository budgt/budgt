package de.budgt.authservice.services;

import de.budgt.authservice.domain.User;
import de.budgt.authservice.enums.Authorities;
import de.budgt.authservice.repositories.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public User create(User user) {
    throwIfUsernameExists(user.getUsername());

    String hash = passwordEncoder.encode(user.getPassword());
    user.setPassword(hash);
    user.setActivated(Boolean.TRUE);
    user.setAuthorities(new HashSet<>(Collections.singletonList(Authorities.ROLE_USER)));

    return userRepository.save(user);
  }

  private void throwIfUsernameExists(String username) {
    Optional<User> existingUser = userRepository.findByUsername(username);
    existingUser.ifPresent((user) -> {
      throw new IllegalArgumentException("User not available");
    });
  }

}
