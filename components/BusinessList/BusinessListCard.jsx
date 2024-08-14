import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function BusinessListCard({ business }) {
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 15 }}
      />

      <View
        style={{
          flex: 1,
          gap: 7,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            Colors: Colors.GRAY,
            fontSize: 15,
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/images/star.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 13,
              color: Colors.GRAY,
            }}
          >
            4.5
          </Text>
        </View>
      </View>
    </View>
  );
}
