/**
 * ACTION TYPES
 */
const UPDATE_ID = 'UPDATE_ID';

/**
 * INITIAL STATE
 */
const updateNoteId = '';

/**
 * ACTION CREATORS
 */
export const updatedNoteId = id => ({type: UPDATE_ID, id});

export const getNoteIdState = () => updateNoteId;

/**
 * REDUCER
 */
export default function (state = updateNoteId, action) {
  switch (action.type) {
    case UPDATE_ID:
      return updateNoteId = action.id;
    default:
      return state;
  }
}