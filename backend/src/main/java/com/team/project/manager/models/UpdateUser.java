package com.team.project.manager.models;

import io.leangen.graphql.annotations.GraphQLQuery;

public class UpdateUser{

    @GraphQLQuery(name = "id")
    private Long id;

    @GraphQLQuery(name = "name")
    private String name;

    @GraphQLQuery(name = "username")
    private String username;

//    @GraphQLQuery(name = "email") // TODO email is natural id co we cannot alter it we can change it or leave it as it is now
//    private String email;

    @GraphQLQuery(name = "password")
    private String password;

    public UpdateUser() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
