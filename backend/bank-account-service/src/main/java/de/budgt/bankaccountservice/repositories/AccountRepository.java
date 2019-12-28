package de.budgt.bankaccountservice.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import de.budgt.bankaccountservice.models.Account;

/**
 * AccountRepository
 */
public interface AccountRepository extends MongoRepository<Account, String> {

  public List<Account> findByUserId(String userId);
}
