package de.budgt.bankingconnector.models;

/**
 * ComdirectTANChallenge Represents a TAN challanchge to active a session.
 */
public class ComdirectTANChallenge {

  private String challengeId;
  private String TANimage;

  public ComdirectTANChallenge(String challengeId, String TANimage) {
    this.challengeId = challengeId;
    this.TANimage = TANimage;
  }

  public String getChallangeId() {
    return challengeId;
  }

  public String getTANimage() {
    return TANimage;
  }

  public void setChallangeId(String challengeId) {
    this.challengeId = challengeId;
  }

  public void setTANimage(String tANimage) {
    this.TANimage = tANimage;
  }

}
