package de.budgt.accountservice.dtos;

import java.io.Serializable;

public class UserRegistrationDto implements Serializable {

  private static final long serialVersionUID = 5718239471298L;

  private String username;

  private String password;

  private String email;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
