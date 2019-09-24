package de.budgt.accountservice.controllers;

import de.budgt.accountservice.dtos.UserDto;
import de.budgt.accountservice.dtos.UserRegistrationDto;
import de.budgt.accountservice.services.AccountService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

  private final AccountService accountService;

  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  @PostMapping("/accounts")
  public UserDto createNewAccount(@RequestBody UserRegistrationDto user) {
    return accountService.create(user);
  }

}
