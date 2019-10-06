package de.budgt.authservice.config.mongodb.changelogs;

import de.budgt.authservice.domain.AuthClientDetails;
import de.budgt.authservice.domain.User;
import de.budgt.authservice.enums.Authorities;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.HashSet;
import java.util.Set;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;

@ChangeLog
public class InitialValuesChangeLog {

  @ChangeSet(order = "001", id = "insertBrowserClientDetails", author = "Patrick Hofmann")
  public void insertBrowserClientDetails(MongoTemplate mongoTemplate) {
    AuthClientDetails browserClientDetails = new AuthClientDetails();
    browserClientDetails.setClientId("browser");
    browserClientDetails.setClientSecret("$2a$10$fWNTd3H.u7G/aNROVQSifebOkZ2xzU5nUPOCI2Ld42M8E25/ljJqK");
    browserClientDetails.setScopes("ui");
    browserClientDetails.setGrantTypes("refresh_token,password");

    mongoTemplate.save(browserClientDetails);
  }

  @ChangeSet(order = "002", id = "insertUserToTestAuthentication", author = "Patrick Hofmann")
  public void insertUserToTestAuthentication(MongoTemplate mongoTemplate) {
    Set<Authorities> authorities = new HashSet<>();
    authorities.add(Authorities.ROLE_USER);

    User user = new User();
    user.setActivated(true);
    user.setAuthorities(authorities);
    user.setPassword("$2a$10$fWNTd3H.u7G/aNROVQSifebOkZ2xzU5nUPOCI2Ld42M8E25/ljJqK");
    user.setUsername("randomuser");

    mongoTemplate.save(user);
  }

  @ChangeSet(order = "003", id = "insertAccountServiceClientDetails", author = "Patrick Hofmann")
  public void insertAccountServiceClientDetails(MongoTemplate mongoTemplate) {
    AuthClientDetails accountServiceClientDetails = new AuthClientDetails();
    accountServiceClientDetails.setClientId("account-service");
    accountServiceClientDetails.setClientSecret("$2a$10$fWNTd3H.u7G/aNROVQSifebOkZ2xzU5nUPOCI2Ld42M8E25/ljJqK");
    accountServiceClientDetails.setScopes("server");
    accountServiceClientDetails.setGrantTypes("refresh_token,client_credentials");

    mongoTemplate.save(accountServiceClientDetails);
  }

  @ChangeSet(order = "004", id = "insertCategoryServiceClientDetails", author = "Patrick Hofmann")
  public void insertCategoryServiceClientDetails(MongoTemplate mongoTemplate) {
    AuthClientDetails categoryServiceClientDetails = new AuthClientDetails();
    categoryServiceClientDetails.setClientId("category-service");
    categoryServiceClientDetails.setClientSecret("$2a$10$fWNTd3H.u7G/aNROVQSifebOkZ2xzU5nUPOCI2Ld42M8E25/ljJqK");
    categoryServiceClientDetails.setScopes("server");
    categoryServiceClientDetails.setGrantTypes("refresh_token,client_credentials");

    mongoTemplate.save(categoryServiceClientDetails);
  }

}
