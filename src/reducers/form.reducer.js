const formInitialState = { files: [], sentLetters: [] };

export default (state = formInitialState, action) => {
  switch (action.type) {
    case "ADD_FILE":
      const { files } = action;
      const newState = { ...state, files: [...state.files, ...files] };
      return newState;

    case "DELETE_FILE":
      const { index } = action;
      const newStateForRemove = {
        ...state,
        files: [...state.files.filter((file, i) => i !== index)],
      };
      return newStateForRemove;

    case "SET_SENT_LETTERS":
      const { letter } = action;
      return { ...state, sentLetters: [...state.sentLetters, letter] };

      case "GET_LETTER_INFO":
        const { status, id } = action;
        const letterForInfo = state.sentLetters.find(letter => letter.trackId === id);
        letterForInfo.status = status;
        return { ...state, sentLetters: [...state.sentLetters] };

    default:
      return state;
  }
};
