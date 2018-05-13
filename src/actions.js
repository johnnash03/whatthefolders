export const addFolder = (id, name) => ({
  type: "ADD_FOLDER",
  id,
  name
});

export const addingFolder = id => ({
  type: "ADDING_FOLDER",
  id
});

export const removeFolder = id => ({
  type: "REMOVE_FOLDER",
  id
});