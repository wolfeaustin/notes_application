import React from "react";
import { Col, Row, Divider } from "antd";
import { connect } from "react-redux";
import { getNotes, addNote } from "../actions/noteActions";
import EditNoteModal from "./EditNoteModal";

class NotesContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedNote: null,
      modalVisible: false
    };
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.props.getNotes();
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  renderNote(note) {
    return (
      <Col
        onClick={() =>
          this.setState({ selectedNote: note, modalVisible: true })
        }
        span={7}
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          margin: "1em",
          borderColor: "#d6d6d6",
          borderRadius: 5,
          padding: "1.75em",
          cursor: "pointer"
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 500 }}>{note.title}</div>
        <Divider />
        <div>{note.description}</div>
      </Col>
    );
  }

  render() {
    console.log(this.props);
    const { selectedNote, modalVisible } = this.state;
    const { filter } = this.props;
    return (
      <Row style={{ marginTop: "2em" }} type="flex" justify="center">
        {selectedNote && (
          <EditNoteModal
            visible={modalVisible}
            note={selectedNote}
            hideModal={this.hideModal}
          />
        )}
        <Row style={{ width: "70%" }}>
          {this.props.notes.notes && //only render notes with an active status
            this.props.notes.notes
              .filter(
                n => (filter == "Your Notes" ? n.active : !n.active) //either show deleted notes or your notes
              )
              .map(note => this.renderNote(note))}
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.note
});

export default connect(
  mapStateToProps,
  { getNotes }
)(NotesContainer);
