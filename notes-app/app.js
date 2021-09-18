const yargs = require("yargs");
const { addNote, removeNote, listNotes, readNotes } = require("./notes");

//Customize version
yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Content of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => addNote(argv.title, argv.body),
});

yargs.command({
  command: "remove",
  describe: "Remove an specific note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => removeNote(argv.title),
});

yargs.command({
  command: "list",
  describe: "List all created notes",
  handler: listNotes,
});

yargs.command({
  command: "read",
  describe: "Read content from a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => readNotes(argv.title),
});

yargs.parse();
