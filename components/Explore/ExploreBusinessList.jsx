import { View, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businessList }) {
  return (
    <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
      {businessList.map((item, index) => (
        <BusinessListCard key={index} business={item} />
      ))}
      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
}
