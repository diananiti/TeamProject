import * as React from 'react';
import TaskListComponent from './TaskList';
import { ScaleLoader } from 'react-spinners';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-date-picker';
import {
  getAllTasks,
  saveNewTask,
  getAllUsers,
} from '../queries/ProjectQueries';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { withRouter } from 'react-router';

interface Props {
  match: any;
  projectID: number;
}

interface State {
  taskList: any;
  memberList: any;
  userList: any;
  isTaskListReady: boolean;
  showAddTaskModal: boolean;
  showMembersModal: boolean;
  newTask: Task;
}

interface Task {
  name: string;
  description: string;
  category: string;
  endDateAssumption: Date;
  status: string;
}

class ProjectComponent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      taskList: null,
      memberList: null,
      userList: null,
      isTaskListReady: false,
      showAddTaskModal: false,
      showMembersModal: false,
      newTask: {
        name: '',
        description: '',
        category: '',
        endDateAssumption: new Date(),
        status: '',
      },
    };
    this.onLoadTasks = this.onLoadTasks.bind(this);
    this.onLoadUsers = this.onLoadUsers.bind(this);
    this.onAddTaskModal = this.onAddTaskModal.bind(this);
    this.onMembersModal = this.onMembersModal.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.afterChangeTaskUpdate = this.afterChangeTaskUpdate.bind(this);
  }

  async componentDidMount() {
    await this.onLoadUsers();
    await this.onLoadTasks();
  }

  async onLoadTasks() {
    let newTaskList = await getAllTasks();
    this.setState({ taskList: newTaskList, isTaskListReady: true });
  }

  async onLoadUsers() {
    let newUserList = await getAllUsers();
    this.setState({ userList: newUserList });
  }

  async onLoadMembers() {
    let newMemberList = await getAllUsers();
    this.setState({ memberList: newMemberList });
  }

  onAddTaskModal() {
    this.setState(() => ({ showAddTaskModal: true }));
  }

  onMembersModal() {
    this.setState(() => ({ showMembersModal: true }));
  }

  async onAddTask() {
    this.setState({ isTaskListReady: false, showAddTaskModal: false });
    await saveNewTask(this.state.newTask);
    this.onLoadTasks();
  }

  afterChangeTaskUpdate() {
    this.setState({ isTaskListReady: false });
    this.onLoadTasks();
  }

  render() {
    return (
      <div>
        <div className="ProjectTitle">
          {this.props.match.params.projectName}&nbsp;&nbsp;&nbsp;
          <Button variant="info" onClick={this.onMembersModal}>
            Members
          </Button>
        </div>

        {this.state.isTaskListReady ? (
          <div className="split">
            <div className="flex gray">
              <div className="ListHeader">
                <Button variant="primary" onClick={this.onAddTaskModal}>
                  Add Task
                </Button>
                <div className="SearchForm">
                  <Form.Control placeholder="Search ..." />
                </div>
              </div>
              <TaskListComponent
                taskList={this.state.taskList}
                afterChangeTaskUpdate={this.afterChangeTaskUpdate}
              />
            </div>
            <div className="flex">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              tempus porttitor tempor. Aenean enim nisl, tincidunt in rhoncus
              sit amet, tempor ut purus. Curabitur eu ligula eu felis ultricies
              tempor. Proin blandit sapien quis vulputate ullamcorper. Ut a
              tellus feugiat, eleifend metus ac, consectetur lacus. Quisque
              iaculis sodales imperdiet. Curabitur quam ligula, cursus in
              condimentum ac, egestas nec lacus. Sed tortor nulla, tincidunt ut
              turpis eu, commodo blandit nulla. Duis viverra placerat neque ut
              tincidunt. Aenean gravida molestie pulvinar. Sed sit amet gravida
              risus. Nulla bibendum quam et dui auctor laoreet. Pellentesque
              dictum, metus consectetur gravida auctor, turpis nibh rutrum
              neque, at luctus felis justo id purus.
              <br />
              In hac habitasse platea dictumst. Integer maximus rutrum lorem,
              eget scelerisque ex pharetra non. Donec iaculis erat velit, in
              venenatis massa lobortis ultrices. Suspendisse nulla quam,
              sagittis vitae mauris nec, elementum auctor augue. Mauris mollis
              sem sit amet accumsan varius. Duis eget leo orci. Praesent nec
              auctor magna. Sed id magna libero. Vestibulum id risus ac lacus
              pellentesque scelerisque. Praesent mattis nulla at dolor mattis
              congue. In rhoncus risus erat, sed tristique eros vestibulum ac.
              Orci varius natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Praesent rutrum egestas ex. Quisque
              tincidunt ac nisi sit amet tempus.
            </div>
            <Modal
              show={this.state.showAddTaskModal}
              onHide={() => this.setState(() => ({ showAddTaskModal: false }))}
            >
              <Modal.Header closeButton>
                <Modal.Title>Describe your task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e: any) => {
                    let temporaryTask = this.state.newTask;
                    temporaryTask.name = e.target.value;
                    this.setState({ newTask: temporaryTask });
                  }}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e: any) => {
                    let temporaryTask = this.state.newTask;
                    temporaryTask.description = e.target.value;
                    this.setState({ newTask: temporaryTask });
                  }}
                />
                <Form.Label>Category</Form.Label>
                <Form.Control
                  onChange={(e: any) => {
                    let temporaryTask = this.state.newTask;
                    temporaryTask.category = e.target.value;
                    this.setState({ newTask: temporaryTask });
                  }}
                />
                <Form.Label>End Date</Form.Label>
                <br />
                <DatePicker
                  value={this.state.newTask.endDateAssumption}
                  onChange={(e: any) => {
                    let temporaryTask = this.state.newTask;
                    temporaryTask.endDateAssumption = e;
                    this.setState({ newTask: temporaryTask });
                  }}
                />
                <br />
                <Form.Label>Status</Form.Label>
                <Form.Control
                  onChange={(e: any) => {
                    let temporaryTask = this.state.newTask;
                    temporaryTask.status = e.target.value;
                    this.setState({ newTask: temporaryTask });
                  }}
                />
                {/* <Form.Control
                  as="select"
                  onChange={(e: any) => {
                    let temporaryTask = this.state.newTask;
                    temporaryTask.status = e.target.value;
                    this.setState({ newTask: temporaryTask });
                  }}
                >
                  <option>To do</option>
                  <option>In progress</option>
                  <option>Done</option>
                </Form.Control> */}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() =>
                    this.setState(() => ({ showAddTaskModal: false }))
                  }
                >
                  Close
                </Button>
                <Button variant="primary" onClick={this.onAddTask}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={this.state.showMembersModal}
              onHide={() => this.setState(() => ({ showMembersModal: false }))}
            >
              <Modal.Header closeButton>
                <Modal.Title>Manage project's members</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>Add members</Form.Label>
                <Typeahead
                  id={'autocomplete'}
                  options={this.state.userList}
                  labelKey={(option: any) => `${option.email} : ${option.name}`}
                  multiple={true}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() =>
                    this.setState(() => ({ showMembersModal: false }))
                  }
                >
                  Close
                </Button>
                <Button variant="primary">Add</Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          <div className="loader">
            <ScaleLoader
              height={135}
              width={10}
              margin={'10px'}
              radius={2}
              color={'#333333'}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ProjectComponent);
