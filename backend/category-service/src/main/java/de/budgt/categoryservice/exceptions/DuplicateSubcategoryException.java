package de.budgt.categoryservice.exceptions;

public class DuplicateSubcategoryException extends RuntimeException {

  private static final long serialVersionUID = -414717958360325747L;

  public DuplicateSubcategoryException() {
    super("Subcategory names must be unique within a given category.");
  }

}
