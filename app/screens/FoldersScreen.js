import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SQLite from "expo-sqlite";
import AwesomeAlert from "react-native-awesome-alerts";

import colors from "../constants/colors";
import AddFolder from "../assets/svg/AddFolder";
import AddNewFolder from "../assets/svg/AddNewFolder";
import FolderCard from "../components/FolderCard";
import db_queries from "../constants/db_queries";
import { fetchData, manipulateData } from "../functions/db_functions";

import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import Rename from "../assets/svg/Rename";
import Delete from "../assets/svg/Delete";
import OpenFolder from "../assets/svg/OpenFolder";

const db = SQLite.openDatabase("db.database"); // returns Database object

const FoldersScreen = ({ navigation, themeMode, searchQuery }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Regular": require("../assets/fonts/Mulish/Mulish-Regular.ttf"),
    "Mulish-SemiBold": require("../assets/fonts/Mulish/Mulish-SemiBold.ttf"),
    "MontserratAlternates-Medium": require("../assets/fonts/MontserratAlternates/MontserratAlternates-Medium.ttf"),
  });
  // state for keeping theme state
  const [theme, setTheme] = useState("dark");

  const [folders, setFolders] = useState(null);
  const [searchedFolders, setSearchedFolders] = useState(null);
  const [notesCount, setNotesCount] = useState(null);
  const [noFolders, setNoFolders] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [folderId, setFolderId] = useState(null);

  useEffect(() => {
    setTheme(themeMode);
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  useEffect(() => {
    if (folders !== null && searchQuery !== null) {
      // do search filter here
      const result = folders.filter((item) => item.folder_name.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchedFolders(result);
    }
    if (searchQuery === null) {
      setSearchedFolders(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log("here");
    const grabData = async () => {
      const fetched_folders = await fetchData(db, db_queries.SELECT_FOLDERS, []);
      let counts = [];
      fetched_folders.forEach((element) => {
        const grabData = async () => {
          const fetched_folderNotes = await fetchData(db, db_queries.SELECT_FOLDER_NOTES, [element.folder_id]);
          console.log("folderNotes", fetched_folderNotes);
          counts[element.folder_id] = fetched_folderNotes.length;
          setNotesCount(counts);
        };
        grabData().catch(console.error);
      });
      console.log("counts", counts);
      if (counts.length !== 0) setNotesCount(counts);

      setFolders(fetched_folders);
      if (fetched_folders.length === 0) {
        setNoFolders(true);
      }
    };
    grabData().catch(console.error);
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <Menu
        onBackdropPress={() => {
          setMenuShown(false);
        }}
      >
        <MenuTrigger>
          <FolderCard
            name={item.folder_name}
            bgColor={themeMode === "light" ? colors.white : colors.navyBlue}
            nameColor={themeMode === "light" ? colors.grey_dark : colors.greyWhite}
            notesCount={
              notesCount !== null && notesCount[item.folder_id] !== undefined ? notesCount[item.folder_id] : 0
            }
            width={wp("40%")}
            height={hp("18%")}
          />
        </MenuTrigger>

        <MenuOptions
          style={{
            backgroundColor: colors.purpleBlue,
            borderRadius: 24,
            marginLeft: wp("6.66%"),
            position: "absolute",
            width: wp("40%"),
            height: hp("18%"),
          }}
        >
          <MenuOption
            value={1}
            style={{ left: wp("4.4%"), top: hp("1.2%") }}
            onSelect={() => {
              console.log("folder id", item.folder_id);
              setMenuShown(false);
              navigation.navigate("FolderNotes", {
                themeMode: themeMode,
                folderName: item.folder_name,
                folderId: item.folder_id,
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <OpenFolder width="21px" />
              <Text
                style={{
                  fontFamily: "MontserratAlternates-Medium",
                  color: "white",
                  left: wp("3.2%"),
                  alignSelf: "center",
                }}
              >
                Open
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={1}
            style={{ left: wp("3%"), top: hp("1.2%") }}
            onSelect={() => {
              setMenuShown(false);
              setFolderId(item.folder_id);
              setFolderName(item.folder_name);
              setShowAlert(true);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Rename width="31px" />
              <Text
                style={{
                  fontFamily: "MontserratAlternates-Medium",
                  color: "white",
                  left: wp("2%"),
                  alignSelf: "center",
                }}
              >
                Rename
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={2}
            style={{ left: wp("3%"), top: hp("2.2%") }}
            onSelect={() => {
              setMenuShown(false);
              showConfirmDialog(item.folder_id);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Delete width="31px" />
              <Text
                style={{
                  fontFamily: "MontserratAlternates-Medium",
                  color: "white",
                  left: wp("2%"),
                  alignSelf: "center",
                }}
              >
                Delete
              </Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  const showConfirmDialog = (folderId) => {
    return Alert.alert("Are your sure?", "You want to delete this folder?", [
      // The "Yes" button
      {
        text: "Delete",
        onPress: () => {
          // delete folder from db
          manipulateData(
            db,
            db_queries.DELETE_FOLDER_BY_ID,
            [folderId],
            "successfully deleted!",
            "error in deleting folder!"
          );
          navigation.replace("TopTabs", { initialRouteName: "Folders" });
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };

  return (
    <>
      {themeMode !== null && noFolders && fontsLoaded ? (
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: themeMode === "light" ? colors.light : colors.dark,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Image
            source={
              themeMode === "light"
                ? require("../assets/images/noFolders_light.png")
                : require("../assets/images/noFolders_dark.png")
            }
            style={styles.noNotesImg}
          />
          <Text style={styles.noFoldersMsg}>Oops! There are no folders that you have created</Text>
          <TouchableOpacity
            style={styles.addNewNoteBtn}
            onPress={() => {
              navigation.navigate("AddFolder", { themeMode: themeMode });
            }}
          >
            <AddNewFolder />
          </TouchableOpacity>
        </SafeAreaView>
      ) : themeMode !== null && !noFolders && fontsLoaded ? (
        <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? colors.light : colors.dark }]}>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            customView={
              <TextInput
                autoFocus
                focusable
                selectTextOnFocus
                value={folderName}
                selectionColor={colors.purpleBlue}
                onChangeText={(name) => {
                  setFolderName(name);
                }}
                style={{
                  width: "90%",
                  height: "32%",
                  borderRadius: wp("2%"),
                  borderWidth: hp("0.2%"),
                  borderColor: colors.navyBlue,
                  backgroundColor: colors.light,
                  textAlign: "center",
                  marginTop: hp("6%"),
                  fontFamily: "Mulish-Regular",
                  fontSize: hp("2.3%"),
                  color: colors.dark,
                }}
              />
            }
            title="Rename Folder"
            titleStyle={{ fontFamily: "Mulish-SemiBold", fontSize: hp("2.2%"), color: colors.navyBlue }}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton
            showCancelButton
            cancelText="Cancel"
            confirmText="Rename"
            confirmButtonTextStyle={{ fontSize: hp("2.2%"), fontFamily: "Mulish-Regular", color: "white", padding: 8 }}
            cancelButtonTextStyle={{
              fontSize: hp("2.2%"),
              fontFamily: "Mulish-SemiBold",
              color: colors.purpleBlue,
              padding: 8,
            }}
            contentContainerStyle={{ width: wp("84%"), height: hp("40%") }}
            cancelButtonStyle={{ marginRight: wp("5%"), borderRadius: 8, marginTop: hp("1%") }}
            confirmButtonColor={colors.purpleBlue}
            confirmButtonStyle={{ borderRadius: 8, marginTop: hp("1%") }}
            cancelButtonColor="white"
            onCancelPressed={() => {
              setShowAlert(false);
              setFolderName(null);
            }}
            onConfirmPressed={() => {
              manipulateData(
                db,
                db_queries.UPDATE_FOLDER_NAME_BY_ID,
                [folderName, folderId],
                "successfully renamed!",
                "error in renaming folder!"
              );
              setShowAlert(false);
              navigation.replace("TopTabs", { initialRouteName: "Folders" });
            }}
          />

          {!searchedFolders || searchedFolders.length !== 0 ? (
            <FlatList
              data={searchedFolders !== null ? searchedFolders : folders}
              renderItem={renderItem}
              keyExtractor={(item) => item.folder_id}
              numColumns={2}
              extraData={searchedFolders}
              showsVerticalScrollIndicator={false}
              style={styles.cardsContainer}
            />
          ) : (
            <>
              <Image
                source={
                  themeMode === "light"
                    ? require("../assets/images/noResultsFound_light.png")
                    : require("../assets/images/noResultsFound_dark.png")
                }
                resizeMode="cover"
                style={{ width: wp("90%"), height: hp("45%"), alignSelf: "center", top: hp("6%") }}
              />
              {themeMode === "dark" ? (
                <Text
                  style={{ fontFamily: "Mulish-Regular", color: "white", fontSize: wp("5.8%"), textAlign: "center" }}
                >
                  No Results to show!
                </Text>
              ) : null}
            </>
          )}

          <TouchableOpacity
            style={styles.addFolderBtn}
            onPress={() => {
              navigation.navigate("AddFolder", { themeMode: themeMode });
            }}
          >
            <AddFolder />
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    top: hp("4%"),
    paddingLeft: wp("5.5%"),
  },
  title: { fontSize: wp("5%") },
  searchBtn: { alignSelf: "center", position: "absolute", right: wp("15%") },
  toggleThemeBtn: { alignSelf: "center", position: "absolute", right: wp("5.5%") },
  cardsContainer: {
    marginTop: hp("5%"),
  },
  addFolderBtn: { alignSelf: "flex-end", position: "absolute", bottom: hp("3%"), right: wp("6%") },
  noNotesImg: { bottom: hp("8%"), width: wp("60%"), height: hp("30%") },
  noFoldersMsg: {
    fontFamily: "Mulish-Regular",
    color: colors.grey_subtitle,
    fontSize: wp("4.7%"),
    paddingHorizontal: wp("20%"),
    textAlign: "center",
    lineHeight: hp("3.2%"),
  },
  addNewNoteBtn: { top: hp("8%") },
});

export default FoldersScreen;
