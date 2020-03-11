package com.team.project.manager.models;

import io.leangen.graphql.annotations.GraphQLQuery;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GraphQLQuery(name = "id", description = "A project's id")
    private Long Id;

    @GraphQLQuery(name = "name", description = "A project's name")
    private @NotNull String name;

    @GraphQLQuery(name = "description", description = "A description of a project")
    private String description;

    @GraphQLQuery(name = "endDate", description = "A deadline (endDate of a project)")
    private Date endDate;

    @GraphQLQuery(name = "status", description = "A status of a project")
    private String status;
}
