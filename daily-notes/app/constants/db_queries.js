export default {
  // CREATE table queries
  CREATE_NOTE_TABLE:
    "CREATE TABLE IF NOT EXISTS note_table (note_id INTEGER PRIMARY KEY AUTOINCREMENT, note_title VARCHAR(200) NOT NULL, note_description TEXT NOT NULL, note_dateTime VARCHAR(50) NOT NULL)",

  // DROP table queries
  DROP_NOTE_TABLE: "DROP TABLE IF EXISTS note_table",

  // INSERT to the table queries
  INSERT_NOTE: "INSERT INTO note_table (note_title, note_description, note_dateTime) VALUES (?,?,?)",

  // SELECT queries
  SELECT_NOTES: "SELECT * FROM note_table",

  // UPDATE queries
  UPDATE_NOTE_BY_ID: "UPDATE note_table SET note_title = ?, note_description = ?, note_dateTime = ? WHERE note_id = ?",

  // DELETE queries
  DELETE_NOTE_BY_ID: "DELETE FROM note_table WHERE note_id = ?",

  // DROP_PASSENGER_TABLE: "DROP TABLE IF EXISTS passenger_table",
  // GET_WALLET_CHARGE_BY_PHONE_NUMBER: "SELECT passenger_walletCharge FROM passenger_table WHERE passenger_phone = ?",
  // EDIT_PASSENGER_WALLET_CHARGE_BY_PHONE_NUMBER: "UPDATE passenger_table SET passenger_walletCharge=? WHERE passenger_phone=?",
  // DELETE_PASSENGER_BY_PHONE_NUMBER: "DELETE FROM passenger_table WHERE passenger_phone= ?",
  // CREATE_DRIVER_TABLE:
  //   "CREATE TABLE IF NOT EXISTS driver_table(driver_id INTEGER PRIMARY KEY AUTOINCREMENT, driver_username VARCHAR(50) NOT NULL UNIQUE, driver_password VARCHAR(30) NOT NULL, driver_phone INT(15) NOT NULL, driver_firstName NVARCHAR(50) NOT NULL, driver_lastName NVARCHAR(50) NOT NULL, driver_acceptorCode INT(20) NOT NULL UNIQUE, driver_carModel NVARCHAR(50) NOT NULL, driver_numberplate NVARCHAR(50) NOT NULL, driver_imageUrl TEXT UNIQUE, driver_score VARCHAR(20) DEFAULT '3')",
  // INSERT_DRIVER:
  //   "INSERT INTO driver_table (driver_username,driver_password,driver_phone,driver_firstName,driver_lastName,driver_acceptorCode,driver_carModel,driver_numberplate, driver_imageUrl) VALUES (?,?,?,?,?,?,?,?,?)",
  // FETCH_DRIVER_INFO_BY_CODE: "SELECT * FROM driver_table WHERE driver_acceptorCode = ?",
  // FETCH_PASSENGER_INFO_BY_PHONE_NUMBER: "SELECT * FROM passenger_table WHERE passenger_phone= ?",
  // DROP_DRIVER_TABLE: "DROP TABLE IF EXISTS driver_table",
  // CREATE_TRANSACTION_TABLE:
  //   "CREATE TABLE IF NOT EXISTS transaction_table(transaction_id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_type VARCHAR(20) NOT NULL ,transaction_cost NVARCHAR(50) NOT NULL, transaction_dateTime VARCHAR(50) NOT NULL, transaction_source NVARCHAR(50), transaction_destination NVARCHAR(50), transaction_passengerCount INT(20) DEFAULT 1, transaction_isConfirmed VARCHAR(20) NOT NULL DEFAULT 'False', passenger_id INTEGER, driver_id INTEGER, FOREIGN KEY (passenger_id) REFERENCES passenger_table (passenger_id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (driver_id) REFERENCES driver_table (driver_id) ON DELETE CASCADE ON UPDATE CASCADE)",
  // INSERT_TRANSACTION:
  //   "INSERT INTO transaction_table (transaction_type, transaction_cost, transaction_dateTime, transaction_source, transaction_destination, transaction_passengerCount, transaction_isConfirmed, passenger_id, driver_id) VALUES (?,?,?,?,?,?,?,?,?)",
  // GET_PASSENGER_ID_BY_PHONE_NUMBER: "SELECT passenger_id FROM passenger_table WHERE passenger_phone = ?",
  // FETCH_TRANSACTIONS_BY_PASSENGER_ID: "SELECT * FROM transaction_table WHERE passenger_id = ? AND transaction_isConfirmed = 'True' ORDER BY transaction_dateTime DESC",
  // GET_DRIVER_NAME_BY_ID: "SELECT driver_firstName,driver_lastName FROM driver_table WHERE driver_id = ?",
  // GET_DRIVER_IMAGE_BY_ID: "SELECT driver_imageUrl FROM driver_table WHERE driver_id = ?",
  // GET_DRIVER_CODE_BY_ID: "SELECT driver_acceptorCode FROM driver_table WHERE driver_id = ?",
  // EDIT_PASSENGER_INFO_BY_PHONE_NUMBER: "UPDATE passenger_table SET passenger_imageUri=?,passenger_name=?,passenger_phone=? WHERE passenger_phone=?",
  // CREATE_REPORT_TABLE:
  //   "CREATE TABLE IF NOT EXISTS report_table(report_id INTEGER PRIMARY KEY AUTOINCREMENT, report_text TEXT NOT NULL, report_status VARCHAR(20) DEFAULT 'pending', report_dateTime VARCHAR(50) NOT NULL, transaction_id INTEGER, FOREIGN KEY (transaction_id) REFERENCES transaction_table (transaction_id) ON DELETE CASCADE ON UPDATE CASCADE)",
  // INSERT_REPORT: "INSERT INTO report_table (report_text,report_dateTime, transaction_id) VALUES (?,?,?)",
  // FETCH_REPORTS: "SELECT * FROM report_table WHERE report_status = 'pending' ORDER BY report_dateTime ASC",
  // CREATE_MANAGER_TABLE:
  //   "CREATE TABLE IF NOT EXISTS manager_table(manager_id INTEGER PRIMARY KEY AUTOINCREMENT, manager_username NVARCHAR(50) NOT NULL, manager_password NVARCHAR(50) NOT NULL, manager_phone INT(15) NOT NULL, manager_firstName NVARCHAR(50) NOT NULL, manager_lastName NVARCHAR(50) NOT NULL, manager_imageUri TEXT UNIQUE)",
  // INSERT_MANAGER: "INSERT INTO manager_table (manager_username, manager_password,manager_phone, manager_firstName, manager_lastName, manager_imageUri) VALUES (?,?,?,?,?,?)",
  // CHECK_IF_DRIVER_EXISTS: "SELECT EXISTS (SELECT * FROM driver_table WHERE driver_username = ? AND driver_password = ? LIMIT 1)",
  // CHECK_IF_MANAGER_EXISTS: "SELECT EXISTS (SELECT * FROM manager_table WHERE manager_username = ? AND manager_password = ? LIMIT 1)",
  // FETCH_TRANSACTION_BY_ID: "SELECT * FROM transaction_table WHERE transaction_id = ?",
  // CHECK_IF_PASSENGER_EXISTS: "SELECT EXISTS (SELECT * FROM passenger_table WHERE passenger_phone = ? LIMIT 1)",
  // FETCH_RENT_TRANSACTIONS: "SELECT * FROM transaction_table WHERE transaction_type = 'rent'",
  // FETCH_DRIVERS: "SELECT * FROM driver_table ORDER BY driver_lastName ASC",
  // FETCH_UNCONFIRMED_TRANSACTIONS_BY_DRIVER_ID: "SELECT * FROM transaction_table WHERE driver_id = ? AND transaction_isConfirmed = 'False' ORDER BY transaction_dateTime ASC",
  // FETCH_DRIVER_INFO_BY_USERNAME_AND_PASSWORD: "SELECT * FROM driver_table WHERE driver_username = ? AND driver_password = ?",
  // GET_WALLET_CHARGE_BY_ID: "SELECT passenger_walletCharge FROM passenger_table WHERE passenger_id = ?",
  // EDIT_PASSENGER_WALLET_CHARGE_BY_ID: "UPDATE passenger_table SET passenger_walletCharge=? WHERE passenger_id=?",
  // EDIT_TRANSACTION_COST_BY_ID: "UPDATE transaction_table SET transaction_cost=? WHERE transaction_id=?",
  // EDIT_TRANSACTION_ISCONFIRMED_BY_ID: "UPDATE transaction_table SET transaction_isConfirmed='True' WHERE transaction_id=?",
  // FETCH_TRANSACTIONS_BY_DRIVER_ID:
  //   "SELECT * FROM transaction_table WHERE driver_id = ? AND transaction_type = 'rent' AND transaction_isConfirmed = 'True' ORDER BY transaction_dateTime DESC",
  // FETCH_PASSENGER_INFO_BY_ID: "SELECT * FROM passenger_table WHERE passenger_id = ?",
  // CHECK_IF_CODE_EXISTS: "SELECT EXISTS (SELECT * FROM driver_table WHERE driver_acceptorCode = ? LIMIT 1)",
  // DROP_REPORT_TABLE: "DROP TABLE IF EXISTS report_table",
  // GET_DRIVER_SCORE_BY_ID: "SELECT driver_score FROM driver_table WHERE driver_id=?",
  // EDIT_DRIVER_SCORE_BY_ID: "UPDATE driver_table SET driver_score=? WHERE driver_id=?",
  // FETCH_DRIVER_INFO_BY_ID: "SELECT * FROM driver_table WHERE driver_id = ?",
  // CHECK_IF_UNCONFIRMED_EXISTS: "SELECT EXISTS (SELECT * FROM transaction_table WHERE driver_id = ? AND transaction_isConfirmed = 'False' LIMIT 1)",
  // DELETE_TRANSACTION_BY_ID: "DELETE FROM transaction_table WHERE transaction_id= ?",
  // DROP_MANAGER_TABLE: "DROP TABLE IF EXISTS manager_table",
  // FETCH_MANAGER_INFO_BY_USERNAME_AND_PASSWORD: "SELECT * FROM manager_table WHERE manager_username = ? AND manager_password = ?",
  // FETCH_MANAGER_INFO_BY_ID: "SELECT * FROM manager_table WHERE manager_ID = ?",
  // CHECK_IF_REPORT_EXISTS: "SELECT EXISTS (SELECT * FROM report_table WHERE report_status = 'pending' LIMIT 1)",
  // FETCH_RENT_TRANSACTION_BY_ID: "SELECT * FROM transaction_table WHERE transaction_id = ? AND transaction_type = 'rent'",
  // FETCH_MANAGER_PHONE_NUMBERS: "SELECT manager_phone FROM manager_table",
  // EDIT_REPORT_BY_ID: "UPDATE report_table SET report_status = 'checked' WHERE report_id=?",
};
