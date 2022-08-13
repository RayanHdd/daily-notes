import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import colors from "../constants/colors";
import AddFolder from "../assets/svg/AddFolder";

const FoldersScreen = ({ themeMode }) => {
  // state for keeping theme state
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(themeMode);
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? colors.light : colors.dark }]}>
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
  addFolderBtn: { alignSelf: "flex-end", position: "absolute", bottom: hp("3%"), right: wp("6%") },
});

export default FoldersScreen;
