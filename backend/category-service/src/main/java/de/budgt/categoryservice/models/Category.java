package de.budgt.categoryservice.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

  public boolean checkForSubcategoryDuplicate() {
    ArrayList<String> subcategoryNames = new ArrayList<>();
    subcategories.forEach(subcategory -> subcategoryNames.add(subcategory.getName()));
    Set<String> set = new HashSet<>(subcategoryNames);

    if (set.size() < subcategoryNames.size()) {
      return true;
    }

    return false;
  }

  // Statt über HashSet, hier heue Methode die vergleicht.
  // ArrayListe mit Namen erstellen -> dann durchgehen und contains

  public enum CategoryType {
    INCOME, EXPENSE
  }
}
