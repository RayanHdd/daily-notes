import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppLoading from "expo-app-loading";

import colors from "../constants/colors";
import AddNote from "../assets/svg/AddNote";

const NotesScreen = ({ navigation, themeMode }) => {
  // state for keeping theme state
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    console.log(themeMode);
    setTheme(themeMode);
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  return (
    <>
      {themeMode !== null ? (
        <SafeAreaView
          style={[styles.container, { backgroundColor: themeMode === "light" ? colors.light : colors.dark }]}
        >
          <TouchableOpacity
            style={styles.addNoteBtn}
            onPress={() => {
              navigation.navigate("AddNote", { themeMode: themeMode });
            }}
          >
            <AddNote />
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <AppLoading
          // startAsync={this._cacheResourcesAsync}
          // onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
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
  addNoteBtn: { alignSelf: "flex-end", position: "absolute", bottom: hp("3%"), right: wp("6%") },
});

export default NotesScreen;
