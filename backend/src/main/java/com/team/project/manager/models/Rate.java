package com.team.project.manager.models;

import io.leangen.graphql.annotations.GraphQLQuery;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GraphQLQuery(name = "id")
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "ratedUserId")
    @GraphQLQuery(name = "ratedUserId")
    private User ratedUser;

    @ManyToOne
    @JoinColumn(name = "ratingUserId")
    @GraphQLQuery(name = "ratingUserId")
    private User ratingUser;

    @ManyToOne
    @JoinColumn(name = "projectId")
    @GraphQLQuery(name = "projectId")
    private Project project;

    @GraphQLQuery(name = "rate")
    private Long rate;
}
