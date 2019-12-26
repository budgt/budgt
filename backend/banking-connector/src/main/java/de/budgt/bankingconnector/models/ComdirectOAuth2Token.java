package de.budgt.bankingconnector.models;

import java.time.Instant;

/**
 * comdirectOAuth2Token Represents a OAuth2Token to access the comdirect
 * developer API
 */
public class ComdirectOAuth2Token {
  private String accessToken;
  private String refreshToken;
  private Instant expires;
  private String kdnr;
  private TokenType type;

  public ComdirectOAuth2Token(String accessToken, String refreshToken, int expiresIn, String kdnr, TokenType type) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expires = Instant.now().plusSeconds(expiresIn);
    this.kdnr = kdnr;
    this.type = type;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public String getRefreshToken() {
    return refreshToken;
  }

  public Instant getExpires() {
    return expires;
  }

  public String getKdnr() {
    return kdnr;
  }

  public TokenType getType() {
    return type;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  public void setRefreshToken(String refreshToken) {
    this.refreshToken = refreshToken;
  }

  public void setExpires(Instant expires) {
    this.expires = expires;
  }

  public void setType(TokenType type) {
    this.type = type;
  }

}
