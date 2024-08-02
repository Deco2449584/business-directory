import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "./../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "outfit-medium",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            marginLeft: 10,
            height: 40,
            fontFamily: "outfit-medium",
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );
}
