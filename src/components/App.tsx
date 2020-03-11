import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import UserComponent from './User';
import AboutComponent from './About';
import HomeComponent from './Home';
import ProjectComponent from './Project';

const App = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/user" component={UserComponent} />
        <Route path="/about" component={AboutComponent} />
        <Route
          path="/project/:projectName"
          render={props => <ProjectComponent {...props} projectID={2} />}
        />
      </Switch>
    </div>
  );
};

export default App;
