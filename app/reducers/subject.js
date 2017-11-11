/**
 * ACTION TYPES
 */
const GET_SUBJECT = 'GET_SUBJECT';

/**
 * INITIAL STATE
 */
const selectedSubject = '';

/**
 * ACTION CREATORS
 */
export const selectSubject = subject => ({type: GET_SUBJECT, subject});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = selectedSubject, action) {
  switch (action.type) {
    case GET_SUBJECT:
      return action.subject;
    default:
      return state;
  }
}