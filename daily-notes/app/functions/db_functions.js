import Toast from "react-native-toast-message";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const createOrDropTable = (db, tableName, query) => {
  db.transaction((txn) => {
    txn.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
      [],
      (tx, res) => {
        console.log("create or drop execute success results: " + JSON.stringify(res));
        console.log("create or drop " + tableName + " transaction: " + JSON.stringify(tx));
        txn.executeSql(query, []);
      },
      (_, error) => {
        alert("create or drop " + tableName + " error: ", error);
      }
    );
  });
};

export const manipulateData = (db, query, data, successTxt = null, failTxt = null) => {
  console.log(data);
  db.transaction((tx) => {
    tx.executeSql(
      query,
      data,
      (tx, results) => {
        console.log("manipulate execute success results: " + JSON.stringify(results));
        console.log("manipulate execute success transaction: " + JSON.stringify(tx));
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log("Data Changed Successfully....");
          if (successTxt !== null)
            Toast.show({
              type: "success",
              text2: successTxt,
              visibilityTime: 2000,
              topOffset: hp("3%"),
            });
        } else {
          console.error("Failed to change...");
        }
      },
      (_, error) => {
        if (
          error.toString() ===
          "Error: UNIQUE constraint failed: noteFolder_table.note_id (code 2067 SQLITE_CONSTRAINT_UNIQUE[2067])"
        ) {
          Toast.show({
            type: "error",
            text2: "This note already added!",
            visibilityTime: 2000,
            topOffset: hp("3%"),
          });
        } else if (failTxt !== null)
          Toast.show({
            type: "error",
            text2: failTxt,
            visibilityTime: 2000,
            topOffset: hp("3%"),
          });
        console.error("manipulate table execute error: ", error);
      }
    );
  });
};

export const fetchData = (db, query, data = []) => {
  return new Promise((resolve) => {
    const temp = [];
    db.transaction((tx) => {
      tx.executeSql(
        query,
        data,
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) temp.push(results.rows.item(i));
          resolve(temp);
        },
        (_, error) => {
          console.log("fetching data execute error: " + error);
        }
      );
    });
    return temp;
  });
};
