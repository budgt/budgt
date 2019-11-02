package de.budgt.accountservice.services;

import de.budgt.accountservice.client.AuthServiceFeignClient;
import de.budgt.accountservice.dtos.UserDto;
import de.budgt.accountservice.dtos.UserRegistrationDto;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

  private final AuthServiceFeignClient authServiceFeignClient;

  public AccountServiceImpl(AuthServiceFeignClient authServiceFeignClient) {
    this.authServiceFeignClient = authServiceFeignClient;
  }

  @Override
  public UserDto create(UserRegistrationDto user) {
    return authServiceFeignClient.createUser(user);
  }
}
