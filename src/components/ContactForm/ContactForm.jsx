import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { notifySettings, addContact } from '../../redux/contactsSlice';
import { Form, Label } from './ContactForm.styled';
import { Btn } from '../Btn/Btn';
import { InputItem } from './InputItem';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const includesName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (includesName) {
      return Notiflix.Notify.warning(
        `${name} is already in contacts`,
        notifySettings
      );
    }

    const id = nanoid();
    const contact = { id, name, number };

    dispatch(addContact(contact));

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Ім'я
        <InputItem
          onChange={onInputChange}
          value={name}
          name="name"
          placeholder="Введіть ім'я контакту"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </Label>
      <Label>
        Номер
        <InputItem
          onChange={onInputChange}
          value={number}
          type="tel"
          name="number"
          placeholder="Введіть номер контакту"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
      </Label>
      <Btn type="submit" status="add" text="Add contact" />
    </Form>
  );
};