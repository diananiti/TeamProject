package com.team.project.manager.services;

import com.team.project.manager.exceptions.AppException;
import com.team.project.manager.models.UpdateUser;
import com.team.project.manager.models.User;
import com.team.project.manager.repository.RoleRepository;
import com.team.project.manager.repository.UserRepository;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Example;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GraphQLQuery(name = "users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GraphQLQuery(name = "user")
    public Optional<User> getUserById(@GraphQLArgument(name = "id") Long id) {
        return userRepository.findById(id);
    }

    @GraphQLQuery(name = "userByName")
    public Optional<User> getUserByName(@GraphQLArgument(name = "name") String name) {
        User user = new User();
        user.setName(name);
        Example<User> example = Example.of(user);
        return userRepository.findOne(example);
    }

    @GraphQLQuery(name = "userByUsername")
    public Optional<User> getUserByUsername(@GraphQLArgument(name = "username") String username) {
        User user = new User();
        user.setUsername(username);
        Example<User> example = Example.of(user);
        return userRepository.findOne(example);
    }

    @GraphQLQuery(name = "currentUser")
    public Optional<User> getCurrentUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth == null) {
//            User user = new User(
//                    "please login first",
//                    "please login first",
//                    "please login first",
//                    "please login first");
//
//            return Optional.of(user);
//        }
        return userRepository.findByUsername(auth.getName());
    }

    @GraphQLMutation(name = "updateUser")
    public User updateUser(@GraphQLArgument(name = "user") UpdateUser requestUser) {

        User userToSave = userRepository.findById(requestUser.getId())
                .orElseThrow(() -> new AppException("User not found"));

        if (!requestUser.getName().isBlank()) {
            userToSave.setName(requestUser.getName());
        }
        if (!requestUser.getUsername().isBlank()) {
            if (userRepository.existsByUsername(requestUser.getUsername())) {
                throw new AppException("Username already taken");
            }
            userToSave.setUsername(requestUser.getUsername());
        }
//        if (!requestUser.getEmail().isBlank()) {
//            if (userRepository.existsByEmail(requestUser.getEmail())) {
//                throw new AppException("Email already taken");
//            }
//            userToSave.setEmail(requestUser.getEmail());
//        }
        if (!requestUser.getPassword().isBlank()) {
            userToSave.setPassword(passwordEncoder.encode(requestUser.getPassword()));
        }

        return userRepository.saveAndFlush(userToSave);
    }

    // Currently no functionality to remove user
//    @GraphQLMutation(name = "deleteUser")
//    public void deleteUser(@GraphQLArgument(name = "id") Long id) {
//        userRepository.deleteById(id);
//    }
}
