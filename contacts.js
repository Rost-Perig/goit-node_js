const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const readContent = async () => {
    const content = await fs.readFile(path.join(__dirname, 'db', 'contacts.json'), 'utf8');
    const result = JSON.parse(content);
    return result
};

const listContacts = async () => await readContent();

const getContactById = async (contactId) => (await readContent()).filter(item => item.id === contactId);

// const getContactById = async (contactId) => {
//   const contactsArr = await readContent();
//   const [contactById] = contactsArr.filter(item => item.id === contactId);
//   return contactById;
// };

const removeContact = async (contactId) => {
  const contactsArr = await readContent();
  const contactsAfterRemove = contactsArr.filter(item => item.id !== contactId);
  await fs.writeFile(
        path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(contactsAfterRemove, null, 2)
    );
};

const addContact = async (name, email, phone) => {
    const contactsArr = await readContent();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    contactsArr.push(newContact);
    await fs.writeFile(
        path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(contactsArr, null, 2)
    );
    return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };