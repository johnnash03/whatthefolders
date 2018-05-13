// Sample State.
let folderState = {
  0: {
    name: "Root",
    children: [1, 3],
    parent: null
  },
  1: {
    name: "Movies",
    children: [2, 5, 7],
    parent: 0
  },
  2: {
    name: "Dil Chahta Hai",
    children: [],
    parent: 1
  },
  3: {
    name: "Songs",
    children: [4, 6],
    parent: 0
  },
  4: {
    name: "Kabira",
    children: [],
    parent: 3
  },
  5: {
    name: "Andaz Apna Apna",
    children: [],
    parent: 1
  },
  6: {
    name: "Yun hi chala chal",
    children: [],
    parent: 3
  },
  7: {
    name: "Lagaan",
    children: [],
    parent: 1
  }
};
// Uncomment the following for the clean state.Also, comment the original folder state.  

// let folderState =  {
//   0: {
//     name: "/",
//     children: [],
//     parent: null
//   }
// }

const folders = (state = {folderState, folderAdded: false}, action) => {
  console.log("action in reducer", action);
  switch(action.type) {
    case "ADDING_FOLDER":
      // let newFolderId = Math.max(...Object.keys(state))+1;
      // return {
      //   ...state,
      //   [action.id]: {...state[action.id], ...{children: [...state[action.id].children, ...[newFolderId]]}},
      //   [newFolderId]: {name: "", children: [], empty: true, parent: action.id}
      // }
      return state;
    case "ADD_FOLDER":
      let newFolderId = Math.max(...Object.keys(state.folderState)) + 1;
      let {folderState} = state;
      let newFolderState =  { 
        ...folderState,
        [action.id]: { ...folderState[action.id], ...{ children: [...folderState[action.id].children, ...[newFolderId]] } },
        [newFolderId]: { name: action.name, children: [], parent: action.id }
      };
      return { folderState: newFolderState, folderAdded: true, newFolderId };
    case "REMOVE_FOLDER":
      let removedChildArr = state[state[action.id].parent].children.filter(childId => childId !== action.id );
      console.log(removedChildArr);
      let { [action.id]: value, ...newState } = state;
      newState = {...newState, [state[action.id].parent]: {...state[state[action.id].parent], ...{children: removedChildArr}}};
      console.log(newState);

      return newState;
    
    default:
      return state;
  }
};

export default folders;
