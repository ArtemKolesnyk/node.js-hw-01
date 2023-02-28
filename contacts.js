const fs = require('fs/promises');
const path = require('path');
const cryptoid = require('crypto');

const contactsPath = path.resolve(__dirname, '.', 'db', 'contacts.json');

const listContacts = async () => {
  try {
    const rawData = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = await listContacts();
    return contactById.find((i) => String(i.id) === String(contactId));
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContact = contacts.filter(
      (i) => String(i.id) !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContact, null));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: cryptoid.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = { listContacts, getContactById, removeContact, addContact };
