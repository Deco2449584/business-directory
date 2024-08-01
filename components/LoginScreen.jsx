import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "./../constants/Colors";
import { StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          marginTop: 100,
        }}
      >
        <Image
          source={require("../assets/images/login.jpg")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "black",
          }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 20,
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
            fontSize: 15,
            fontFamily: "outfit-regular",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favorite business near your and post your own business to
          your community
        </Text>
        <TouchableOpacity style={styles.btn}>
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
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
});
