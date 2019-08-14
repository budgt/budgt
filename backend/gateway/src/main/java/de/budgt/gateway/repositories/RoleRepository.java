package de.budgt.gateway.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import de.budgt.gateway.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {

  Role findByRole(String role);
}
