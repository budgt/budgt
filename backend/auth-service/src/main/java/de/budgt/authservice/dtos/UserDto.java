package de.budgt.authservice.dtos;

import java.io.Serializable;

public class UserDto implements Serializable {

  private static final long serialVersionUID = 13249812341087L;

  private String id;

  private String username;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
