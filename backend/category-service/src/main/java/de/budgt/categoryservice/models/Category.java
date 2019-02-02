package de.budgt.categoryservice.models;

import org.springframework.data.annotation.Id;

/**
 * Category
 */
public class Category {

  @Id
  private String id;
  private String name;
  private CategoryType type;
  private double amount;
  private Subcategory[] subcategories;

  public Category() {
  }

  public Category(String id, String name, CategoryType type) {
    this.id = id;
    this.setName(name);
    this.type = type;
  }

  /**
   * @return the name
   */
  public String getName() {
    return name;
  }

  /**
   * @param name the name to set
   */
  public void setName(String name) {
    this.name = name;
  }

  public String getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
  public void setId(String id) {
    this.id = id;
  }

  /**
   * @return the type
   */
  public CategoryType getType() {
    return type;
  }

  /**
   * @param type the type to set
   */
  public void setType(CategoryType type) {
    this.type = type;
  }

  /**
   * @return the amount
   */
  public double getAmount() {
    return amount;
  }

  /**
   * @param amount the amount to set
   */
  public void setAmount(double amount) {
    this.amount = amount;
  }

  /**
   * @return the subcategories
   */
  public Subcategory[] getSubcategories() {
    return subcategories;
  }

  /**
   * @param subcategories the subcategories to set
   */
  public void setSubcategories(Subcategory[] subcategories) {
    this.subcategories = subcategories;
  }

  @Override
  public String toString() {
    String category = "Category:\n";
    category += "  ID: " + this.id + "\n";
    category += "  Name: " + this.name + "\n";
    category += "  Type: " + this.type + "\n";
    category += "  Amount: " + this.amount + "\n";
    category += "  Subcategories: " + this.amount + "\n";

    for (Subcategory subcategory : this.subcategories) {
      category += "    Name: " + subcategory.getName() + "\n";
      category += "    Amount: " + subcategory.getAmount() + "\n";
    }

    return category;
  }

  // @Override
  // public boolean equals(Object object) {
  // boolean equals = false;
  // if()

  // }

  public enum CategoryType {
    INCOME, EXPENSE
  }
}
