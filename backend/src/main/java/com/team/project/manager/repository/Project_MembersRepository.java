package com.team.project.manager.repository;

import com.team.project.manager.models.Project_Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Project_MembersRepository extends JpaRepository<Project_Members, Long> {
}
