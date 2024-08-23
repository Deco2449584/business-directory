import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { Rating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AllBusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "All  Business",
      headerShown: true,
      headerTitleStyle: {
        fontFamily: "outfit-bold",
        fontSize: 25,
        color: "white",
      },
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={30}
          color="white"
          style={{ padding: 20 }}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  const fetchBusinesses = async () => {
    const q = query(collection(db, "BusinessList"));
    const querySnapshot = await getDocs(q);
    const businessList = [];
    querySnapshot.forEach((doc) => {
      businessList.push({ id: doc.id, ...doc.data() });
    });
    setBusinesses(businessList);
  };

  const renderBusinessCard = ({ item }) => {
    const averageRating =
      item.reviews && item.reviews.length > 0
        ? (
            item.reviews.reduce((sum, review) => sum + review.rating, 0) /
            item.reviews.length
          ).toFixed(1)
        : 0;

    return (
      <TouchableOpacity
        onPress={() => router.push("/businessdetail/" + item?.id)}
        style={{
          flex: 1,
          margin: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={{
              height: 200,
              justifyContent: "flex-end",
            }}
            imageStyle={{
              borderRadius: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: Colors.GRAY,
                  textAlign: "center",
                }}
              >
                {item.address}
              </Text>
            </View>
          </ImageBackground>
          <View
            style={{
              padding: 10,
            }}
          >
            <Rating
              imageSize={15}
              startingValue={parseFloat(averageRating)}
              readonly={true}
              style={{
                alignItems: "center",
                marginTop: 5,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginTop: 5,
                textAlign: "center",
                fontFamily: "outfit-medium",
              }}
            >
              {averageRating} ({item.reviews?.length} reviews)
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderBusinessCard}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
    </View>
  );
};

export default AllBusinessList;
