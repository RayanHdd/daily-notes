import "react-native-gesture-handler";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, View, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import SplashScreen from "./app/screens/SplashScreen";
import TopTabs from "./app/navigation/TopTabs";
import AddNoteScreen from "./app/screens/AddNoteScreen";
import AddFolderScreen from "./app/screens/AddFolderScreen";
import colors from "./app/constants/colors";
import db_queries from "./app/constants/db_queries";
import { createOrDropTable } from "./app/functions/db_functions";
import { getData, storeData } from "./app/functions/storage_functions";
import NoteDetailsScreen from "./app/screens/NoteDetailsScreen";
import FolderNotesScreen from "./app/screens/FolderNotesScreen";
import AddToFolderScreen from "./app/screens/AddToFolderScreen";

import { MenuProvider } from "react-native-popup-menu";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("db.database"); // returns Database object

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
    LogBox.ignoreLogs([
      "expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScren.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/",
    ]);
    const grabData = async () => {
      const firstEntry = await getData("FIRST_ENTRY");

      if (firstEntry !== "False") {
        createOrDropTable(db, "note_table", db_queries.CREATE_NOTE_TABLE);
        createOrDropTable(db, "folder_table", db_queries.CREATE_FOLDER_TABLE);
        createOrDropTable(db, "noteFolder_table", db_queries.CREATE_NOTE_FOLDER_TABLE);

        storeData("THEME_MODE", "dark");
        storeData("FIRST_ENTRY", "False");
      }
    };
    grabData().catch(console.error);
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
        style={{ borderLeftColor: "#C5E90B", borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
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
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="TopTabs" component={TopTabs} />
            <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ animationEnabled: false }} />
            <Stack.Screen name="AddFolder" component={AddFolderScreen} />
            <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
            <Stack.Screen name="FolderNotes" component={FolderNotesScreen} />
            <Stack.Screen name="AddToFolder" component={AddToFolderScreen} options={{ animationEnabled: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </MenuProvider>
    </>
  );
}
