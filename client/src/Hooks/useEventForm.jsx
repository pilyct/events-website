import { useReducer, useEffect } from 'react';
import { getCurrentDateTime } from '../utils/getCurrentTime';
import { formatDate } from '../utils/formatDate';


const initialState = (eventToEdit) => ({
  title: eventToEdit ? eventToEdit.title : '',
  date: eventToEdit ? formatDate(eventToEdit.date) : getCurrentDateTime(),
  venue: eventToEdit ? eventToEdit.venue : '',
  city: eventToEdit ? eventToEdit.city : '',
  isLoading: false,
});

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESET_FORM':
      return initialState(action.payload);
    default:
      return state;
  }
}

export function useEventForm(eventToEdit) {
  const [state, dispatch] = useReducer(reducer, initialState(eventToEdit));

  useEffect(() => {
    if (eventToEdit) {
      dispatch({ type: 'RESET_FORM', payload: eventToEdit });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM', payload: null });
  };

  return {
    state,
    handleChange,
    resetForm,
    dispatch,
  };
}
