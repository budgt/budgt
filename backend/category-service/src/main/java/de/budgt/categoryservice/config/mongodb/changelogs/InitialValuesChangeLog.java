package de.budgt.categoryservice.config.mongodb.changelogs;

import org.springframework.data.mongodb.core.MongoTemplate;

import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.models.Subcategory;
import de.budgt.categoryservice.models.Category.CategoryType;

import java.util.ArrayList;
import java.util.List;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;

@ChangeLog
public class InitialValuesChangeLog {

  @ChangeSet(order = "001", id = "insertInitialCategoryArbeit", author = "Patrick Hofmann")
  public void insertInitialCategoryArbeit(MongoTemplate mongoTemplate) {
    Category arbeit = new Category();
    arbeit.setName("Arbeit");
    arbeit.setType(CategoryType.INCOME);
    arbeit.setUserId("randomuser");

    Subcategory subcategory = new Subcategory();
    subcategory.setName("Gehalt");

    List<Subcategory> subcategories = new ArrayList<Subcategory>();
    subcategories.add(subcategory);
    arbeit.setSubcategories(subcategories);

    mongoTemplate.save(arbeit);
  }

  @ChangeSet(order = "002", id = "insertInitialCategoryHobbys", author = "Patrick Hofmann")
  public void insertInitialCategoryHobbys(MongoTemplate mongoTemplate) {
    Category hobbys = new Category();
    hobbys.setName("Hobbys");
    hobbys.setType(CategoryType.EXPENSE);
    hobbys.setUserId("randomuser");

    Subcategory pizza = new Subcategory();
    pizza.setName("Pizza");

    Subcategory starcraft = new Subcategory();
    starcraft.setName("Starcraft");

    List<Subcategory> subcategories = new ArrayList<Subcategory>();
    subcategories.add(pizza);
    subcategories.add(starcraft);
    hobbys.setSubcategories(subcategories);

    mongoTemplate.save(hobbys);
  }

  @ChangeSet(order = "003", id = "insertInitialCategoryLebenshaltungskosten", author = "Patrick Hofmann")
  public void insertInitialCategoryLebenshaltungskosten(MongoTemplate mongoTemplate) {
    Category lebenshaltungskosten = new Category();
    lebenshaltungskosten.setName("Lebenshaltungskosten");
    lebenshaltungskosten.setType(CategoryType.EXPENSE);
    lebenshaltungskosten.setUserId("randomuser");

    Subcategory miete = new Subcategory();
    miete.setName("Miete");

    Subcategory strom = new Subcategory();
    strom.setName("Strom");

    Subcategory internet = new Subcategory();
    internet.setName("Internet");

    List<Subcategory> subcategories = new ArrayList<Subcategory>();
    subcategories.add(miete);
    subcategories.add(strom);
    subcategories.add(internet);
    lebenshaltungskosten.setSubcategories(subcategories);

    mongoTemplate.save(lebenshaltungskosten);
  }

}
