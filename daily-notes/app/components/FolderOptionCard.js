import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFonts } from "expo-font";

import colors from "../constants/colors";
import Folder from "../assets/svg/Folder";

const FolderOptionCard = ({ width, height, name, bgColor, nameColor, notesCount, style }) => {
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
            shadowColor: bgColor,
          },
          style,
        ]}
      >
        <View style={styles.folder}>
          <Folder />
        </View>

        <Text style={[styles.name, { color: nameColor }]}>{name + " (" + notesCount + ")"}</Text>

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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("3%"),
    marginLeft: wp("6.66%"),
    borderRadius: 24,
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1.5,
  },
  name: {
    fontFamily: "Mulish-Medium",
    fontSize: wp("2.9%"),
    top: hp("1%"),
  },
  folder: { bottom: hp("1%") },
});

export default FolderOptionCard;
