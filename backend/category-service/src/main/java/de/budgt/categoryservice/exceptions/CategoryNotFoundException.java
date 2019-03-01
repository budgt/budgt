package de.budgt.categoryservice.exceptions;

public class CategoryNotFoundException extends RuntimeException {

  private static final long serialVersionUID = -9045264477703475445L;

  public CategoryNotFoundException(String id) {
    super("could not find category with ID: '" + id + "'.");
  }

}
