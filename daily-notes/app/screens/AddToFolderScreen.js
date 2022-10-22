import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SQLite from "expo-sqlite";

import colors from "../constants/colors";
import AddNewFolder from "../assets/svg/AddNewFolder";
import FolderCard from "../components/FolderCard";
import db_queries from "../constants/db_queries";
import { fetchData, manipulateData } from "../functions/db_functions";
import GoBack_light from "../assets/svg/GoBack_light";
import GoBack_dark from "../assets/svg/GoBack_dark";

const DATA = [
  {
    name: "My Daily Reminders",
    notesCount: 14,
  },
  {
    name: "second date",
    notesCount: 2,
  },
  {
    name: "third date",
    notesCount: 121,
  },
];

const db = SQLite.openDatabase("db.database"); // returns Database object

const AddToFolderScreen = ({ navigation, route }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Regular": require("../assets/fonts/Mulish/Mulish-Regular.ttf"),
  });

  const { themeMode, noteId } = route.params;

  // state for keeping theme state
  const [theme, setTheme] = useState("dark");

  const [folders, setFolders] = useState(null);
  const [searchedFolders, setSearchedFolders] = useState(null);
  const [noFolders, setNoFolders] = useState(false);
  const [notesCount, setNotesCount] = useState(null);

  // const navigation = useNavigation();

  useEffect(() => {
    setTheme(themeMode);
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  useEffect(() => {
    const grabData = async () => {
      const fetched_folders = await fetchData(db, db_queries.SELECT_FOLDERS, []);
      let counts = [];
      fetched_folders.forEach((element) => {
        const grabData = async () => {
          const fetched_folderNotes = await fetchData(db, db_queries.SELECT_FOLDER_NOTES, [element.folder_id]);
          counts[element.folder_id] = fetched_folderNotes.length;
        };
        grabData().catch(console.error);
      });
      setNotesCount(counts);

      // console.log(fetched_folders);
      setFolders(fetched_folders);
      if (fetched_folders.length === 0) {
        setNoFolders(true);
      }
    };
    grabData().catch(console.error);
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          manipulateData(
            db,
            db_queries.INSERT_NOTE_FOLDER,
            [noteId, item.folder_id],
            "successfully added!",
            "error in adding to folder!"
          );
          navigation.goBack();
        }}
      >
        <FolderCard
          name={item.folder_name}
          bgColor={themeMode === "light" ? colors.white : colors.navyBlue}
          nameColor={themeMode === "light" ? colors.grey_dark : colors.greyWhite}
          notesCount={notesCount !== null ? notesCount[item.folder_id] : 0}
          width={wp("40%")}
          height={hp("18%")}
        />
      </TouchableOpacity>
    );
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
            Select Folder ...
          </Text>

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
            Select Folder...
          </Text>

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
    textAlign: "center",
    left: wp("2%"),
    fontSize: 18,
    top: hp("-1%"),
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
  goBackBtn: { top: hp("2.7%"), left: wp("5%") },
});

export default AddToFolderScreen;
