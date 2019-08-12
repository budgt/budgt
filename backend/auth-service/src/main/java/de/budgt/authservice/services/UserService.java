package de.budgt.authservice.services;

import de.budgt.authservice.domain.User;

public interface UserService {
  User create(User user);
}
