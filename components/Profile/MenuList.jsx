import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
export default function MenuList() {
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/businessAdd.png"),
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/business.png"),
    },
    {
      id: 3,
      name: "Shared App",
      icon: require("../../assets/images/sharing.png"),
    },

    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
    },
  ];
  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "outfit-medium",
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit-regular",
          textAlign: "center",
          marginTop: 50,
          color: Colors.GRAY,
        }}
      >
        Developed By Daniel Caro
      </Text>
    </View>
  );
}
