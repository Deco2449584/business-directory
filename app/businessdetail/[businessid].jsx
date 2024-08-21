import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Intro from "../../components/BusinessDetail/Intro";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { db } from "../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../constants/Colors";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";
export default function businessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getBusinessDetailById();
  }, []);
  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setBusiness({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getBusinessDetailById();
    }, [refresh])
  );
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <ScrollView>
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
          <About business={business} />
          <Reviews business={business} onReviewSubmit={handleRefresh} />
        </View>
      )}
    </ScrollView>
  );
}
