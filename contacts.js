const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile("db/contacts.json");
    return JSON.parse(data);
  } catch (error) {
    return console.log(error.message);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find((item) => item.id === contactId);
  return findContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const changedContacts = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(changedContacts));
}

async function addContact(name, email, phone) {
  const newContactId = Date.now();
  const contacts = await listContacts();
  contacts.push({
    id: newContactId.toString(),
    name,
    email,
    phone,
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};