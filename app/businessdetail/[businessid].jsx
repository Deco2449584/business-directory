import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Intro from "../../components/BusinessDetail/Intro";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../constants/Colors";
import ActionButton from "../../components/BusinessDetail/ActionButton";
export default function businessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBusinessDetailById();
  }, []);
  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBusiness(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
    }
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          <Intro business={business} />
          <ActionButton business={business} />
        </View>
      )}
    </View>
  );
}
