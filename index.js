// const chalk = require('chalk');
const colors = require('colors');
const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const program = new Command();

program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsArr = await listContacts();
      console.log(colors.black.bgGreen('Contact list:'));
      console.table(contactsArr);
      break;

    case 'get':
      const [contactById] = await getContactById(id);
      contactById.length !== 0 ?
      console.log(colors.black.bgGreen(`Contact with id ${id}:`), contactById) :
      console.log(colors.black.bgRed(`Ничего с таким id ${id} не найдено`));
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(colors.black.bgGreen('Added new contact:'), newContact);
      break;
    
    case 'remove':
      const [removedContact] = await getContactById(id);
      console.log(colors.black.bgYellow('Removed contact:'), removedContact);
      await removeContact(id);
      break;

    default:
      console.warn(colors.black.bgRed('Unknown action type!'));
  };
};

invokeAction(argv)
    .then(() => console.log(colors.black.bgGreen('Operation success!')));
