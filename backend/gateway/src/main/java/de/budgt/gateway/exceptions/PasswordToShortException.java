package de.budgt.gateway.exceptions;

public class PasswordToShortException extends RuntimeException {

  private static final long serialVersionUID = -704526441923675445L;

  public PasswordToShortException() {
    super("Password must be at least 8 characters long.");
  }

}
