package de.budgt.bankaccountservice.services;

import java.util.List;

import de.budgt.bankaccountservice.models.Account;

/**
 * AccountService
 */
public interface AccountService {

  public List<Account> findAll();

  public Account findById(String id);

  public Account create(Account account);

  public Account update(Account account);

  public void deleteById(String id);
}
