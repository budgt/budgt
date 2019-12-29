package de.budgt.bankaccountservice.config.mongodb.changelogs;

import org.springframework.data.mongodb.core.MongoTemplate;

import de.budgt.bankaccountservice.models.Account;
import de.budgt.bankaccountservice.models.AccountType;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;

@ChangeLog
public class InitialValuesChangeLog {

  @ChangeSet(order = "001", id = "insertInitialAccountComdirect1", author = "Patrick Hofmann")
  public void insertInitialCategoryArbeit(MongoTemplate mongoTemplate) {
    Account comdirect1 = new Account("Comdirect1", AccountType.COMDIRECT);
    comdirect1.setUserId("randomuser");

    mongoTemplate.save(comdirect1);
  }

  @ChangeSet(order = "002", id = "insertInitialAccountComdirect2", author = "Patrick Hofmann")
  public void insertInitialCategoryHobbys(MongoTemplate mongoTemplate) {
    Account comdirect2 = new Account("Comdirect2", AccountType.COMDIRECT);
    comdirect2.setUserId("randomuser");

    mongoTemplate.save(comdirect2);
  }
}
