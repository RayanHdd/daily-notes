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
        // console.log("item:", res.rows.length);
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
              // text1: "Hello",
              text2: successTxt,
              visibilityTime: 2000,
              topOffset: hp("2%"),
            });
        } else {
          console.error("Failed to change...");
        }
      },
      (_, error) => {
        if (failTxt !== null)
          Toast.show({
            type: "error",
            // text1: "Hello",
            text2: failTxt,
            visibilityTime: 2000,
            topOffset: hp("2%"),
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
