import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import { LocationMapType } from "../../types";

const LocationMap = ({ location }: LocationMapType) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <MapView
        style={{ width: 400, height: 200, marginTop: -100, marginBottom: 20 }}
      >
        <Marker
          coordinate={{
            latitude: Number(location.latitude),
            longitude: Number(location.longitude),
          }}
        />
      </MapView>
    </View>
  );
};

export default LocationMap;
