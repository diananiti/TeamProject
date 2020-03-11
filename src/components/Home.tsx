import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class HomeComponent extends React.Component {
  render() {
    return (
      <div>
        This is Home Component
        {localStorage.getItem('ACCESS_TOKEN')}
        <AllUsers />
      </div>
    );
  }
}

// Test component which query all users from DB and display fetched JSON object
// as string
const AllUsers = () => (
  <Query
    query={gql`
      {
        users {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div>
          {JSON.stringify(data)}
          <p>{JSON.stringify(data.users[1])};</p>
        </div>
      );
    }}
  </Query>
);

export default HomeComponent;
