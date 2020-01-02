package de.budgt.bankaccountservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  private final ResourceServerProperties sso;

  private final OAuth2ClientContext oAuth2ClientContext;

  @Autowired
  public ResourceServerConfig(final ResourceServerProperties sso, final OAuth2ClientContext oAuth2ClientContext) {
    this.sso = sso;
    this.oAuth2ClientContext = oAuth2ClientContext;
  }

  @Bean
  @ConfigurationProperties(prefix = "security.oauth2.client")
  public ClientCredentialsResourceDetails clientCredentialsResourceDetails() {
    return new ClientCredentialsResourceDetails();
  }

  @Bean
  public OAuth2RestOperations restTemplate(final OAuth2ClientContext oauth2ClientContext) {
    return new OAuth2RestTemplate(clientCredentialsResourceDetails(), oauth2ClientContext);
  }

  @Bean
  @Primary
  public ResourceServerTokenServices resourceServerTokenServices() {
    return new UserInfoTokenServices(sso.getUserInfoUri(), sso.getClientId());
  }

  @Override
  public void configure(final HttpSecurity http) throws Exception {
    http.authorizeRequests().anyRequest().hasRole("USER");
  }
}