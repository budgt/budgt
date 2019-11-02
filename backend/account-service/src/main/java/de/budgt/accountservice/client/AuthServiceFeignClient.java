package de.budgt.accountservice.client;

import de.budgt.accountservice.dtos.UserDto;
import de.budgt.accountservice.dtos.UserRegistrationDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//DEBUGGING: 404 via name only what to do?
// @FeignClient(name = "auth-service")

@FeignClient(name = "authClient", url = "http://budgt-auth-service:1331/")
public interface AuthServiceFeignClient {

  @PostMapping(value = "/user")
  UserDto createUser(@RequestBody UserRegistrationDto user);
}
