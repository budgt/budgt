package de.budgt.bankaccountservice.models;

import com.bol.secure.Encrypted;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * ComdirectAccount
 */
@Document
public class ComdirectAccount extends Account {

  @Field
  @Encrypted
  private String clientId;
  @Field
  @Encrypted
  private String clientSecret;
  @Field
  @Encrypted
  private String kdnr;
  @Field
  @Encrypted
  private String username;
  @Field
  @Encrypted
  private String password;

  public ComdirectAccount(String name) {
    super(name, AccountType.COMDIRECT);
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getKdnr() {
    return kdnr;
  }

  public void setKdnr(String kdnr) {
    this.kdnr = kdnr;
  }

  public String getClientSecret() {
    return clientSecret;
  }

  public void setClientSecret(String clientSecret) {
    this.clientSecret = clientSecret;
  }

  public String getClientId() {
    return clientId;
  }

  public void setClientId(String clientId) {
    this.clientId = clientId;
  }

}
