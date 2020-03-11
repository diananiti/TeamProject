package com.team.project.manager.models;

import io.leangen.graphql.annotations.GraphQLQuery;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GraphQLQuery(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "projectId")
    @GraphQLQuery(name = "projectId")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "userId")
    @GraphQLQuery(name = "userId")
    private User user;

    @GraphQLQuery(name = "name")
    private String name;

    @GraphQLQuery(name = "description")
    private String description;

    @GraphQLQuery(name = "status")
    private String status;

    @GraphQLQuery(name = "category")
    private String category;

    @GraphQLQuery(name = "endDateAssumption")
    private Date endDateAssumption;
}
