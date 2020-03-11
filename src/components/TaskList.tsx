import * as React from 'react';
import TaskIconComponent from './TaskIcon';

interface Props {
  taskList: any;
  afterChangeTaskUpdate: Function;
}

class TaskListComponent extends React.Component<Props, {}> {
  render() {
    return (
      <div className="TaskList">
        {this.props.taskList.map((task: any) => (
          <TaskIconComponent
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            category={task.category}
            endDateAssumption={task.endDateAssumption}
            status={task.status}
            afterChangeTaskUpdate={this.props.afterChangeTaskUpdate}
          />
        ))}
      </div>
    );
  }
}

export default TaskListComponent;
