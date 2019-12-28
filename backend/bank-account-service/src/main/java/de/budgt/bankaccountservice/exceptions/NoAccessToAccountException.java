package de.budgt.bankaccountservice.exceptions;

/**
 * NoAccessToAccountException
 */
public class NoAccessToAccountException extends RuntimeException {

  private static final long serialVersionUID = 4705150430991448996L;

  public NoAccessToAccountException(String id) {
    super("No access to account with ID: '" + id + "'.");
  }

}
