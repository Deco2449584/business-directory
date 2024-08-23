import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import Fuse from "fuse.js";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { Rating } from "react-native-ratings";

// Componente principal que recibe el texto de búsqueda como prop
const SearchBusinessList = ({ searchText }) => {
  // Estado para almacenar la lista de negocios y la lista filtrada
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  // Hook para la navegación
  const router = useRouter();

  // useEffect para cargar la lista de negocios al montar el componente
  useEffect(() => {
    fetchBusinesses();
  }, []);

  // useEffect para filtrar la lista de negocios cuando cambia el texto de búsqueda
  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  // Función para obtener la lista de negocios desde Firestore
  const fetchBusinesses = async () => {
    const q = query(collection(db, "BusinessList"));
    const querySnapshot = await getDocs(q);
    const businessList = [];
    querySnapshot.forEach((doc) => {
      businessList.push({ id: doc.id, ...doc.data() });
    });
    setBusinesses(businessList);
    setFilteredBusinesses(businessList);
  };

  // Función para manejar la búsqueda utilizando Fuse.js
  const handleSearch = (text) => {
    if (text) {
      const fuse = new Fuse(businesses, {
        keys: ["name"],
        threshold: 0.9,
      });
      const result = fuse.search(text);
      const filtered = result.map(({ item }) => item);
      setFilteredBusinesses(filtered);
    } else {
      setFilteredBusinesses([]);
    }
  };

  // Función para renderizar cada tarjeta de negocio
  const renderBusinessCard = ({ item }) => {
    // Calcula el promedio de rating
    const averageRating =
      item.reviews && item.reviews.length > 0
        ? item.reviews.reduce((sum, review) => sum + review.rating, 0) /
          item.reviews.length
        : 0;
    return (
      <TouchableOpacity
        onPress={() => router.push("/businessdetail/" + item?.id)}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: 10,
            padding: 15,
            marginBottom: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text style={{ color: Colors.GRAY }}>{item.address}</Text>
            <Rating
              imageSize={15}
              startingValue={averageRating}
              readonly={true}
              style={{ alignItems: "flex-start" }}
            />
          </View>
          <View>
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                height: 50,
                width: 80,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Renderiza la lista de negocios filtrados
  return (
    <View
      style={{
        position: "absolute",
        top: 150,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        zIndex: 1,
      }}
    >
      <FlatList
        data={filteredBusinesses}
        keyExtractor={(item) => item.id}
        renderItem={renderBusinessCard}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

export default SearchBusinessList;
