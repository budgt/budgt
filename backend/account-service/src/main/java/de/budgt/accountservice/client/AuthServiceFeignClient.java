package de.budgt.accountservice.client;

import de.budgt.accountservice.dtos.UserDto;
import de.budgt.accountservice.dtos.UserRegistrationDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "auth-service")
public interface AuthServiceFeignClient {

  @PostMapping(value = "/uaa/user")
  UserDto createUser(@RequestBody UserRegistrationDto user);

}
