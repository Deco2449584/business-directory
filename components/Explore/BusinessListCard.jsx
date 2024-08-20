import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View style={{ padding: 15 }}>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 22, marginBottom: 5 }}
        >
          {business?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            color: Colors.GRAY,
            fontSize: 16,
          }}
        >
          {business?.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
