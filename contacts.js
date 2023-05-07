const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContact = async(contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((data) => data.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((data) => data.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts)
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContacts);
  await updateContact(contacts)
  return newContacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
