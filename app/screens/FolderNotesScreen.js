import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Text,
  Pressable,
  Animated,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Searchbar } from "react-native-paper";
import * as SQLite from "expo-sqlite";
import { useIsFocused } from "@react-navigation/native";

import colors from "../constants/colors";
import AddNote from "../assets/svg/AddNote";
import AddNewNote from "../assets/svg/AddNewNote";
import NoteCard from "../components/NoteCard";
import db_queries from "../constants/db_queries";
import { fetchData } from "../functions/db_functions";
import Search_dark from "../assets/svg/Search_dark";
import Search_light from "../assets/svg/Search_light";
import Folder from "../assets/svg/Folder";
import RightArrow_dark from "../assets/svg/RightArrow_dark";
import RightArrow_light from "../assets/svg/RightArrow_light";

const db = SQLite.openDatabase("db.database"); // returns Database object

const FolderNotesScreen = ({ navigation, route }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Regular": require("../assets/fonts/Mulish/Mulish-Regular.ttf"),
  });

  const { themeMode, folderName, folderId } = route.params;

  const [evenNotes, setEvenNotes] = useState(null);
  const [oddNotes, setOddNotes] = useState(null);
  const [searchedEvenNotes, setSearchedEvenNotes] = useState(null);
  const [searchedOddNotes, setSearchedOddNotes] = useState(null);
  const [noNotes, setNoNotes] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchBarShown, setSearchBarShown] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const _startAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: 0.6,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    console.log("1");
    // set theme for status bar
    themeMode === "light" ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("light-content");
    themeMode === "light" ? StatusBar.setBackgroundColor(colors.light) : StatusBar.setBackgroundColor(colors.dark);
  }, [themeMode]);

  useEffect(() => {
    if (evenNotes !== null && oddNotes !== null && searchQuery !== null) {
      // do search filter here
      const evenResult = evenNotes.filter((item) => item.note_title.toLowerCase().includes(searchQuery.toLowerCase()));
      const oddResult = oddNotes.filter((item) => item.note_title.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchedEvenNotes(evenResult);
      setSearchedOddNotes(oddResult);
    }
    if (searchQuery === null) {
      setSearchedEvenNotes(null);
      setSearchedOddNotes(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log("navigation changed");
    const grabData = async () => {
      const fetched_notes = await fetchData(db, db_queries.SELECT_FOLDER_NOTES, [parseInt(folderId)]);
      if (fetched_notes.length === 0) {
        setNoNotes(true);
      }
      fetched_notes.reverse(); // sort notes by dateTime ASC
      const evenNotes = fetched_notes.filter((_, i) => i % 2 === 0);
      const oddNotes = fetched_notes.filter((_, i) => i % 2 === 1);
      setEvenNotes(evenNotes);
      setOddNotes(oddNotes);
    };
    grabData().catch(console.error);
  }, [navigation]);

  const renderItem = ({ item }) => {
    const bgColorsList = [
      colors.pink_noteCard,
      colors.orange_noteCard,
      colors.yellow_noteCard,
      colors.blue_noteCard,
      colors.purple_noteCard,
    ];
    const footerColorsList = [
      colors.pink_noteCardFooter,
      colors.orange_noteCardFooter,
      colors.yellow_noteCardFooter,
      colors.blue_noteCardFooter,
      colors.purple_noteCardFooter,
    ];
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NoteDetails", {
            themeMode: themeMode,
            noteTitle: item.note_title,
            noteDescription: item.note_description,
            noteDateTime: item.note_dateTime,
            noteId: item.note_id,
          });
        }}
      >
        <NoteCard
          title={item.note_title.length >= 45 ? item.note_title.substr(0, 45) + "..." : item.note_title}
          date={item.note_dateTime}
          bgColor={bgColorsList[(parseInt(item.note_id) - 1) % 5]}
          width={wp("45%")}
          height={
            item.note_title.length < 15
              ? hp("13.5%")
              : item.note_title.length < 30
              ? hp("16.5%")
              : item.note_title.length < 45
              ? hp("19.5%")
              : hp("22.5%")
          }
          footerColor={footerColorsList[(parseInt(item.note_id) - 1) % 5]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {themeMode !== null && noNotes && fontsLoaded ? (
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: themeMode === "light" ? colors.light : colors.dark,
            },
          ]}
        >
          {!searchBarShown ? (
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setSearchBarShown(true);
                  _startAnimation();
                }}
                style={styles.searchBtn}
              >
                {themeMode === "light" ? <Search_light /> : <Search_dark />}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Folder width="28px" />
              </TouchableOpacity>

              <View style={styles.rightArrow}>
                {themeMode === "light" ? <RightArrow_light /> : <RightArrow_dark />}
              </View>

              <Text
                style={[
                  styles.title,
                  {
                    color: themeMode === "light" ? colors.navyBlue : "white",
                  },
                ]}
              >
                {folderName}
              </Text>
            </View>
          ) : (
            <Animated.View
              style={{
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
                    paddingTop: hp("4%"),
                    paddingLeft: wp("6.7%"),
                  }}
                  onPress={() => {
                    setSearchBarShown(false);
                    setSearchQuery(null);
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("3.2%"),
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

          <View style={{ justifyContent: "center", alignItems: "center", top: hp("30%") }}>
            <Image
              source={
                themeMode === "light"
                  ? require("../assets/images/noNotes_light.png")
                  : require("../assets/images/noNotes_dark.png")
              }
              style={styles.noNotesImg}
            />
            <Text style={styles.noNotesMsg}>Oops! There are no notes that you have created</Text>
            <TouchableOpacity
              style={styles.addNewNoteBtn}
              onPress={() => {
                navigation.navigate("AddNote", { themeMode: themeMode, folderId: folderId, folderName: folderName });
              }}
            >
              <AddNewNote />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : themeMode !== null && !noNotes && fontsLoaded ? (
        <SafeAreaView
          style={[styles.container, { backgroundColor: themeMode === "light" ? colors.light : colors.dark }]}
        >
          {!searchBarShown ? (
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setSearchBarShown(true);
                  _startAnimation();
                }}
                style={styles.searchBtn}
              >
                {themeMode === "light" ? <Search_light /> : <Search_dark />}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Folder width="28px" />
              </TouchableOpacity>

              <View style={styles.rightArrow}>
                {themeMode === "light" ? <RightArrow_light /> : <RightArrow_dark />}
              </View>

              <Text
                style={[
                  styles.title,
                  {
                    color: themeMode === "light" ? colors.navyBlue : "white",
                  },
                ]}
              >
                {folderName}
              </Text>
            </View>
          ) : (
            <Animated.View
              style={{
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
                    paddingTop: hp("4%"),
                    paddingLeft: wp("6.7%"),
                  }}
                  onPress={() => {
                    setSearchBarShown(false);
                    setSearchQuery(null);
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("3.2%"),
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

          {!searchedEvenNotes || searchedEvenNotes.length !== 0 || searchedOddNotes.length !== 0 ? (
            <View style={{ flexDirection: "row" }}>
              <FlatList
                data={searchedEvenNotes !== null ? searchedEvenNotes : evenNotes}
                renderItem={renderItem}
                keyExtractor={(item) => item.note_id}
                extraData={searchedEvenNotes}
                showsVerticalScrollIndicator={false}
                style={styles.leftCardsContainer}
              />
              <FlatList
                data={searchedOddNotes !== null ? searchedOddNotes : oddNotes}
                renderItem={renderItem}
                keyExtractor={(item) => item.note_id}
                extraData={searchedOddNotes}
                showsVerticalScrollIndicator={false}
                style={styles.rightCardsContainer}
              />
            </View>
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
            style={styles.addNoteBtn}
            onPress={() => {
              navigation.navigate("AddNote", { themeMode: themeMode, folderId: folderId, folderName: folderName });
            }}
          >
            <AddNote />
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
  rightCardsContainer: {
    marginTop: hp("4%"),
    marginLeft: wp("-2%"),
    marginBottom: hp("8%"),
  },
  leftCardsContainer: {
    marginTop: hp("4%"),
    marginLeft: wp("4%"),
    marginBottom: hp("8%"),
  },
  addNoteBtn: { alignSelf: "flex-end", position: "absolute", bottom: hp("3%"), right: wp("6%") },
  noNotesImg: { bottom: hp("15%"), width: wp("60%"), height: hp("30%") },
  noNotesMsg: {
    fontFamily: "Mulish-Regular",
    color: colors.grey_subtitle,
    fontSize: wp("4.7%"),
    paddingHorizontal: wp("18%"),
    textAlign: "center",
    lineHeight: hp("3.5%"),
    bottom: hp("8%"),
  },
  addNewNoteBtn: { top: hp("3%") },
  searchBtn: { alignSelf: "center", position: "absolute", right: wp("5%") },
  header: {
    flexDirection: "row",
    top: hp("0.8%"),
    paddingLeft: wp("5%"),
  },
  title: {
    fontSize: wp("4%"),
    fontFamily: "MontserratAlternates-SemiBold",
    top: hp("2.6%"),
    left: wp("2%"),
  },
  rightArrow: { top: hp("3.65%"), left: wp("1%") },
});

export default FolderNotesScreen;
