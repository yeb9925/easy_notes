/**
 * ACTION TYPES
 */
const UPDATE_NOTE = 'UPDATE_NOTE';

/**
 * INITIAL STATE
 */
const updateNote = '';

/**
 * ACTION CREATORS
 */
export const updatedNote = note => ({type: UPDATE_NOTE, note});

export const getNoteState = () => updateNote;

/**
 * REDUCER
 */
export default function (state = updateNote, action) {
  switch (action.type) {
    case UPDATE_NOTE:
      return updateNote = action.note;
    default:
      return state;
  }
}