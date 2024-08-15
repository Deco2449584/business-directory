import { View, Text } from "react-native";
import React from "react";

export default function About({ business }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
      <Text style={{ fontFamily: "outfit-regular", lineHeight: 25 }}>
        {business?.about}
      </Text>
    </View>
  );
}
