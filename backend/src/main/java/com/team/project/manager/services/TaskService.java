package com.team.project.manager.services;

import com.team.project.manager.exceptions.ResourceNotFoundException;
import com.team.project.manager.models.Project;
import com.team.project.manager.models.Task;
import com.team.project.manager.repository.TaskRepository;
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
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GraphQLQuery(name = "tasks")
    public List<Task> getProjects() {
        return taskRepository.findAll();
    }

    @GraphQLQuery(name = "task")
    public Optional<Task> getTaskById(@GraphQLArgument(name = "id") Long id) {
        return taskRepository.findById(id);
    }

    @GraphQLQuery(name = "tasks_by_project_id")
    public List<Task> getTasksByProjectId(@GraphQLArgument(name = "id") Long id) {
        Task task = new Task();
        Project project = new Project();
        project.setId(id);
        task.setProject(project);

        Example<Task> example = Example.of(task);

        return taskRepository.findAll(example);
    }

    @GraphQLMutation(name = "saveTask")
    public Task saveTask(@GraphQLArgument(name = "task") Task task) {
        return taskRepository.saveAndFlush(task);
    }

    @GraphQLMutation(name = "deleteTask")
    public Boolean deleteTask(@GraphQLArgument(name = "id") Long id) {
        try {
            taskRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Task", "id", id)
            );
            taskRepository.deleteById(id);
        } catch (IllegalArgumentException | ResourceNotFoundException e) {
            return false;
        }
        return true;
    }
}
