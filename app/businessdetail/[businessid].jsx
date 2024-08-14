import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function businessDetail() {
  const { businessid } = useLocalSearchParams();
  return (
    <View>
      <Text>{businessid}</Text>
    </View>
  );
}
