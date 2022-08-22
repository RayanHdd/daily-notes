import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, View, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import SplashScreen from "./app/screens/SplashScreen";
import TopTabs from "./app/navigation/TopTabs";
import AddNoteScreen from "./app/screens/AddNoteScreen";
import colors from "./app/constants/colors";
import db_queries from "./app/constants/db_queries";
import { createOrDropTable, manipulateData, fetchData } from "./app/functions/db_functions";
import { getData } from "./app/functions/storage_functions";
import NoteDetailsScreen from "./app/screens/NoteDetailsScreen";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("db.database"); // returns Database object

export default function App(props) {
  // state for keeping theme state
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
    LogBox.ignoreLogs([
      "expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScren.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/",
    ]);
    const grabData = async () => {
      // set theme from async storage
      const savedTheme = await getData("THEME_MODE");
      setTheme(savedTheme);
    };
    grabData().catch(console.error);
    // createOrDropTable(db, "note_table", db_queries.CREATE_NOTE_TABLE);
    // createOrDropTable(db, "note_table", db_queries.DROP_NOTE_TABLE);
    // const grabData = async () => {
    //   const notes = await fetchData(db, db_queries.SELECT_NOTES, []);
    //   console.log(notes);
    // };
    // grabData().catch(console.error);
  }, []);

  /*
  1. Create the config
*/
  const toastConfig = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: (props) => (
      <BaseToast
        {...props}
        text2Style={{
          fontSize: wp("4%"),
          color: "white",
        }}
        style={{ borderLeftColor: "pink", borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
        contentContainerStyle={{
          backgroundColor: colors.purpleBlue,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      />
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: (props) => (
      <ErrorToast
        {...props}
        text2Style={{
          fontSize: wp("4%"),
          color: "white",
        }}
        style={{ borderLeftColor: "#F20737", borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
        contentContainerStyle={{
          backgroundColor: colors.purpleBlue,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      />
    ),
    /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="TopTabs" component={TopTabs} />
          <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
