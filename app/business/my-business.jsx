import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Business",
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
    if (user) {
      GetUserBusiness();
    }
  }, [user]);

  const GetUserBusiness = async () => {
    try {
      setLoading(true);
      setBusinessList([]);
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        throw new Error("User email is not available");
      }
      const q = query(
        collection(db, "BusinessList"),
        where("userEmail", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() });
      });
      setBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching user business:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
        <FlatList
          data={businessList}
          onRefresh={GetUserBusiness}
          refreshing={loading}
          renderItem={({ item }) => <BusinessListCard business={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
