package de.budgt.authservice.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class UserRegistrationDto implements Serializable {

  private static final long serialVersionUID = 5718239471298L;

  @NotNull
  @NotBlank
  private String username;

  @NotNull
  @NotBlank
  private String password;

  @NotNull
  @NotBlank
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
