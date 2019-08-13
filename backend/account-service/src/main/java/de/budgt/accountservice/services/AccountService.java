package de.budgt.accountservice.services;

import de.budgt.accountservice.dtos.UserDto;
import de.budgt.accountservice.dtos.UserRegistrationDto;

public interface AccountService {

  /**
   * Invokes Auth Service user creation
   *
   * @param user
   * @return created account
   */
  UserDto create(UserRegistrationDto user);
}
