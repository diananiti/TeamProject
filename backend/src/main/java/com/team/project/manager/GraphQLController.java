package com.team.project.manager;

import com.team.project.manager.services.*;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.SchemaPrinter;
import io.leangen.graphql.GraphQLSchemaGenerator;
import io.leangen.graphql.metadata.strategy.query.AnnotatedResolverBuilder;
import io.leangen.graphql.metadata.strategy.value.jackson.JacksonValueMapperFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class GraphQLController {

    private final GraphQL graphQL;
    private final GraphQLSchema schema;

    public GraphQLController(UserService userService,
                             ProjectService projectService,
                             Project_MemberService projectMemberService,
                             RateService rateService,
                             TaskService taskService
    ) {
        schema = new GraphQLSchemaGenerator()
                .withResolverBuilders(
                        //Resolve by annotations
                        new AnnotatedResolverBuilder())
                .withOperationsFromSingleton(userService, UserService.class)
                .withOperationsFromSingleton(projectService, ProjectService.class)
                .withOperationsFromSingleton(projectMemberService, Project_MemberService.class)
                .withOperationsFromSingleton(rateService, RateService.class)
                .withOperationsFromSingleton(taskService, TaskService.class)
                .withValueMapperFactory(new JacksonValueMapperFactory())
                .generate();
        graphQL = GraphQL.newGraphQL(schema).build();
        System.out.println(new SchemaPrinter(
                // Tweak the options accordingly
                SchemaPrinter.Options.defaultOptions()
//                        .includeScalarTypes(true)
//                        .includeExtendedScalarTypes(true)
//                        .includeIntrospectionTypes(true)
        ).print(schema));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/graphql",
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public Map<String, Object> graphgl(@RequestBody Map<String, Object> request, HttpServletRequest raw) {
        System.out.println("GraphQLController.graphgl");
        System.out.println("request = [" + request + "], raw = [" + raw + "]");
        ExecutionResult executionResult = graphQL.execute(ExecutionInput.newExecutionInput()
                .query(request.get("query").toString())
                .operationName(request.get("operationName") == null ? null : request.get("operationName").toString())
                .variables(new HashMap<>())
                .context(raw)
                .build());
        return executionResult.toSpecification();
    }
}

