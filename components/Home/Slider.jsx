import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
export default function Slider() {
  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
