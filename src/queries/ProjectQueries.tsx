import gql from 'graphql-tag';
import store from '../reducers/store';
import ApolloClient from 'apollo-boost';

// client.defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'all',
//   },
// };

export async function getAllTasks() {
  let client = new ApolloClient(store.getState().clientReducer.client);
  let taskList;

  await client
    .query({
      query: gql`
        query {
          tasks {
            id
            name
            category
            description
            endDateAssumption
            status
            project {
              id
            }
            user {
              id
            }
          }
        }
      `,
    })
    .then((response: any) => {
      taskList = response.data.tasks;
    });
  return taskList;
}

export async function saveNewTask(newTask: any) {
  const client = new ApolloClient(store.getState().clientReducer.client);
  await client.mutate({
    mutation: gql`
      mutation {
        saveTask(
          task: {
            name: "${newTask.name}"
            category: "${newTask.category}"
            description: "${newTask.description}"
            endDateAssumption: "${newTask.endDateAssumption.toISOString()}"
            status: "${newTask.status}"
          }
        ) {
          id
        }
      }
      `,
  });
}

export async function modifyTask(task: any) {
  const client = new ApolloClient(store.getState().clientReducer.client);
  await client.mutate({
    mutation: gql`
      mutation {
        saveTask(
          task: {
            id: "${task.id}"
            name: "${task.name}"
            category: "${task.category}"
            description: "${task.description}"
            endDateAssumption: "${task.endDateAssumption.toISOString()}"
            status: "${task.status}"
          }
        ) {
          id
        }
      }
      `,
  });
}

export async function deleteTask(id: number) {
  const client = new ApolloClient(store.getState().clientReducer.client);
  ////////////////////////Nie działa
  await client.mutate({
    mutation: gql`
      mutation {
        deleteTask(id: ${id})
      }
      `,
  });
  console.log('should be consoled');
}

export async function getAllUsers() {
  const client = new ApolloClient(store.getState().clientReducer.client);
  let userList;
  await client
    .query({
      query: gql`
        query {
          users {
            id
            name
            email
          }
        }
      `,
    })
    .then((response: any) => {
      userList = response.data.users;
    });
  return userList;
}

export async function getMembers() {
  const client = new ApolloClient(store.getState().clientReducer.client);
  let memberList;
  await client
    .query({
      query: gql`
        query {
          users {
            id
            name
            email
          }
        }
      `,
    })
    .then((response: any) => {
      memberList = response.data.users;
    });
  return memberList;
}
