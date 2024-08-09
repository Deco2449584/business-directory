import { View, Text, Image } from "react-native";
import React from "react";

export default function CategoryItem({ category }) {
  return (
    <View>
      <Image
        source={{ uri: category.icon }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
