package com.team.project.manager.services;

import com.team.project.manager.exceptions.ResourceNotFoundException;
import com.team.project.manager.models.Project;
import com.team.project.manager.models.Project_Members;
import com.team.project.manager.models.User;
import com.team.project.manager.repository.Project_MembersRepository;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class Project_MemberService {

    private final Project_MembersRepository project_membersRepository;

    public Project_MemberService(Project_MembersRepository project_membersRepository) {
        this.project_membersRepository = project_membersRepository;
    }

    @GraphQLQuery(name = "project_members")
    public List<Project_Members> getProjectsMembers() {
        return project_membersRepository.findAll();
    }

    @GraphQLQuery(name = "project_members_by_project_id")
    public List<Project_Members> getProjectMembersByProjectId(@GraphQLArgument(name = "id") Long userId) {
        Project_Members projectMembers = new Project_Members();
        Project project = new Project();
        project.setId(userId);
        projectMembers.setProject(project);

        Example<Project_Members> example = Example.of(projectMembers);

        return project_membersRepository.findAll(example);
    }

    @GraphQLQuery(name = "project_members_by_user_id")
    public List<Project_Members> getProjectMembersByUserId(@GraphQLArgument(name = "userId") Long userId) {
        Project_Members projectMembers = new Project_Members();
        User user = new User();
        user.setId(userId);
        projectMembers.setUser(user);

        Example<Project_Members> example = Example.of(projectMembers);

        return project_membersRepository.findAll(example);
    }

    @GraphQLMutation(name = "saveProject_members")
    public Project_Members saveProjectMembers(@GraphQLArgument(name = "project_members") Project_Members project_members) {
        return project_membersRepository.saveAndFlush(project_members);
    }

    @GraphQLMutation(name = "deleteProject_members")
    public Boolean deleteProjectMembers(@GraphQLArgument(name = "id") Long id) {
        try {
            project_membersRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Project_members", "id", id)
            );
            project_membersRepository.deleteById(id);
        } catch (IllegalArgumentException | ResourceNotFoundException e) {
            return false;
        }
        return true;
    }

    @GraphQLMutation(name = "deleteProject_membersByUserAndProjectId")
    public Boolean deleteProjectMembersByUserAndProjectId(
            @GraphQLArgument(name = "userId") Long userId,
            @GraphQLArgument(name = "projectId") Long projectId) {
        try {
            Project_Members projectMembers = new Project_Members();

            User user = new User();
            user.setId(userId);
            projectMembers.setUser(user);

            Project project = new Project();
            project.setId(projectId);
            projectMembers.setProject(project);

            Example<Project_Members> example = Example.of(projectMembers);
            Project_Members toDelete = project_membersRepository.findOne(example).orElseThrow(
                    () -> new ResourceNotFoundException("Project_members", "example = userId: " + userId, "; projectId: " + projectId)
            );

            project_membersRepository.deleteById(toDelete.getId());
        } catch (IllegalArgumentException | ResourceNotFoundException e) {
            return false;
        }
        return true;
    }
}
