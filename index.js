const { program } = require('commander');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');

program
  .name('myCLI')
  .description('A simple CLI to manage your contacts')
  .version('1.0.0')
  .option('-a, --action <action>', 'Action to perform')
  .option('-i, --id <id>', 'Contact id')
  .option('-t, --name <name>', 'Contact name')
  .option('-c, --email <email>', 'Contact email')
  .option('p, --phone <phone>', 'Contact phone');

program.parse(process.argv);
const { action, id, name, email, phone } = program.opts();

(async () => {
  if (action === 'list') {
    const contacts = await listContacts();
    console.table(contacts);
  }
  if (action === 'get') {
    const contact = await getContactById(id);
    if (!contact) {
      throw new Error(`Sorry, contact by id=${id} not found. Try again!`);
    }
    console.log(contact);
  }
  if (action === 'remove') {
    const remContact = await removeContact(id);
    console.log(remContact);
    const contacts = await listContacts();
    console.log(contacts);
  }
  if (action === 'add') {
    const newContact = await addContact(name, email, phone);
    const contacts = await listContacts();
    console.log(newContact);
    console.table(contacts);
  }
})();
