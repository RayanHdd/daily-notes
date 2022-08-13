import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { useEffect } from "react";

import SplashScreen from "./app/screens/SplashScreen";
import TopTabs from "./app/navigation/TopTabs";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="TopTabs" component={TopTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
