import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import colors from "../constants/colors";
import AddFolder from "../assets/svg/AddFolder";
import FolderCard from "../components/FolderCard";

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

const FoldersScreen = ({ themeMode }) => {
  // state for keeping theme state
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(themeMode);
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("NoteDetails", {
          //   themeMode: themeMode,
          //   noteTitle: item.note_title,
          //   noteDescription: item.note_description,
          //   noteDateTime: item.note_dateTime,
          // });
        }}
      >
        <FolderCard
          name={item.name}
          bgColor={themeMode === "light" ? colors.white : colors.navyBlue}
          nameColor={themeMode === "light" ? colors.grey_dark : colors.greyWhite}
          notesCount={item.notesCount}
          width={wp("40%")}
          height={hp("18%")}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? colors.light : colors.dark }]}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={styles.cardsContainer}
        />

        <TouchableOpacity style={styles.addFolderBtn}>
          <AddFolder />
        </TouchableOpacity>
      </SafeAreaView>
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
});

export default FoldersScreen;
