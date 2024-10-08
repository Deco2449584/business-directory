import { View, Text, TextInput } from "react-native";
import React, { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";
import { useFocusEffect } from "@react-navigation/native";

export default function Explore() {
  const [businessList, setBusinessList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [noBusinessMessage, setNoBusinessMessage] = useState(false);

  const GetAllBusiness = async () => {
    const q = query(collection(db, "BusinessList"));
    const querySnapshot = await getDocs(q);
    const allBusiness = [];
    querySnapshot.forEach((doc) => {
      allBusiness.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(allBusiness);
    setNoBusinessMessage(allBusiness.length === 0);
  };

  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
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
    setNoBusinessMessage(businesses.length === 0);
  };

  const filterBusinessList = (text) => {
    setSearchText(text);
    if (text === "") {
      GetAllBusiness();
    } else {
      const filteredList = businessList.filter((business) =>
        business.name.toLowerCase().includes(text.toLowerCase())
      );
      setBusinessList(filteredList);
      setNoBusinessMessage(filteredList.length === 0);
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetAllBusiness();
    }, [])
  );

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Explore More
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={filterBusinessList}
          style={{
            flex: 1,
            marginLeft: 20,
            height: 40,
            fontFamily: "outfit-medium",
            fontSize: 16,
          }}
        />
      </View>
      {/*Category*/}
      <Category
        explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}
      />
      {/*Business List*/}
      {noBusinessMessage ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.GRAY,
          }}
        >
          No business found in this category
        </Text>
      ) : (
        <ExploreBusinessList businessList={businessList} />
      )}
    </View>
  );
}
