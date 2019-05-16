import React from "react";
import { Row, Col, Modal, Input, Button } from "antd";
import { connect } from "react-redux";
import { updateNote, deleteNote } from "../actions/noteActions";
const { TextArea } = Input;

class EditNoteModal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null
    };
    this.sendNoteUpdate = this.sendNoteUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { note } = this.props;
    this.setState({ title: note.title, description: note.description });
  }

  sendNoteUpdate() {
    const { title, description } = this.state;
    const { user, hideModal, note } = this.props;
    this.props.updateNote({ ...note, title, description });
    this.props.hideModal();
  }

  handleDelete() {
    const { note } = this.props;
    this.props.deleteNote(note);
    this.props.hideModal();
  }

  renderContents() {
    const { note } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col style={{ width: "80%" }}>
          <div>Title</div>
          <Input
            style={{ marginBottom: "1em" }}
            onChange={e => this.setState({ title: e.target.value })}
            defaultValue={note.title}
            size="large"
            placeholder="Title"
          />
          <div>Description</div>
          <TextArea
            style={{ height: 100 }}
            onChange={e => this.setState({ description: e.target.value })}
            defaultValue={note.description}
            size="large"
            placeholder="Description"
          />
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Modal
        title="Add Note"
        visible={this.props.visible}
        onOk={this.sendNoteUpdate}
        onCancel={this.props.hideModal}
        footer={[
          <Button key="back" onClick={this.props.hideModal}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" onClick={this.handleDelete}>
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Update Note
          </Button>
        ]}
      >
        {this.renderContents()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { updateNote, deleteNote }
)(EditNoteModal);
