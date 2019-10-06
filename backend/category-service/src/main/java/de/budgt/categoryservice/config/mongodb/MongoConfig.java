package de.budgt.categoryservice.config.mongodb;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "de.budgt.categoryservice.repositories")
public class MongoConfig {

}
