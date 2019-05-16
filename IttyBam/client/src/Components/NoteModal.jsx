import React from "react";
import { Row, Col, Modal, Input } from "antd";
import { connect } from "react-redux";
import { addNote } from "../actions/noteActions";
const { TextArea } = Input;

class NoteModal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null
    };
    this.createNote = this.createNote.bind(this);
  }

  createNote() {
    const { title, description } = this.state;
    const { user, hideModal } = this.props;
    this.props.addNote({ title, description, created_by: user.user });
    this.props.hideModal();
  }

  renderContents() {
    return (
      <Row type="flex" justify="center">
        <Col style={{ width: "80%" }}>
          <div>Title</div>
          <Input
            style={{ marginBottom: "1em" }}
            onChange={e => this.setState({ title: e.target.value })}
            size="large"
            placeholder="Title"
          />
          <div>Description</div>
          <TextArea
            style={{ height: 100 }}
            onChange={e => this.setState({ description: e.target.value })}
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
        onOk={this.createNote}
        okText="Create Note"
        onCancel={this.props.hideModal}
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
  { addNote }
)(NoteModal);
