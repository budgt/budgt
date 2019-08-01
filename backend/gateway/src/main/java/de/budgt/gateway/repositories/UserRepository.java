package de.budgt.gateway.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import de.budgt.gateway.models.User;

public interface UserRepository extends MongoRepository<User, String> {

  User findByEmail(String email);
}
