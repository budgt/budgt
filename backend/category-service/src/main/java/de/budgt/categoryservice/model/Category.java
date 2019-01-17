package de.budgt.categoryservice.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

/**
 * Category
 */
public class Category {

    @Id
    private ObjectId id;
    private String name;
    private CategoryType type;
    private float amount;
    private Subcategory[] subcategories;

    public Category(ObjectId id, String name, CategoryType type) {
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
        return id.toHexString();
    }

    /**
     * @param id the id to set
     */
    public void setId(ObjectId id) {
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
    public float getAmount() {
        return amount;
    }

    /**
     * @param amount the amount to set
     */
    public void setAmount(float amount) {
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

    enum CategoryType {
        INCOME, EXPENSE
    }
}
