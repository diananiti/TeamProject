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
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "projectId",
                "userId"
        })
})
public class Project_Members {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GraphQLQuery(name = "id")
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "projectId")
    @GraphQLQuery(name = "projectId")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "userId")
    @GraphQLQuery(name = "userId")
    private User user;

    @GraphQLQuery(name = "role")
    private String role;

}
