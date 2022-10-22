import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";

import colors from "../constants/colors";
import GoBack_dark from "../assets/svg/GoBack_dark";
import Save_dark from "../assets/svg/Save_dark";
import GoBack_light from "../assets/svg/GoBack_light";
import CreateFolder from "../assets/svg/CreateFolder";
import Save_light from "../assets/svg/Save_light";
import db_queries from "../constants/db_queries";
import { manipulateData } from "../functions/db_functions";

const db = SQLite.openDatabase("db.database"); // returns Database object

const AddFolderScreen = ({ route }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Medium": require("../assets/fonts/Mulish/Mulish-Medium.ttf"),
    "Mulish-Bold": require("../assets/fonts/Mulish/Mulish-Bold.ttf"),
  });
  // the editor reference
  const RichText = useRef();
  // keeping theme mode
  const { themeMode } = route.params;

  const navigation = useNavigation();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState("");

  const highlight = require("../assets/images/highlighter.png"); //icon for highlighting
  const unHighlight = require("../assets/images/unHighlighter.png"); //icon for un highlighting

  useEffect(() => {
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  function highlightText() {
    // highlight selected text using javascript
    RichText.current?.command(
      "const text = window.getSelection().toString(); document.execCommand('insertHTML', false, '<mark>'+text+'</mark>'); "
    );
  }
  function unHighlightText() {
    // un highlight selected text using javascript
    RichText.current?.command(
      "const text = window.getSelection().toString(); document.execCommand('insertHTML', false, '<div>'+text+'</div>'); "
    );
  }

  // load local image from device
  const onPressAddImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      quality: 0.6,
    });
    // if cancel button isn't pressed
    if (!result.cancelled) {
      // insert image to the editor
      const str = `data:${result.mime};base64,${result.base64}`;
      RichText.current?.insertImage(str);
    }
  };

  return (
    <>
      {themeMode !== null && fontsLoaded ? (
        <SafeAreaView
          style={[styles.container, { backgroundColor: themeMode === "light" ? colors.light : colors.dark }]}
        >
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            {themeMode === "light" ? <GoBack_light /> : <GoBack_dark />}
          </TouchableOpacity>

          <Text
            style={[
              styles.header,
              { fontFamily: "Mulish-Medium", color: themeMode === "light" ? colors.dark : colors.greyWhite },
            ]}
          >
            New Folder
          </Text>

          {/* <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {
              // check if title is empty (or white spaced)
              if (
                title === null ||
                title.replace(/&nbsp;/g, "").trim() === "" ||
                title.replace(/&nbsp;/g, "").trim().length === 0
              )
                Toast.show({
                  type: "error",
                  text2: "Title shouldn't be empty!",
                  visibilityTime: 2000,
                  topOffset: hp("2%"),
                });
              // check if description is empty (or white spaced)
              else if (
                description
                  .replace(/<(.|\n)*?>/g, "")
                  .replace(/&nbsp;/g, "")
                  .trim() === null ||
                description
                  .replace(/<(.|\n)*?>/g, "")
                  .replace(/&nbsp;/g, "")
                  .trim().length === 0
              )
                Toast.show({
                  type: "error",
                  text2: "Description shouldn't be empty!",
                  visibilityTime: 2000,
                  topOffset: hp("2%"),
                });
              // save the note to db
              else {
                const date = new Date().toString();
                manipulateData(
                  db,
                  db_queries.INSERT_NOTE,
                  [title, description, date],
                  "successfully added!",
                  "error in adding note!"
                );
                navigation.replace("TopTabs");
              }
            }}
          >
            {themeMode === "light" ? <Save_light /> : <Save_dark />}
          </TouchableOpacity> */}

          <LottieView source={require("../assets/animations/createFolder.json")} autoPlay style={styles.folder} />

          <TextInput
            value={name}
            placeholder="Write folder name here ..."
            maxLength={18}
            placeholderTextColor={colors.grey_light}
            selectionColor={colors.purpleBlue}
            onChangeText={(txt) => {
              setName(txt);
            }}
            style={[
              styles.input,
              {
                color: themeMode === "light" ? colors.dark : "white",
                fontFamily: fontsLoaded ? "Mulish-Medium" : null,
                backgroundColor: themeMode === "light" ? colors.shellWhite : colors.navyBlue,
              },
            ]}
          />

          {/* <TouchableOpacity
            style={{ position: "absolute", bottom: hp("15%"), left: wp("23%") }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={[styles.cancelBtn, { color: themeMode === "light" ? colors.dark : "white" }]}>Cancel</Text>
          </TouchableOpacity> */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.createFolderBtn}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={[styles.cancelBtn, { color: themeMode === "light" ? colors.dark : "white" }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createFolderBtn}
              onPress={() => {
                // check if name is empty (or white spaced)
                if (
                  name === null ||
                  name.replace(/&nbsp;/g, "").trim() === "" ||
                  name.replace(/&nbsp;/g, "").trim().length === 0
                )
                  Toast.show({
                    type: "error",
                    text2: "Folder name shouldn't be empty!",
                    visibilityTime: 2000,
                    topOffset: hp("3%"),
                  });
                else {
                  manipulateData(
                    db,
                    db_queries.INSERT_FOLDER,
                    [name],
                    "successfully created!",
                    "error in creating folder!"
                  );
                  navigation.replace("TopTabs", { initialRouteName: "Folders" });
                }
              }}
            >
              <CreateFolder />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <AppLoading onError={console.warn} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { textAlign: "center", left: wp("2%"), fontSize: 18, top: hp("1.7%") },
  folder: {
    top: hp("5%"),
    width: wp("55%"),
    alignSelf: "center",
  },
  input: {
    width: wp("86%"),
    height: hp("6.5%"),
    borderRadius: wp("2%"),
    top: hp("15%"),
    left: wp("7%"),
    fontSize: hp("2.2%"),
    paddingLeft: wp("3.5%"),
    paddingRight: wp("3.5%"),
    textAlign: "auto",
  },
  goBackBtn: { top: hp("5%"), left: wp("5%") },
  saveBtn: { alignSelf: "flex-end", position: "absolute", right: wp("5%"), top: hp("3.8%") },
  createFolderBtn: { top: hp("30%"), alignSelf: "flex-end", marginRight: wp("40%") },
  cancelBtn: { fontFamily: "Mulish-Bold", fontSize: 16, left: wp("23%"), bottom: hp("2.2%") },
  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "90%",
    left: wp("5%"),
    top: hp("-13%"),
    borderWidth: 1,
    borderColor: colors.grey_lighter,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  richTextToolbarStyle: {
    backgroundColor: colors.grey_lighter,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
});

export default AddFolderScreen;
