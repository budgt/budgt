package de.budgt.bankaccountservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import de.budgt.bankaccountservice.exceptions.AccountNotFoundException;
import de.budgt.bankaccountservice.models.Account;
import de.budgt.bankaccountservice.services.AccountService;

/**
 * CategoryController
 */
@RestController
public class AccountController {

  @Autowired
  private AccountService accountService;

  @GetMapping("/accounts/{id}")
  public ResponseEntity<Account> getAccountById(@PathVariable(value = "id") String id) {
    try {
      return new ResponseEntity<>(accountService.findById(id), HttpStatus.OK);
    } catch (AccountNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
    }
  }

  @GetMapping("/accounts")
  public ResponseEntity<List<Account>> getAllCategories() {
    return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
  }

  @PostMapping("/accounts")
  public ResponseEntity<Account> createAccount(@RequestBody Account account) {
    account = accountService.create(account);
    return new ResponseEntity<>(account, HttpStatus.OK);
  }

  @PutMapping("/accounts/{id}")
  public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
    return new ResponseEntity<>(accountService.update(account), HttpStatus.OK);
  }

  @DeleteMapping("/accounts/{id}")
  public ResponseEntity<String> deleteCategorie(@PathVariable(value = "id") String id) {
    accountService.deleteById(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
