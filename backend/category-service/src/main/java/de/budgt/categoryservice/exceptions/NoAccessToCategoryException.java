package de.budgt.categoryservice.exceptions;

public class NoAccessToCategoryException extends RuntimeException {

  private static final long serialVersionUID = -5130822302498089530L;

  public NoAccessToCategoryException(String id) {
    super("No access to category with ID: '" + id + "'.");
  }

}
