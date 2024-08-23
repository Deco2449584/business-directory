import React from "react";
import { View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

const SearchBar = ({ searchText, handleSearch }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 10,
      }}
    >
      <Ionicons name="search" size={24} color={Colors.PRIMARY} />
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
        style={{
          flex: 1,
          marginLeft: 10,
          height: 40,
          fontFamily: "outfit-medium",
          fontSize: 16,
        }}
      />
    </View>
  );
};

export default SearchBar;
