import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";
import AppLoading from "expo-app-loading";

import colors from "../constants/colors";
import GoBack_dark from "../assets/svg/GoBack_dark";
import Save_dark from "../assets/svg/Save_dark";
import GoBack_light from "../assets/svg/GoBack_light";
import Save_light from "../assets/svg/Save_light";
import db_queries from "../constants/db_queries";
import { manipulateData, fetchData } from "../functions/db_functions";

const db = SQLite.openDatabase("db.database"); // returns Database object

const AddNoteScreen = ({ navigation, route }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Medium": require("../assets/fonts/Mulish/Mulish-Medium.ttf"),
  });
  // the editor reference
  const RichText = useRef();
  // keeping theme mode
  const { themeMode, folderId, folderName } = route.params;
  console.log(folderId, folderName);

  const [title, setTitle] = useState(null);
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

          <TouchableOpacity
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
                  topOffset: hp("3%"),
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
                  topOffset: hp("3%"),
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

                if (folderId && folderName) {
                  const grabData = async () => {
                    const fetched_noteId = await fetchData(db, db_queries.SELECT_NOTE_ID_BY_DATE, [date]);
                    // console.log("fetched note id", fetched_noteId);
                    manipulateData(
                      db,
                      db_queries.INSERT_NOTE_FOLDER,
                      [parseInt(fetched_noteId[0].note_id), parseInt(folderId)],
                      null,
                      "error in adding note!"
                    );
                  };
                  grabData().catch(console.error);
                  navigation.navigate("FolderNotes", {
                    themeMode: themeMode,
                    folderName: folderName,
                    folderId: folderId,
                  });
                } else navigation.replace("TopTabs");
              }
            }}
          >
            {themeMode === "light" ? <Save_light /> : <Save_dark />}
          </TouchableOpacity>

          <TextInput
            value={title}
            placeholder="Write the title here ..."
            placeholderTextColor={colors.grey_light}
            selectionColor={colors.purpleBlue}
            onChangeText={(txt) => {
              setTitle(txt);
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

          <View style={styles.richTextContainer}>
            <ScrollView>
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <RichEditor
                  ref={RichText}
                  onChange={(text) => setDescription(text)}
                  placeholder="Write the description here ..."
                  androidHardwareAccelerationDisabled={true}
                  editorStyle={{
                    backgroundColor: themeMode === "light" ? colors.shellWhite : colors.navyBlue,
                    color: themeMode === "light" ? colors.dark : "white",
                    caretColor: colors.purpleBlue,
                    placeholderColor: colors.grey_light,
                    contentCSSText: "line-height: 22px; padding-left: 14px; padding-right: 14px; padding-top: 14px;",
                  }}
                  style={{ minHeight: hp("60%") }}
                  useContainer={false}
                />
              </KeyboardAvoidingView>
            </ScrollView>
            <RichToolbar
              editor={RichText}
              selectedIconTint={colors.brown}
              disabledIconTint="purple"
              onPressAddImage={onPressAddImage}
              iconSize={wp("4.3%")}
              iconTint="black"
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.setStrikethrough,
                actions.alignLeft,
                actions.alignCenter,
                actions.alignRight,
                actions.insertImage,
                actions.undo,
                actions.redo,
                actions.insertBulletsList,
                actions.insertOrderedList,
                "highlightText",
                "unHighlightText",
                actions.insertLink,
                actions.setSuperscript,
                actions.setSubscript,
                actions.keyboard,
              ]}
              // map icons for highlight & un highlight actions
              iconMap={{
                ["highlightText"]: highlight,
                ["unHighlightText"]: unHighlight,
              }}
              highlightText={highlightText}
              unHighlightText={unHighlightText}
              style={styles.richTextToolbarStyle}
            />
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
  input: {
    width: wp("90%"),
    height: hp("6.5%"),
    borderRadius: wp("2%"),
    top: hp("7.5%"),
    left: wp("5%"),
    fontSize: wp("4.2%"),
    paddingLeft: wp("3.5%"),
    paddingRight: wp("3.5%"),
    textAlign: "auto",
  },
  goBackBtn: { top: Platform.OS === "android" ? StatusBar.currentHeight : hp("2%"), left: wp("5%") },
  saveBtn: {
    alignSelf: "flex-end",
    position: "absolute",
    right: wp("5%"),
    top: Platform.OS === "android" ? StatusBar.currentHeight : hp("2%"),
  },
  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "90%",
    left: wp("5%"),
    top: hp("-12%"),
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

export default AddNoteScreen;
