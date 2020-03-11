package com.team.project.manager.services;

import com.team.project.manager.models.Project;
import com.team.project.manager.repository.ProjectRepository;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GraphQLQuery(name = "projects")
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    @GraphQLQuery(name = "project")
    public Optional<Project> getProjectById(@GraphQLArgument(name = "id") Long id) {
        return projectRepository.findById(id);
    }

    @GraphQLQuery(name = "projectByName")
    public Optional<Project> getProjectByName(@GraphQLArgument(name = "name") String name) {
        Project project = new Project();
        project.setName(name);
        Example<Project> example = Example.of(project);
        return projectRepository.findOne(example);
    }

    @GraphQLMutation(name = "saveProject")
    public Project saveProject(@GraphQLArgument(name = "project") Project project) {
        return projectRepository.saveAndFlush(project);
    }

    @GraphQLMutation(name = "deleteProject")
    public void deleteProject(@GraphQLArgument(name = "id") Long id) {
        projectRepository.deleteById(id);
    }
}
