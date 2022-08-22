import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFonts } from "expo-font";

import colors from "../constants/colors";

const NoteCard = ({ width, height, title, date, folders, bgColor, footerColor, style }) => {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Mulish-Medium": require("../assets/fonts/Mulish/Mulish-Medium.ttf"),
  });
  if (fontsLoaded)
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: bgColor,
            width: width,
            height: height,
          },
          style,
        ]}
      >
        <Text style={styles.title}>{title}</Text>

        <Text style={[styles.date, { color: footerColor }]}>{date.substr(0, 10) + "," + date.substr(10, 5)}</Text>

        {/* {iconType === "rent" ? (
        <Image
          style={{ width: wp("10%"), height: hp("6%"), borderRadius: hp("3.5%"), position: "absolute", right: wp("3.5%") }}
          source={{
            uri: iconUrl,
          }}
        />
      ) : iconType === "wallet" ? (
        <AppIcon family="Ionicons" name="wallet-outline" color={colors.darkBlue} size={hp("4.5%")} style={{ right: wp("3.5%") }} />
      ) : iconType === "fastPay" ? (
        <Image
          resizeMode="contain"
          style={{ width: wp("14%"), height: hp("18%"), borderRadius: hp("1.5%"), position: "absolute", right: wp("1.2%") }}
          source={require("../assets/images/logo.png")}
        />
      ) : null}

      <AppText text={title} size={hp("1.55%")} style={{ right: wp("16%"), bottom: hp("5.5%") }} />
      <AppText text={time + "  -  " + date} size={hp("1.5%")} color={colors.darkBlue} style={{ right: wp("16%"), bottom: hp("2%") }} />
      <AppText text={price} size={hp("1.8%")} style={{ left: wp("14%") }} />
      {type === "plus" ? (
        <AppIcon family="Feather" name="plus" size={wp("3%")} style={{ left: wp("11%"), top: hp("4.5%") }} />
      ) : type === "minus" ? (
        <AppIcon family="Feather" name="minus" size={wp("3.2%")} style={{ left: wp("11%"), bottom: hp("3.7%") }} />
      ) : null}

      <AppText text="تومان" size={hp("1.3%")} color={colors.darkBlue} style={{ left: wp("3.5%") }} /> */}
      </View>
    );
  else return null;
};

const styles = StyleSheet.create({
  card: {
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: hp("1.5%"),
    borderRadius: 5,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  title: {
    fontFamily: "Mulish-Medium",
    fontSize: wp("4%"),
    top: hp("2%"),
    left: wp("4.5%"),
    paddingRight: wp("5.7%"),
    lineHeight: hp("3%"),
  },
  date: {
    fontFamily: "Mulish-Medium",
    fontSize: wp("3.2%"),
    position: "absolute",
    bottom: hp("2.5%"),
    left: wp("4.5%"),
  },
});

export default NoteCard;
