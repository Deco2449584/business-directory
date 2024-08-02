import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "./../constants/Colors";
import { StyleSheet } from "react-native";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { width, height } = useWindowDimensions();

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          marginTop: height * 0.1,
        }}
      >
        <Image
          source={require("../assets/images/login.jpg")}
          style={{
            width: width * 0.6,
            height: height * 0.5,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "black",
          }}
        />
      </View>
      <View style={[styles.subContainer, { padding: width * 0.05 }]}>
        <Text
          style={{
            fontSize: width * 0.05,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimete
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            {" "}
            Community Business Directory
          </Text>{" "}
          App
        </Text>
        <Text
          style={{
            fontSize: width * 0.04,
            fontFamily: "outfit-regular",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favorite business near your and post your own business to
          your community
        </Text>
        <TouchableOpacity
          style={[styles.btn, { padding: width * 0.04 }]}
          onPress={onPress}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "outfit-bold",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 20,
  },
});
