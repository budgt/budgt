package de.budgt.bankaccountservice.exceptions;

public class AccountNotFoundException extends RuntimeException {

  private static final long serialVersionUID = 249422816505226423L;

  public AccountNotFoundException(String id) {
    super("could not find account with ID: '" + id + "'.");
  }

}
