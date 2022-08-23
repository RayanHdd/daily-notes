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
  Text,
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
import GoBack_light from "../assets/svg/GoBack_light";
import db_queries from "../constants/db_queries";
import { manipulateData } from "../functions/db_functions";
import EditNote_dark from "../assets/svg/EditNote_dark";
import EditNote_light from "../assets/svg/EditNote_light";
import AddToFolder_dark from "../assets/svg/AddToFolder_dark";
import AddToFolder_light from "../assets/svg/AddToFolder_light";
import Close_dark from "../assets/svg/Close_dark";
import Close_light from "../assets/svg/Close_light";
import Done_dark from "../assets/svg/Done_dark";
import Done_light from "../assets/svg/Done_light";
import Delete_dark from "../assets/svg/Delete_dark";
import Delete_light from "../assets/svg/Delete_light";

const db = SQLite.openDatabase("db.database"); // returns Database object

const NoteDetailsScreen = ({ navigation, route }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Medium": require("../assets/fonts/Mulish/Mulish-Medium.ttf"),
  });
  // the editor reference
  const RichText = useRef();

  const { themeMode, noteTitle, noteDateTime, noteDescription, noteId } = route.params;

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [editBtnPressed, setEditBtnPressed] = useState(false);

  const highlight = require("../assets/images/highlighter.png"); //icon for highlighting
  const unHighlight = require("../assets/images/unHighlighter.png"); //icon for un highlighting

  useEffect(() => {
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  useEffect(() => {
    setTitle(noteTitle);
  }, [noteTitle]);

  useEffect(() => {
    setDescription(noteDescription);
  }, [noteDescription]);

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
          <ScrollView>
            {!editBtnPressed ? (
              <TouchableOpacity
                style={styles.goBackBtn}
                onPress={() => {
                  navigation.replace("TopTabs");
                }}
              >
                {themeMode === "light" ? <GoBack_light /> : <GoBack_dark />}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.goBackBtn}
                onPress={() => {
                  setTitle(noteTitle);
                  RichText.current?.setContentHTML(noteDescription);
                  setEditBtnPressed(false);
                }}
              >
                {themeMode === "light" ? <Close_light /> : <Close_dark />}
              </TouchableOpacity>
            )}

            {!editBtnPressed ? (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  setEditBtnPressed(true);
                }}
              >
                {themeMode === "light" ? <EditNote_light /> : <EditNote_dark />}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.editBtn}
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
                    // edit note in db
                    manipulateData(
                      db,
                      db_queries.UPDATE_NOTE_BY_ID,
                      [title, description, date, noteId],
                      "successfully edited!",
                      "error in editing note!"
                    );
                    RichText.current?.setContentHTML(description);
                    setEditBtnPressed(false);
                  }
                }}
              >
                {themeMode === "light" ? <Done_light /> : <Done_dark />}
              </TouchableOpacity>
            )}

            {!editBtnPressed ? (
              <TouchableOpacity style={styles.addToFolderBtn}>
                {themeMode === "light" ? <AddToFolder_light /> : <AddToFolder_dark />}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addToFolderBtn}
                onPress={() => {
                  // delete note from db
                  manipulateData(
                    db,
                    db_queries.DELETE_NOTE_BY_ID,
                    [noteId],
                    "successfully deleted!",
                    "error in deleting note!"
                  );
                  navigation.replace("TopTabs");
                }}
              >
                {themeMode === "light" ? <Delete_light /> : <Delete_dark />}
              </TouchableOpacity>
            )}

            {!editBtnPressed ? (
              <Text style={[styles.title, { color: themeMode === "light" ? colors.dark : "white" }]}>{title}</Text>
            ) : (
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
            )}

            {!editBtnPressed ? (
              <>
                <Text style={[styles.lastModified, { color: themeMode === "light" ? colors.dark : "white" }]}>
                  Last Modified
                </Text>
                <Text
                  style={[styles.dateTime, { color: themeMode === "light" ? colors.grey_light : colors.greyWhite }]}
                >
                  {noteDateTime.substr(8, 2) +
                    " " +
                    noteDateTime.substr(4, 3) +
                    noteDateTime.substr(10, 5) +
                    "," +
                    noteDateTime.substr(15, 6)}
                </Text>
              </>
            ) : null}

            <View style={styles.descriptionContainer}>
              <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                  <RichEditor
                    ref={RichText}
                    initialContentHTML={description}
                    disabled={!editBtnPressed ? true : false}
                    onChange={(text) => setDescription(text)}
                    placeholder="Write the description here ..."
                    androidHardwareAccelerationDisabled={true}
                    editorStyle={{
                      backgroundColor: themeMode === "light" ? colors.light : colors.dark,
                      color: themeMode === "light" ? colors.grey : colors.greyWhite,
                      caretColor: colors.purpleBlue,
                      placeholderColor: colors.grey_light,
                      contentCSSText: "line-height: 22px; padding-bottom: 120px;",
                    }}
                    style={{ minHeight: hp("75%") }}
                    useContainer={false}
                  />
                </KeyboardAvoidingView>
              </ScrollView>
              {editBtnPressed ? (
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
              ) : null}
            </View>
          </ScrollView>
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
  title: {
    top: hp("7.8%"),
    paddingLeft: wp("6%"),
    fontFamily: "Mulish-Medium",
    fontSize: wp("4.8%"),
    textAlign: "auto",
    paddingRight: wp("5%"),
    lineHeight: hp("3.8%"),
  },
  lastModified: {
    top: hp("11%"),
    paddingLeft: wp("6%"),
    fontFamily: "Mulish-Medium",
    fontSize: wp("4%"),
  },
  dateTime: {
    fontFamily: "Mulish-Medium",
    fontSize: wp("3.5%"),
    alignSelf: "flex-end",
    right: wp("20%"),
    top: hp("8.2%"),
  },
  input: {
    width: wp("90%"),
    height: hp("6.5%"),
    borderRadius: wp("2%"),
    top: hp("8.2%"),
    left: wp("5%"),
    fontSize: hp("2.4%"),
    paddingLeft: wp("3.5%"),
    paddingRight: wp("3.5%"),
    textAlign: "auto",
  },
  goBackBtn: { top: hp("3.8%"), left: wp("5%") },
  editBtn: { alignSelf: "flex-end", position: "absolute", right: wp("5%"), top: hp("3.8%") },
  addToFolderBtn: { alignSelf: "flex-end", position: "absolute", right: wp("17%"), top: hp("3.8%") },
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
  descriptionContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "90%",
    left: wp("5%"),
    top: hp("-13%"),
  },
  richTextToolbarStyle: {
    backgroundColor: colors.grey_lighter,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
});

export default NoteDetailsScreen;
