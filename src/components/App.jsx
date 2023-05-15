import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './Forms/PhoneForm';
import { Filter } from './Filter/Filter';
import { ContactsBook, PhonebookTitle, ContactsTitle } from './AppStyled';

const KEY = 'contacts';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(KEY)) ?? []
  );

  useEffect(() => {
    const contacts = JSON.parse(window.localStorage.getItem(KEY));

    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(
    () => window.localStorage.setItem(KEY, JSON.stringify(contacts)),
    [contacts]
  );

  const addContact = ({ name, number }) => {
    const loweredName = name.toLowerCase();

    contacts.find(contact => contact.name.toLowerCase() === loweredName)
      ? alert(`${name} is already in contacts`)
      : setContacts(contacts => [...contacts, { id: nanoid(), name, number }]);
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const deleteContact = id =>
    setContacts(contacts => contacts.filter(contact => contact.id !== id));

  const loweredFilter = filter.toLocaleLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(loweredFilter)
  );

  return (
    <ContactsBook>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onSubmit={addContact} />

      <ContactsTitle>Contacts</ContactsTitle>
      <Filter onChange={changeFilter} value={filter} />
      <ContactsList contacts={filteredContacts} onClick={deleteContact} />
    </ContactsBook>
  );
};
