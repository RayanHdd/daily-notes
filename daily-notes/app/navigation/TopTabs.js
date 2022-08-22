import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Button, Pressable, Animated } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Searchbar } from "react-native-paper";

import NotesScreen from "../screens/NotesScreen";
import colors from "../constants/colors";
import { getData, storeData } from "../functions/storage_functions";
import FoldersScreen from "../screens/FoldersScreen";
import Search_dark from "../assets/svg/Search_dark";
import Search_light from "../assets/svg/Search_light";
import ToggleTheme_dark from "../assets/svg/ToggleTheme_dark";
import ToggleTheme_light from "../assets/svg/ToggleTheme_light";

const Tab = createMaterialTopTabNavigator();

const TopTabs = (props) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-SemiBold": require("../assets/fonts/Mulish/Mulish-SemiBold.ttf"),
    "MontserratAlternates-SemiBold": require("../assets/fonts/MontserratAlternates/MontserratAlternates-SemiBold.ttf"),
    "Mulish-Medium": require("../assets/fonts/Mulish/Mulish-Medium.ttf"),
  });
  // state for keeping theme state
  const [theme, setTheme] = useState(null);

  const [searchQuery, setSearchQuery] = useState(null);

  const [searchBarShown, setSearchBarShown] = useState(false);

  // const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const slideAnim = useRef(new Animated.Value(0)).current;

  const _startAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: 0.6,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

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
      {theme !== null && fontsLoaded ? (
        <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? colors.light : colors.dark }]}>
          {!searchBarShown ? (
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
              <TouchableOpacity
                onPress={() => {
                  setSearchBarShown(true);
                  _startAnimation();
                }}
                style={styles.searchBtn}
              >
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
          ) : (
            <Animated.View
              style={{
                // position: "absolute",
                // right: hp("16%"),
                // bottom: hp("14.5%"),
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 0.6],
                      outputRange: [-600, 0],
                    }),
                  },
                ],
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Searchbar
                  placeholder="Search"
                  inputStyle={{ fontFamily: "Mulish-Medium", fontSize: wp("3.6%"), letterSpacing: 0.8 }}
                  style={{ height: hp("5.5%"), width: wp("78%"), left: wp("4%"), top: hp("2.5%"), borderRadius: 6 }}
                  onChangeText={(query) => {
                    setSearchQuery(query);
                  }}
                  value={searchQuery}
                />
                <Pressable
                  style={{
                    // alignItems: "center",
                    // justifyContent: "center",
                    paddingTop: hp("4%"),
                    paddingLeft: wp("6.7%"),
                    // borderRadius: 4,
                    // elevation: 3,
                    // backgroundColor: "black",
                  }}
                  onPress={() => {
                    setSearchBarShown(false);
                    setSearchQuery(null);
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("3.2%"),
                      // alignSelf: "center",
                      letterSpacing: 0.25,
                      color: colors.purpleBlue,
                      fontFamily: "MontserratAlternates-SemiBold",
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          )}
        </SafeAreaView>
      ) : (
        <AppLoading onError={console.warn} />
      )}

      {theme !== null && fontsLoaded ? (
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
              marginBottom: hp("-1.5%"),
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
            children={() => <NotesScreen themeMode={theme} searchQuery={searchQuery} navigation={props.navigation} />}
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
      ) : (
        <AppLoading onError={console.warn} />
      )}
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
