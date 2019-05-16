import React from "react";
import { Row, Col, Divider } from "antd";
import { connect } from "react-redux";
import { getNotes, addNote } from "../actions/noteActions";
import ittyBamPhoto from "../images/ittyBam.jpg";
import NotesContainer from "../Components/NotesContainer";
import NotesModal from "../Components/NoteModal";

class UserNotes extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      notesFilter: "Your Notes"
    };
  }

  componentDidMount() {
    this.props.getNotes();
  }

  // Need to check if the user is logged in before making it to the page

  updateFilter(filter) {
    this.setState({ notesFilter: filter });
  }

  renderMenu() {
    const { notesFilter } = this.state;
    return (
      <Row
        type="flex"
        gutter={30}
        style={{
          padding: "2em",
          fontSize: 16,
          fontWeight: 500,
          marginLeft: "3em"
        }}
      >
        <Col
          onClick={() => this.setState({ modalVisible: true })}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          Add Note
        </Col>
        <Divider style={{ height: 30 }} type="vertical" />
        <Col
          style={
            notesFilter === "Your Notes"
              ? { cursor: "pointer", color: "#1890ff" }
              : { cursor: "pointer" }
          }
          onClick={() => this.updateFilter("Your Notes")}
        >
          Your Notes
        </Col>
        <Col
          style={
            notesFilter !== "Your Notes"
              ? { cursor: "pointer", color: "#1890ff" }
              : { cursor: "pointer" }
          }
          onClick={() => this.updateFilter("Deleted Notes")}
        >
          View Deleted Notes
        </Col>
      </Row>
    );
  }

  renderUserInformation() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <div style={{ marginRight: "3em", color: "white", fontSize: 20 }}>
        {(user && user.user && user.user.email) || "User Information"}
      </div>
    );
  }

  renderLogo() {
    return (
      <Row type="flex" align="middle">
        <Col
          style={{
            marginLeft: "3em",
            height: 50,
            width: 50,
            backgroundImage: `url(${ittyBamPhoto})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: 50
          }}
        />
        <Col style={{ marginLeft: "1em", fontSize: 16, color: "white" }}>
          IttyBam
        </Col>
      </Row>
    );
  }

  renderHeader() {
    return (
      <Row
        type="flex"
        align="middle"
        justify="space-between"
        style={{ height: 100, backgroundColor: "#1890ff" }}
      >
        <Col>{this.renderLogo()}</Col>
        <Col>{this.renderUserInformation()}</Col>
      </Row>
    );
  }

  render() {
    const { modalVisible, notesFilter } = this.state;
    return (
      <div>
        <NotesModal
          hideModal={() => this.setState({ modalVisible: false })}
          visible={modalVisible}
        />
        {this.renderHeader()}
        {this.renderMenu()}
        <NotesContainer filter={notesFilter} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  note: state.note,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getNotes }
)(UserNotes);
