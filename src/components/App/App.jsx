import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

export default function App () {
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsStorage = localStorage.getItem('contacts' ?? '');
    const parsedContacts = JSON.parse(contactsStorage);
    
    if(parsedContacts) {
      setContacts(parsedContacts);
    }
    
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({name, number}) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    }

    if (contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
        return alert(`${newContact.name} is already in contacts.`);
    }

    if (contacts.find(
      contact => contact.number === newContact.number)) {
        return alert(`This phone number is already in contacts.`);
    }

    setContacts(contacts => [newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  
  const getVisibleContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(filter),
    ); 
  
  const deleteContact = contactId => {
    setContacts(contacts => 
      contacts.filter(contact => contact.id !== contactId)
    );
  };
    
  return (
      <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}/>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}/>
        <ContactList contacts={getVisibleContacts} onDeleteContact={deleteContact}/>
      </>
    );
  };