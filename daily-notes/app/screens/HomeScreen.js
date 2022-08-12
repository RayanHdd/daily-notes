import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { storeData } from "../functions/storage_functions";

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="change theme"
        onPress={() => {
          storeData("THEME_MODE", "dark");
        }}
      />
    </View>
  );
};

export default HomeScreen;
