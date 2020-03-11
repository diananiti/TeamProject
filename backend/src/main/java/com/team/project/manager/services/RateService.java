package com.team.project.manager.services;

import com.team.project.manager.exceptions.ResourceNotFoundException;
import com.team.project.manager.models.Project;
import com.team.project.manager.models.Rate;
import com.team.project.manager.models.User;
import com.team.project.manager.repository.RateRepository;
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
public class RateService {

    private final RateRepository rateRepository;

    public RateService(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

    @GraphQLQuery(name = "rates")
    public List<Rate> getRatess() {
        return rateRepository.findAll();
    }

    @GraphQLQuery(name = "rate")
    public Optional<Rate> getRatesById(@GraphQLArgument(name = "id") Long id) {
        return rateRepository.findById(id);
    }

    @GraphQLQuery(name = "ratesByProjectIdRatingAndRatedUser")
    public List<Rate> getRatesByProjectIdRatingAndRatedUser(
            @GraphQLArgument(name = "projectId") Long projectId,
            @GraphQLArgument(name = "ratingUserId") Long ratingUserId,
            @GraphQLArgument(name = "ratedUserId") Long ratedUserId) {

        Rate rate = new Rate();

        if (projectId != -1) {
            Project project = new Project();
            project.setId(projectId);
            rate.setProject(project);
        }

        if (ratedUserId != -1) {
            User ratedUser = new User();
            ratedUser.setId(ratedUserId);
            rate.setRatedUser(ratedUser);
        }

        if (ratingUserId != -1) {
            User ratingUser = new User();
            ratingUser.setId(ratingUserId);
            rate.setRatingUser(ratingUser);
        }

        Example<Rate> example = Example.of(rate);

        return rateRepository.findAll(example);
    }

    @GraphQLMutation(name = "saveRate")
    public Rate saveRates(@GraphQLArgument(name = "rate") Rate rate) {
        return rateRepository.saveAndFlush(rate);
    }

    @GraphQLMutation(name = "deleteRate")
    public Boolean deleteRates(@GraphQLArgument(name = "id") Long id) {
        try {
            rateRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Rate", "id", id)
            );
            rateRepository.deleteById(id);
        } catch (IllegalArgumentException | ResourceNotFoundException e) {
            return false;
        }
        return true;
    }
}
