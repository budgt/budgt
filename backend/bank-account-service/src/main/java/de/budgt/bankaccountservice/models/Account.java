package de.budgt.bankaccountservice.models;

/**
 * Account Represenats an generic account. Spcific account types use this as a
 * super class.
 */
public class Account {

  private String id;
  private String name;
  private AccountType type;
  private String userId;

  public Account(String name, AccountType type) {
    this.name = name;
    this.type = type;
  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public AccountType getType() {
    return type;
  }

  public String getUserId() {
    return userId;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setType(AccountType type) {
    this.type = type;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }
}
