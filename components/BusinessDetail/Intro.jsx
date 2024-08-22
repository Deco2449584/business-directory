import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const onDelete = () => {
    Alert.alert(
      "Confirmación",
      "Are you sure you want to delete this business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  const deleteBusiness = async () => {
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Business deleted successfully", ToastAndroid.LONG);
  };

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
        source={
          business?.imageUrl
            ? { uri: business.imageUrl }
            : require("../../assets/images/placeholder.png")
        }
        style={{ height: 200, width: "100%" }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: 20,
          marginTop: -20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "outfit-bold",
            }}
          >
            {business?.name}
          </Text>
          <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
            {business?.address}
          </Text>
        </View>
        {isLoaded &&
          user?.primaryEmailAddress?.emailAddress === business?.userEmail && (
            <TouchableOpacity onPress={onDelete}>
              <Ionicons name="trash" size={32} color="purple" />
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
}
