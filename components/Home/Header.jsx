import { View, Text, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import SearchBar from "./SearchBar"; // Importar el nuevo componente

export default function Header() {
  const { user } = useUser();
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [businesses, setBusinesses] = useState([]); // Estado para la lista completa de negocios
  const [filteredBusinesses, setFilteredBusinesses] = useState([]); // Estado para la lista filtrada de negocios

  useEffect(() => {
    fetchBusinesses(); // Llamar a fetchBusinesses cuando el componente se monta
  }, []);

  const fetchBusinesses = async () => {
    const q = query(collection(db, "BusinessList")); // Crear una consulta a la colección "BusinessList"
    const querySnapshot = await getDocs(q); // Obtener los documentos de la consulta
    const businessList = [];
    querySnapshot.forEach((doc) => {
      businessList.push({ id: doc.id, ...doc.data() }); // Agregar cada documento a la lista de negocios
    });
    setBusinesses(businessList); // Establecer la lista completa de negocios
    setFilteredBusinesses(businessList); // Inicialmente, la lista filtrada es la misma que la lista completa
  };

  const handleSearch = (text) => {
    setSearchText(text); // Actualizar el texto de búsqueda
    if (text) {
      const filtered = businesses.filter((business) =>
        business.name.toLowerCase().includes(text.toLowerCase())
      ); // Filtrar los negocios que coinciden con el texto de búsqueda
      setFilteredBusinesses(filtered); // Actualizar la lista filtrada de negocios
    } else {
      setFilteredBusinesses([]); // Establecer como lista vacía cuando no hay texto
    }
  };

  const renderBusinessCard = ({ item }) => (
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ color: Colors.GRAY }}>{item.address}</Text>
      </View>
      <View>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ height: 50, width: 80, borderRadius: 10 }}
        />
      </View>
    </View>
  );

  return (
    <View>
      <View
        style={{
          padding: 20,
          paddingTop: 40,
          backgroundColor: Colors.PRIMARY,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 99,
            }}
          />
          <View>
            <Text style={{ color: "#fff" }}>Welcome,</Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "outfit-medium",
              }}
            >
              {user?.fullName}
            </Text>
          </View>
        </View>
        <SearchBar searchText={searchText} handleSearch={handleSearch} />
      </View>
      {filteredBusinesses.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: 150, // Ajusta según sea necesario
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
      )}
    </View>
  );
}
