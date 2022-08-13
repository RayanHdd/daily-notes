import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useFonts } from "expo-font";

import NotesScreen from "../screens/NotesScreen";
import colors from "../constants/colors";
import { getData, storeData } from "../functions/storage_functions";
import FoldersScreen from "../screens/FoldersScreen";
import Search_dark from "../assets/svg/Search_dark";
import Search_light from "../assets/svg/Search_light";
import ToggleTheme_dark from "../assets/svg/ToggleTheme_dark";
import ToggleTheme_light from "../assets/svg/ToggleTheme_light";

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-SemiBold": require("../assets/fonts/Mulish/Mulish-SemiBold.ttf"),
    "MontserratAlternates-SemiBold": require("../assets/fonts/MontserratAlternates/MontserratAlternates-SemiBold.ttf"),
  });
  // state for keeping theme state
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const grabData = async () => {
      // set theme from async storage
      const savedTheme = await getData("THEME_MODE");
      setTheme(savedTheme);
    };
    grabData().catch(console.error);
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? colors.light : colors.dark }]}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: theme === "light" ? colors.dark : "white",
                fontFamily: fontsLoaded ? "MontserratAlternates-SemiBold" : null,
              },
            ]}
          >
            Notes
          </Text>
          <TouchableOpacity style={styles.searchBtn}>
            {theme === "light" ? <Search_light /> : <Search_dark />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleThemeBtn}
            onPress={() => {
              if (theme === "light") {
                storeData("THEME_MODE", "dark");
                setTheme("dark");
              } else {
                storeData("THEME_MODE", "light");
                setTheme("light");
              }
            }}
          >
            {theme === "light" ? <ToggleTheme_light /> : <ToggleTheme_dark />}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Tab.Navigator
        initialRouteName="Notes"
        backBehavior="none"
        screenOptions={{
          tabBarItemStyle: { flex: 1, justifyContent: "center" },
          swipeEnabled: false,
          tabBarPressColor: theme === "light" ? colors.light : colors.dark,
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: colors.grey_light,
          tabBarIndicatorStyle: {
            marginHorizontal: "15%",
            width: "0%",
            backgroundColor: colors.orange,
            height: hp("0.75%"),
            borderRadius: 10,
          },
          tabBarStyle: {
            backgroundColor: theme === "light" ? colors.light : colors.dark,
            marginBottom: hp("-1%"),
            elevation: 0,
            shadowColor: colors.dark,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "All",
            tabBarLabelStyle: {
              textTransform: "capitalize",
              fontSize: wp("4%"),
              fontFamily: fontsLoaded ? "Mulish-SemiBold" : null,
            },
          }}
          name="Notes"
          children={() => <NotesScreen themeMode={theme} />}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Folders",
            tabBarLabelStyle: {
              textTransform: "capitalize",
              fontSize: wp("4%"),
              fontFamily: fontsLoaded ? "Mulish-SemiBold" : null,
            },
          }}
          name="Folders"
          children={() => <FoldersScreen themeMode={theme} />}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
  },
  header: {
    flexDirection: "row",
    top: hp("3.2%"),
    paddingLeft: wp("5.5%"),
  },
  title: { fontSize: wp("5%") },
  searchBtn: { alignSelf: "center", position: "absolute", right: wp("15%") },
  toggleThemeBtn: { alignSelf: "center", position: "absolute", right: wp("5.5%") },
});

export default TopTabs;
