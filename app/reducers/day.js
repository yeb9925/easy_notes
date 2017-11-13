/**
 * ACTION TYPES
 */
const GET_DAY = 'GET_DAY';

/**
 * INITIAL STATE
 */
const date = new Date();
const selectedDay = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

/**
 * ACTION CREATORS
 */
export const selectDay = day => ({type: GET_DAY, day});

export const getDayState = () => selectedDay;
/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = selectedDay, action) {
  switch (action.type) {
    case GET_DAY:
      return selectedDay = action.day;
    default:
      return state;
  }
}