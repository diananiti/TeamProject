import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-date-picker';
import { deleteTask, modifyTask } from '../queries/ProjectQueries';

interface Props {
  id: number;
  name: string;
  description: string;
  category: string;
  endDateAssumption: string;
  status: string;
  afterChangeTaskUpdate: Function;
}

interface Status {
  showTaskModal: boolean;
  modifiedTask: Task;
}

interface Task {
  id: number;
  name: string;
  description: string;
  category: string;
  endDateAssumption: Date;
  status: string;
}

class TaskIconComponent extends React.Component<Props, Status> {
  constructor(props: any) {
    super(props);

    this.state = {
      showTaskModal: false,
      modifiedTask: {
        id: this.props.id,
        name: this.props.name,
        description: this.props.description,
        category: this.props.category,
        endDateAssumption: new Date(this.props.endDateAssumption),
        status: this.props.status,
      },
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  async onDeleteClick() {
    await deleteTask(this.props.id);
    this.props.afterChangeTaskUpdate();
  }

  async onSaveClick() {
    await modifyTask(this.state.modifiedTask);
    this.props.afterChangeTaskUpdate();
  }

  render() {
    return (
      <div>
        <div
          className="TaskIcon"
          onClick={() => this.setState({ showTaskModal: true })}
        >
          {this.props.name}
        </div>
        <Modal
          show={this.state.showTaskModal}
          onHide={() => this.setState(() => ({ showTaskModal: false }))}
        >
          <Modal.Body>
            <Form.Label>Name</Form.Label>
            <Form.Control
              defaultValue={this.props.name}
              onChange={(e: any) => {
                let temporaryTask = this.state.modifiedTask;
                temporaryTask.name = e.target.value;
                this.setState({ modifiedTask: temporaryTask });
              }}
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              defaultValue={this.props.description}
              onChange={(e: any) => {
                let temporaryTask = this.state.modifiedTask;
                temporaryTask.description = e.target.value;
                this.setState({ modifiedTask: temporaryTask });
              }}
            />
            <Form.Label>Category</Form.Label>
            <Form.Control
              defaultValue={this.props.category}
              onChange={(e: any) => {
                let temporaryTask = this.state.modifiedTask;
                temporaryTask.category = e.target.value;
                this.setState({ modifiedTask: temporaryTask });
              }}
            />
            <Form.Label>End Date</Form.Label>
            <br />
            <DatePicker
              value={new Date(this.state.modifiedTask.endDateAssumption)}
              onChange={(e: any) => {
                let temporaryTask = this.state.modifiedTask;
                temporaryTask.endDateAssumption = e;
                this.setState({ modifiedTask: temporaryTask });
              }}
            />
            <br />
            <Form.Label>Status</Form.Label>
            <Form.Control
              defaultValue={this.props.status}
              onChange={(e: any) => {
                let temporaryTask = this.state.modifiedTask;
                temporaryTask.status = e.target.value;
                this.setState({ modifiedTask: temporaryTask });
              }}
            />
          </Modal.Body>
          <Modal.Footer className="taskModalFooter">
            <Button variant="danger" onClick={this.onDeleteClick}>
              Delete
            </Button>
            <div>
              <Button
                variant="secondary"
                onClick={() => this.setState(() => ({ showTaskModal: false }))}
              >
                Close
              </Button>
              &nbsp;&nbsp;
              <Button variant="primary" onClick={this.onSaveClick}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TaskIconComponent;
