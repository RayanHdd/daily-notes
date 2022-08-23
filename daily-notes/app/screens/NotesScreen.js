import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, View, Image, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SQLite from "expo-sqlite";

import colors from "../constants/colors";
import AddNote from "../assets/svg/AddNote";
import AddNewNote from "../assets/svg/AddNewNote";
import NoteCard from "../components/NoteCard";
import db_queries from "../constants/db_queries";
import { fetchData } from "../functions/db_functions";

const db = SQLite.openDatabase("db.database"); // returns Database object

const NotesScreen = ({ navigation, themeMode, searchQuery }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Regular": require("../assets/fonts/Mulish/Mulish-Regular.ttf"),
  });

  const [evenNotes, setEvenNotes] = useState(null);
  const [oddNotes, setOddNotes] = useState(null);
  const [searchedEvenNotes, setSearchedEvenNotes] = useState(null);
  const [searchedOddNotes, setSearchedOddNotes] = useState(null);
  const [noNotes, setNoNotes] = useState(false);

  useEffect(() => {
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
    const grabData = async () => {
      const fetched_notes = await fetchData(db, db_queries.SELECT_NOTES, []);
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
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
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
              navigation.navigate("AddNote", { themeMode: themeMode });
            }}
          >
            <AddNewNote />
          </TouchableOpacity>
        </SafeAreaView>
      ) : themeMode !== null && !noNotes && fontsLoaded ? (
        <SafeAreaView
          style={[styles.container, { backgroundColor: themeMode === "light" ? colors.light : colors.dark }]}
        >
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
              navigation.navigate("AddNote", { themeMode: themeMode });
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
    marginTop: hp("5%"),
    marginLeft: wp("-2.5%"),
  },
  leftCardsContainer: {
    marginTop: hp("5%"),
    marginLeft: wp("4%"),
  },
  addNoteBtn: { alignSelf: "flex-end", position: "absolute", bottom: hp("3%"), right: wp("6%") },
  noNotesImg: { bottom: hp("8%"), width: wp("60%"), height: hp("30%") },
  noNotesMsg: {
    fontFamily: "Mulish-Regular",
    color: colors.grey_subtitle,
    fontSize: wp("4.7%"),
    paddingHorizontal: wp("20%"),
    textAlign: "center",
    lineHeight: hp("3.7%"),
  },
  addNewNoteBtn: { top: hp("8%") },
});

export default NotesScreen;
