package de.budgt.bankingconnector.clients;

import java.util.UUID;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.budgt.bankingconnector.models.ComdirectOAuth2Token;
import de.budgt.bankingconnector.models.ComdirectTANChallenge;
import de.budgt.bankingconnector.models.TokenType;

/**
 * AuthServiceRestClient
 *
 * @author Patrick Hofmann
 */
public class ComdirectAuthServiceRestClient {

  Logger log = LoggerFactory.getLogger(ComdirectAuthServiceRestClient.class);

  private static String URL = "https://api.comdirect.de";
  private static String AuthAPIPath = "/oauth/token";
  private static String SessionAPIPath = "/api/session/clients/user/v1/sessions";

  /**
   * Get a new OAuth2 token from the comdirect API.
   *
   * @param clientId     comdirect developer client id
   * @param clientSecret comdirect developer client secret
   * @param username     comdirect portal username
   * @param password     comdirect portal password
   * @return {@link #de.budgt.de.budgt.bankingconnector.models.ComdirectOAuth2Token}
   *         for AUTH access.
   */
  public ComdirectOAuth2Token getToken(String clientId, String clinetSecret, String username, String password)
      throws UnirestException {

    log.debug("Getting API token from comdirect.");

    Unirest.setTimeouts(0, 0);
    HttpResponse<String> response;

    // @formatter:off
    response = Unirest.post(URL + AuthAPIPath)
        .header("Accept", "application/json")
        .header("Content-Type", "application")
        .field("client_id", clientId)
        .field("client_secret", clinetSecret)
        .field("username", username)
        .field("password", password)
        .field("grant_type", "password")
        .asString();
    // @formatter:on

    log.debug("Got Response code: " + response.getStatus());
    if (response.getStatus() != 200) {
      log.debug("Response message: " + response.getBody());
    }

    JSONObject jo = new JSONObject(response.getBody());
    // @formatter:off
    ComdirectOAuth2Token oauth2token = new ComdirectOAuth2Token(
      jo.getString("access_token"),
      jo.getString("refresh_token"),
      jo.getInt("expires_in"),
      jo.getString("kdnr"),
      TokenType.AUTH
    );
    // @formatter:on

    return oauth2token;
  }

  /**
   * Get the session state from the comdirect API.
   *
   * @param Oauth2Token OAuth2Token create with
   *                    {@link #getToken(String, String, String, String)}
   * @param sessionId   ID of the comdirect session
   * @return the current session identifier.
   */
  public String getSessionIdentifier(String OAuth2Token, String sessionId) throws UnirestException {
    Unirest.setTimeouts(0, 0);

    // @formatter:off
    HttpResponse<String> response = Unirest.get(URL + SessionAPIPath)
        .header("Accept", "application/json")
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer " + OAuth2Token)
        .header("x-http-request-info", "{\"clientRequestId\":{\"sessionId\":\"" + sessionId + "\",\"requestId\":\"" + UUID.randomUUID() + "\"}}")
        .asString();


    log.debug("Got Response code: " + response.getStatus());
    if (response.getStatus() != 200) {
      log.debug("Response message: " + response.getBody());
    }

    JSONObject jo = new JSONObject(response.getBody());
    return jo.getString("identifier");
  }

  /**
   * Creates a Session TAN request.
   *
   * @param Oauth2Token OAuth2Token create with
   *                    {@link #getToken(String, String, String, String)}
   * @param sessionId   ID of the comdirect session
   * @return photoTAN graphic as base64 encoded PNG
   */
  public ComdirectTANChallenge createSessionTan(String OAuth2Token, String sessionId) throws UnirestException {
    Unirest.setTimeouts(0, 0);
    // @formatter:off
    HttpResponse<String> response = Unirest.post(URL + SessionAPIPath + "/" + sessionId + "/validate")
      .header("Accept", "application/json")
      .header("Content-Type", "application/json")
      .header("Authorization", "Bearer " + OAuth2Token)
      .header("x-http-request-info", "{\"clientRequestId\":{\"sessionId\":\"" + sessionId + "\",\"requestId\":\"" + UUID.randomUUID() + "\"}}")
      .body("{\"identifier\": \"" + sessionId + "\",\"sessionTanActive\": true,\"activated2FA\": true}")
      .asString();
   // @formatter:on

    log.debug("Got Response code: " + response.getStatus());
    if (response.getStatus() != 201) {
      log.debug("Response message: " + response.getBody());
    }

    JSONObject jo = new JSONObject(response.getHeaders().getFirst("x-once-authentication-info"));
    ComdirectTANChallenge challenge = new ComdirectTANChallenge(jo.getString("id"), jo.getString("challenge"));

    return challenge;
  }

  /**
   * Activate the session TAN created with
   * {@link #createSessionTan(String, String)}
   *
   * @param Oauth2Token OAuth2Token create with
   *                    {@link #getToken(String, String, String, String)}
   * @param sessionId   ID of the comdirect session
   * @param challengeId ID of the TAN Challechange from
   *                    {@link #createSessionTan(String, String)}
   * @param TAN         TAN the user created via comdirect photoTAN app
   * @return true if activation succeded, false if not.
   */
  public Boolean activateSessionTan(String OAuth2Token, String sessionId, String challengeId, String TAN)
      throws UnirestException {
    Unirest.setTimeouts(0, 0);
    // @formatter:off
      HttpResponse<String> response = Unirest.patch(URL + SessionAPIPath + "/" + sessionId)
        .header("Accept", "application/json")
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer " + OAuth2Token)
        .header("x-http-request-info", "{\"clientRequestId\":{\"sessionId\":\"" + sessionId + "\",\"requestId\":\"" + UUID.randomUUID() + "\"}}")
        .header("x-once-authentication-info", "{\"id\":\"" + challengeId + "\"}")
        .header("x-once-authentication", "" + TAN + "")
        .body("{\"identifier\": \"" + sessionId + "\",\"sessionTanActive\": true,\"activated2FA\": true}")
        .asString();
   // @formatter:on

    log.debug("Got Response code: " + response.getStatus());
    if (response.getStatus() != 200) {
      log.debug("Response message: " + response.getBody());
    }

    JSONObject jo = new JSONObject(response.getBody());
    if (jo.getString("sessionTanActive").equals(("false"))) {
      return false;
    }
    return true;
  }

  /**
   * Creates the final token used to access the comdirect account API
   *
   * @param Oauth2Token  OAuth2Token create with
   *                     {@link #getToken(String, String, String, String)}
   * @param clientId     comdirect developer client id
   * @param clientSecret comdirect developer client secret
   * @param token        OAuth2 token created with
   *                     {@link #getToken(String, String, String, String)}
   * @return {@link #de.budgt.de.budgt.bankingconnector.models.ComdirectOAuth2Token}
   *         for API access.
   */
  public ComdirectOAuth2Token getAccessToken(String clinetId, String clientSecret, String token)
      throws UnirestException {
    Unirest.setTimeouts(0, 0);
    // @formatter:off
    HttpResponse<String> response = Unirest.post(URL + AuthAPIPath)
      .header("Accept", "application/json")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .field("client_id", clinetId)
      .field("client_secret", clientSecret)
      .field("grant_type", "cd_secondary")
      .field("token", token)
      .asString();

   // @formatter:on

    log.debug("Got Response code: " + response.getStatus());
    if (response.getStatus() != 200) {
      log.debug("Response message: " + response.getBody());
    }

    JSONObject jo = new JSONObject(response.getBody());
    // @formatter:off
    ComdirectOAuth2Token oauth2token = new ComdirectOAuth2Token(
      jo.getString("access_token"),
      jo.getString("refresh_token"),
      jo.getInt("expires_in"),
      jo.getString("kdnr"),
      TokenType.API
    );
    // @formatter:on

    return oauth2token;
  }
}
