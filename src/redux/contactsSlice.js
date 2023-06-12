import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

export const notifySettings = {
  width: '380px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  borderRadius: '12px',
};

export const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: defaultContacts,
  reducers: {
    addContact: (state, { payload }) => {
      const { name, number } = payload;
      const id = nanoid();

      const includesName = state.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (includesName) {
        return Notiflix.Notify.warning(
          `${name} is already in contacts`,
          notifySettings
        );
      } else {
        const contact = { id, name, number };
        state.push(contact);
        Notiflix.Notify.success(
          `${name} was successfully added to your contacts`,
          notifySettings
        );
      }
    },

    removeContact: (state, { payload }) => {
      const { name, id } = payload;
      Notiflix.Notify.info(
        `${name} was successfully deleted from your contacts`,
        notifySettings
      );
      return state.filter(contact => contact.id !== id);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
