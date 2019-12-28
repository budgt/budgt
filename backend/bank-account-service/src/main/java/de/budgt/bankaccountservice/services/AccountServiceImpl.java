package de.budgt.bankaccountservice.services;

import java.util.List;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import de.budgt.bankaccountservice.exceptions.AccountNotFoundException;
import de.budgt.bankaccountservice.exceptions.NoAccessToAccountException;
import de.budgt.bankaccountservice.models.Account;
import de.budgt.bankaccountservice.repositories.AccountRepository;

/**
 * AccountServiceImpl
 */
public class AccountServiceImpl implements AccountService {

  private final AccountRepository accountRepository;

  public AccountServiceImpl(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Override
  public List<Account> findAll() {
    return accountRepository.findByUserId(getCurrentUserId());
  }

  @Override
  public Account findById(String id) {
    Account account = accountRepository.findById(id).orElseThrow(() -> new AccountNotFoundException(id));
    if (getCurrentUserId().equals(account.getUserId())) {
      return account;
    } else {
      throw (new NoAccessToAccountException(id));
    }
  }

  @Override
  public Account create(Account account) {
    account.setUserId(getCurrentUserId());

    return accountRepository.insert(account);
  }

  @Override
  public Account update(Account account) {
    if (getCurrentUserId().equals(account.getUserId())) {
      return accountRepository.save(account);
    } else {
      throw (new NoAccessToAccountException(account.getId()));
    }
  }

  @Override
  public void deleteById(String id) {
    Account accountToDelete = accountRepository.findById(id).orElseThrow(() -> new AccountNotFoundException(id));

    if (getCurrentUserId().equals(accountToDelete.getUserId())) {
      accountRepository.deleteById(id);
    } else {
      throw (new NoAccessToAccountException(accountToDelete.getUserId()));
    }
  }

  private String getCurrentUserId() {
    String currentUserId = "";

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken)) {
      currentUserId = authentication.getName();
    }

    return currentUserId;

  }

}
