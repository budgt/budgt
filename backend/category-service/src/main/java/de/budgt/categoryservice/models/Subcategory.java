package de.budgt.categoryservice.models;

/**
 * Subcategory
 */
public class Subcategory {

  private String id;
  private String name;
  private float amount;

  public Subcategory() {
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
  public float getAmount() {
    return amount;
  }

  /**
   * @param amount the amount to set
   */
  public void setAmount(float amount) {
    this.amount = amount;
  }

}
