import {createSlice} from '@reduxjs/toolkit';

interface RecipientState {
  addingRecipient: boolean;
  addedRecipient: boolean;
  recipient: {
    id?: string;
    name: string;
    email: string;
    address: string;
    location: any;
    phone: string;
    information: string;
  };
  error: any;
}

const recipientSlice = createSlice({
  name: 'recipient',
  initialState: {
    addingRecipient: false,
    addedRecipient: false,
    recipient: {},

    error: {},
  } as RecipientState,

  reducers: {
    addRecipient(state, action) {
      state.addingRecipient = true;
      state.addedRecipient = false;
    },
    addRecipientSuccess(state, action) {
      state.recipient = Object.assign(state.recipient, action.payload);
      state.addingRecipient = false;
      state.addedRecipient = true;
    },
    addRecipientError(state, action) {
      state.addingRecipient = false;
      state.addedRecipient = false;
      state.error = action.payload;
    },

    saveRecipient(state, action) {},
  },
});

export const {addRecipient, addRecipientSuccess, addRecipientError, saveRecipient} = recipientSlice.actions;
export default recipientSlice.reducer;
