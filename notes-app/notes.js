const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  if (title === "" || body === "") {
    console.log(chalk.red.bold.inverse("The arguments shouldn't be empty"));
    return;
  }
  const notes = loadNotes();

  const duplicateNotes = notes.filter((n) => {
    return n.title === title;
  });

  if (duplicateNotes.length > 0) {
    console.log(
      chalk.red.bold.inverse("Already exists a note with the same title!")
    );
    return;
  }

  notes.push({
    title: title,
    body: body,
  });

  saveNotes(notes);
  console.log(chalk.green.bold.inverse("New note added!"));
};

const removeNote = (title) => {
  if (title === "") {
    console.log(chalk.red.bold.inverse("The argument shouldn't be empty"));
    return;
  }

  const notes = loadNotes();
  const remainValue = notes.filter((v) => v.title !== title);

  saveNotes(remainValue);
  console.log(chalk.blue.bold.inverse("Note removed successfully > ", title));
};

const listNotes = () => {
  const notes = loadNotes().map((note) => note.title);
  console.log("Notes: ", notes);
  return notes;
};

const readNotes = (title) => {
  if (title === "") {
    console.log(chalk.red.bold.inverse("The argument shouldn't be empty"));
    return;
  }

  const note = loadNotes()
    .filter((v) => v.title === title)
    .shift();
  console.log("Notes: ", note);

  return note;
};

const loadNotes = () => {
  const filePath = "./notes.json";

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath).toString();
    let objectParsed = JSON.parse(file);
    return objectParsed;
  } else {
    return [];
  }
};

const saveNotes = (notes) => {
  const filePath = "./notes.json";
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync(filePath, notesJson);
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNotes,
};
