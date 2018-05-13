import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { addFolder, addingFolder, removeFolder } from "./actions.js";
import { FaFolderO } from "react-icons/lib/fa";
class Hierarchy extends Component {
  addFolder = (id, e) => {
    if (e.key === "Enter") {
      this.props.addFolder(id, e.target.value);
    }
  };

  renderFolders(currentKey = "0") {
    if (this.props.folders.folderState[currentKey].children.length) {
      return (
        <ul>
          <li>
            <FaFolderO />
            {this.props.folders.folderState[currentKey].name}
            <ul>
              {this.props.folders.folderState[currentKey].children.map(id => (
                <li key={id}>{this.renderFolders(id)} </li>
              ))}
            </ul>
          </li>
        </ul>
      );
    } else {
      if (this.props.folders.folderState[currentKey].hasOwnProperty("empty")) {
        return (
          <ul>
            <li>
              <input
                type="text"
                autoFocus
                onKeyPress={this.addFolder.bind(null, currentKey)}
              />
            </li>
          </ul>
        );
      }
      return (
        <ul>
          <li>
            <FaFolderO />
            {this.props.folders.folderState[currentKey].name}
          </li>
        </ul>
      );
    }
  }

  render() {
    console.log(this.props.folders.folderState);
    if (this.props.folders.folderState) {
      let html = this.renderFolders("0");
      console.log(html);
      return <div className="App">{html}</div>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = folders => {
  return { folders };
};

export default connect(mapStateToProps, {
  addingFolder,
  addFolder,
  removeFolder
})(Hierarchy);
