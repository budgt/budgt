package de.budgt.bankaccountservice.mongodb;

import java.util.Base64;

import com.bol.crypt.CryptVault;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "de.budgt.categoryservice.repositories")
public class MongoConfig {

  private static final byte[] secretKey = Base64.getDecoder().decode("cmk0M29xa21mYWZkQVNEM3IwNDNpZmFhZDMyYQ==");

  @Bean
  public CryptVault cryptVault() {
    return new CryptVault().with256BitAesCbcPkcs5PaddingAnd128BitSaltKey(0, secretKey).withDefaultKeyVersion(0);
  }

}
