import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useState } from "react";
import PopularBusinessCard from "./PopularBusinessCard";
import { useRouter } from "expo-router";
export default function PopularBusiness() {
  const router = useRouter();

  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    GetBusinessList();
  }, []);
  const GetBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            padding: 10,
            marginRight: 15,
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          #PopularBusiness
        </Text>

        <TouchableOpacity
          onPress={() => router.push("businesslist/AllBusinessList")}
        >
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "outfit-medium",
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <PopularBusinessCard key={index} business={item} />
          </View>
        )}
      />
    </View>
  );
}
