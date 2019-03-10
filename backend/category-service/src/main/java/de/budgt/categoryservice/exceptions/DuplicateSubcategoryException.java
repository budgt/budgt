package de.budgt.categoryservice.exceptions;

public class DuplicateSubcategoryException extends RuntimeException {

  private static final long serialVersionUID = -414717958360325747L;

  public DuplicateSubcategoryException(String name) {
    super(
        "Duplicate subcategory name detected. Subcategory with name '" + name + "' already exists for this category.");
  }

}
