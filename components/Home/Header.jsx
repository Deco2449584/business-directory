import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import SearchBar from "./SearchBar";
import SearchBusinessList from "./SearchBusinessList";

export default function Header() {
  const { user } = useUser();
  const [searchText, setSearchText] = useState("");

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
        <SearchBar searchText={searchText} handleSearch={setSearchText} />
      </View>
      <SearchBusinessList searchText={searchText} />
    </View>
  );
}
