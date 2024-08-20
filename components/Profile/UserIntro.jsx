import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function UserIntro() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
          marginTop: 10,
        }}
      >
        {user?.fullName}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: "outfit-regular",
        }}
      >
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}
