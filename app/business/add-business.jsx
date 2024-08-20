import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { db, storage } from "../../configs/FirebaseConfig";
import { collection, getDocs, query, setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0]?.uri);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const AddBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString();
    const resp = await fetch(image);
    const blob = await resp.blob();
    const imageRef = ref(storage, "business-app/" + fileName);
    await uploadBytes(imageRef, blob)
      .then(async (snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
      })
      .then((resp) =>
        getDownloadURL(imageRef).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          saveBusinessDetail(downloadURL);
        })
      );
    setLoading(false);
  };

  const saveBusinessDetail = async (imageUrl) => {
    const businessData = {
      name: name || "",
      address: address || "",
      contact: contact || "",
      website: website || "",
      about: about || "",
      category: category || "",
      username: user?.fullName || "Anonymous",
      userEmail: user?.primaryEmailAddress?.emailAddress || "",
      userImage: user?.imageUrl || "",
      imageUrl: imageUrl || "",
    };

    await setDoc(doc(db, "BusinessList", Date.now().toString()), businessData);
    setLoading(false);
    ToastAndroid.show("Business Added Successfully", ToastAndroid.BOTTOM);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontFamily: "outfit-bold",
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          color: Colors.GRAY,
        }}
      >
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
        onPress={onImagePick}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/camera.png")}
            style={{
              width: 150,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
              backgroundColor: "white",
              padding: 10,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 150,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
              backgroundColor: "white",
              padding: 10,
            }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(v) => setName(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          placeholder="Address"
          onChangeText={(v) => setAddress(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(v) => setContact(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          placeholder="Website"
          onChangeText={(v) => setWebsite(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          placeholder="About"
          onChangeText={(v) => setAbout(v)}
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 17,
          backgroundColor: "white",
          marginTop: 10,
          borderColor: Colors.PRIMARY,
          fontFamily: "outfit-regular",
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={categoryList}
        />
      </View>

      <TouchableOpacity
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={AddBusiness}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "outfit-bold",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          height: 100,
        }}
      ></View>
    </ScrollView>
  );
}
