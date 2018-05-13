import React, { Component } from "react";
import { connect } from "react-redux";
import { addFolder, addingFolder, removeFolder } from "./actions.js";
import { FaFolderO } from "react-icons/lib/fa";
class FolderPane extends Component {
  state = {
    currState: [0],
    history: [],
    addingFolder: false,
    currFolderPath: [0],
    parent: null
  };
  addFolder = (id, e) => {
    if (e.key === "Enter") {
      this.props.addFolder(id, e.target.value);
    }
  };

  clickFolder = (id) => {
    console.log("clickFolder", id);
    // Change currState.
    // Maintain History.
    let currFolderPath = this.findFolderPath(id);
    console.log(currFolderPath);
    this.setState({
      currState: this.props.folders.folderState[id].children,
      history: [...this.state.history, ...[id]],
      currFolderPath,
      parent: id
    });
  }

  findFolderPath = (id) => {
    let { folderState } = this.props.folders;
    console.log(folderState);
    let path = [id]
    while (folderState[id].parent != null) {
      path.push(folderState[id].parent);
      id = folderState[id].parent;
    }
    return  [...path].reverse();
  }
  goBack = () => {
    //Remove item from history.
    // Change current State to last one.
    if( this.state.history.length !== 0 ) {
      let { folders } = this.props;
      let { history } = this.state;
      let lastItemId = history[history.length - 1];
      let lastItems = lastItemId === 0 ? [0] : folders.folderState[folders.folderState[lastItemId].parent].children;
      let newHistory = history.slice(0, -1);
      this.setState({
        currState: lastItems,
        history: newHistory,
        parent: folders.folderState[lastItemId].parent
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.folders.folderAdded) {
      this.setState({
        addingFolder: false,
        currState: [
          ...this.state.currState,
          ...[nextProps.folders.newFolderId]
        ]
      });
    }
  }
  render() {
    if (this.props.folders.folderState) {
    
      let {folders} = this.props;
      let {addingFolder, currState, currFolderPath, parent} = this.state;
      console.log(currState);
      let folderItems = currState.map(id => (
        <div
          onClick={this.clickFolder.bind(null, id)}
          key={id}
          class="folder-item"
        >
          <div className="centered-text">
            <FaFolderO size="30" />
          </div>
          <div className="centered-text">
            {folders.folderState[id].name}
          </div>
        </div>
      ));
      let currentPathItems = currFolderPath.map(id => (
        <div onClick={this.clickFolder.bind(null, id)} key={id} className="history-items">
          {folders.folderState[id].name}
        </div>
      ));
      let addFolderBtn = currState[0] !== 0 
                          ? <button onClick={() => this.setState({addingFolder: true})}>Add folder</button>
                          : null;
      let newFolderInput = addingFolder
                            ? <input type="text" id="new-folder-input" autoFocus onKeyPress={this.addFolder.bind(null, parent)} />
                            : null;

      return <div class="folder-pane">
          <div className="history-container">{currentPathItems}</div>
          <button onClick={this.goBack} id="back-btn">Back</button>
          {addFolderBtn}
          {newFolderInput}
          <div id="folder-items-holder">{folderItems}</div>
        </div>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = folders => {
  return { folders };
};

export default connect(mapStateToProps, {
  addFolder,
  removeFolder
})(FolderPane);
