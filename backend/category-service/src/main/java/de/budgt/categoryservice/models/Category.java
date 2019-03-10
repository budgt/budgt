package de.budgt.categoryservice.models;

import java.util.ArrayList;
import java.util.List;

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
  private List<Subcategory> subcategories;

  public Category() {
  }

  public Category(String id, String name, CategoryType type) {
    this.id = id;
    this.setName(name);
    this.type = type;
    this.subcategories = new ArrayList<>();
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
  public List<Subcategory> getSubcategories() {
    return subcategories;
  }

  /**
   * @param subcategories the subcategories to set
   */
  public void setSubcategories(List<Subcategory> subcategories) {
    this.subcategories = subcategories;
  }

  @Override
  public String toString() {
    StringBuilder sbld = new StringBuilder();

    sbld.append("Categodry:\n");
    sbld.append("  ID: " + this.id + "\n");
    sbld.append("  Name: " + this.name + "\n");
    sbld.append("  Type: " + this.type + "\n");
    sbld.append("  Amount: " + this.amount + "\n");
    sbld.append("  Subcategories: " + this.amount + "\n");

    for (Subcategory subcategory : this.subcategories) {
      sbld.append("    Name: " + subcategory.getName() + "\n");
      sbld.append("    Amount: " + subcategory.getAmount() + "\n");
    }

    return sbld.toString();
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {

    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;

    Category other = (Category) obj;

    if (id == null) {
      if (other.id != null)
        return false;
    } else if (!id.equals(other.id))
      return false;

    if (name == null) {
      if (other.name != null)
        return false;
    } else if (!name.equals(other.name))
      return false;
    return true;
  }

  public enum CategoryType {
    INCOME, EXPENSE
  }
}
