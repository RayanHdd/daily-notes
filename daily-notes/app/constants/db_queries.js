export default {
  // CREATE table queries
  CREATE_NOTE_TABLE:
    "CREATE TABLE IF NOT EXISTS note_table (note_id INTEGER PRIMARY KEY AUTOINCREMENT, note_title VARCHAR(200) NOT NULL, note_description TEXT NOT NULL, note_dateTime VARCHAR(50) NOT NULL)",
  CREATE_FOLDER_TABLE:
    "CREATE TABLE IF NOT EXISTS folder_table (folder_id INTEGER PRIMARY KEY AUTOINCREMENT, folder_name VARCHAR(20) NOT NULL)",
  CREATE_NOTE_FOLDER_TABLE:
    "CREATE TABLE IF NOT EXISTS noteFolder_table (note_id INTEGER UNIQUE, folder_id INTEGER, FOREIGN KEY (note_id) REFERENCES note_table (note_id) ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (folder_id) REFERENCES folder_table (folder_id) ON DELETE CASCADE ON UPDATE NO ACTION)",

  // DROP table queries
  DROP_NOTE_TABLE: "DROP TABLE IF EXISTS note_table",
  DROP_FOLDER_TABLE: "DROP TABLE IF EXISTS folder_table",
  DROP_NOTE_FOLDER_TABLE: "DROP TABLE IF EXISTS noteFolder_table",

  // INSERT to the table queries
  INSERT_NOTE: "INSERT INTO note_table (note_title, note_description, note_dateTime) VALUES (?,?,?)",
  INSERT_FOLDER: "INSERT INTO folder_table (folder_name) VALUES (?)",
  INSERT_NOTE_FOLDER: "INSERT INTO noteFolder_table (note_id, folder_id) VALUES (?,?)",

  // SELECT queries
  SELECT_NOTES: "SELECT * FROM note_table",
  SELECT_FOLDERS: "SELECT * FROM folder_table",
  SELECT_FOLDER_NOTES:
    "SELECT note_table.* FROM note_table INNER JOIN noteFolder_table ON noteFolder_table.note_id = note_table.note_id WHERE noteFolder_table.folder_id = ?",
  SELECT_NOTE_ID_BY_DATE: "SELECT note_id FROM note_table WHERE note_dateTime = ?",

  // UPDATE queries
  UPDATE_NOTE_BY_ID: "UPDATE note_table SET note_title = ?, note_description = ?, note_dateTime = ? WHERE note_id = ?",
  UPDATE_FOLDER_NAME_BY_ID: "UPDATE folder_table SET folder_name = ? WHERE folder_id = ?",

  // DELETE queries
  DELETE_NOTE_BY_ID: "DELETE FROM note_table WHERE note_id = ?",
  DELETE_FOLDER_BY_ID: "DELETE FROM folder_table WHERE folder_id = ?",
};
