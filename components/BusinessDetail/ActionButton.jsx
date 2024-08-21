import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/telefono-sonando.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../assets/images/maps-and-location.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Website",
      icon: require("./../../assets/images/buscador.png"),
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../assets/images/compartir.png"),
      url: business?.website,
    },
  ];

  const OnPressHandle = (item) => {
    if (item.name === "Share") {
      Share.share({
        message:
          business?.name +
          "\n Address: " +
          business?.address +
          "\n Contact: " +
          business?.contact +
          "\n Website: " +
          business?.website,
      });
      return;
    }
    Linking.openURL(item.url);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {actionButtonMenu.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => OnPressHandle(item)}>
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
