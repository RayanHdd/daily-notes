import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";

import colors from "../constants/colors";
import Logo_dark from "../assets/svg/Logo_dark";
import Logo_light from "../assets/svg/Logo_light";
import { getData } from "../functions/storage_functions";

const SplashScreen = ({ navigation }) => {
  // load fonts needed in this screen
  const [fontsLoaded] = useFonts({
    "MontserratAlternates-Bold": require("../assets/fonts/MontserratAlternates/MontserratAlternates-Bold.ttf"),
    "MontserratAlternates-ExtraBold": require("../assets/fonts/MontserratAlternates/MontserratAlternates-ExtraBold.ttf"),
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

    // set splash duration - 2.5 seconds
    setTimeout(() => {
      navigation.navigate("TopTabs");
    }, 2500);
  }, []);

  return (
    <>
      {theme === "light" ? (
        <StatusBar barStyle="dark-content" backgroundColor={colors.light} />
      ) : (
        <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
      )}

      <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? colors.light : colors.dark }]}>
        <View style={styles.logo}>{theme === "light" ? <Logo_light /> : <Logo_dark />}</View>
        <View>
          <Text
            style={[
              styles.name,
              {
                color: theme === "light" ? colors.dark : "white",
                fontFamily: fontsLoaded ? "MontserratAlternates-Bold" : null,
              },
            ]}
          >
            Daily Notes
          </Text>
        </View>
        <View>
          <Text style={[styles.description, { fontFamily: fontsLoaded ? "MontserratAlternates-Bold" : null }]}>
            Easily Manage Notes On Your Phone
          </Text>
        </View>

        <LottieView
          source={
            theme === "light"
              ? require("../assets/animations/loading_light.json")
              : require("../assets/animations/loading_dark.json")
          }
          autoPlay
          style={styles.loading}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    bottom: hp("13%"),
    left: wp("2.8%"),
  },
  name: {
    fontSize: wp("6.7%"),
    bottom: hp("7%"),
  },
  description: {
    letterSpacing: wp("0.15%"),
    color: colors.grey,
    fontSize: wp("3.5%"),
    bottom: hp("5.2%"),
  },
  loading: {
    top: hp("40%"),
  },
});

export default SplashScreen;
