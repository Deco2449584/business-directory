import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
export default function Intro({ business }) {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{}}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="black" />
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ height: 200, width: "100%" }}
      />
      <View
        style={{
          padding: 20,
          marginTop: -20,
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}
      >
        <Text style={{ fontSize: 26, fontFamily: "outfit-bold" }}>
          {business?.name}
        </Text>
        <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
          {business?.address}
        </Text>
      </View>
    </View>
  );
}
