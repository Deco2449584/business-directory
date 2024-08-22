import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
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
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });

    setBusinessList(businesses);
    setLoading(false);
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : businessList.length > 0 ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.GRAY,
            margin: 50,
          }}
        >
          No business found in this category
        </Text>
      )}
    </View>
  );
}
