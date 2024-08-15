import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../configs/FirebaseConfig";
export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userImput, setUserInput] = useState();
  const { user } = useUser();
  const onsSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userImput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress.emailAddress,
      }),
    });
    ToastAndroid.show("Review submitted", ToastAndroid.BOTTOM);
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>
      <View>
        <Rating
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write your comment here..."
          numberOfLines={4}
          onChangeText={(text) => setUserInput(text)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.PRIMARY,
            justifyContent: "flex-start",
            textAlignVertical: "top",
          }}
        ></TextInput>
        <TouchableOpacity
          disabled={!userImput}
          onPress={() => onsSubmit()}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "outfit-regular",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {business?.reviews?.map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Colors.GRAY,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{ width: 50, height: 50, borderRadius: 99 }}
            />
            <View
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                }}
              >
                {item.userName}
              </Text>
              <Rating
                ImageSize={10}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
