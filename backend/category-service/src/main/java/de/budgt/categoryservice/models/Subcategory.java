package de.budgt.categoryservice.models;

import org.springframework.data.annotation.Id;

/**
 * Subcategory
 */
public class Subcategory {

  @Id
  private String id;
  private String name;
  private double amount;

  public Subcategory() {
  }

  public Subcategory(String name, double amount) {
    this.name = name;
    this.amount = amount;
  }

  /**
   * @return the id
   */
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

}
