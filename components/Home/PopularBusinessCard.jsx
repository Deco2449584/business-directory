import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { Rating } from "react-native-ratings";

export default function PopularBusinessCard({ business }) {
  // Calcula el promedio de rating
  // Calcula el promedio de rating
  const averageRating =
    business.reviews && business.reviews.length > 0
      ? (
          business.reviews.reduce((sum, review) => sum + review.rating, 0) /
          business.reviews.length
        ).toFixed(1)
      : 0;
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: 200, height: 130, borderRadius: 15 }}
      />
      <View
        style={{
          marginTop: 7,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 17,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 13,
            color: Colors.GRAY,
          }}
        >
          {business.address}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Rating
              imageSize={15}
              startingValue={parseFloat(averageRating)}
              readonly={true}
              style={{ alignItems: "flex-start" }}
            />
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 13,
                color: Colors.GRAY,
                marginLeft: 10,
              }}
            >
              {parseFloat(averageRating)}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit-regular",
              backgroundColor: Colors.PRIMARY,
              fontSize: 12,
              padding: 3,
              color: "white",
              borderRadius: 5,
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
