import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import StepsMetric from "./src/components/StepsMetric";
import RingProgress from "./src/components/RingProgress";
import { useEffect, useState } from "react";
import useHealthData from "./src/hooks/useHealthData";
import * as Location from "expo-location";

const STEP_GOAL = 10000;

export default function App() {
  const [userLocation, setUserLocation] = useState<
    Location.LocationObject | undefined
  >();
  const { steps, flights, distance } = useHealthData(new Date("2024-07-03"));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        console.log("Permission granted successfully");
      } else {
        console.log("Permission denied");
      }

      const location = await Location.getCurrentPositionAsync();
      setUserLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 20, marginBottom: 20 }}>
        {JSON.stringify(location)}
      </Text>
      <RingProgress
        radius={150}
        strokeWidth={50}
        progress={steps / STEP_GOAL}
      />

      <View style={styles.metricsContainer}>
        <StepsMetric label="Steps" value={steps.toString()} />
        <StepsMetric
          label="Distance"
          value={`${distance.toFixed(2).toString()} km`}
        />
        <StepsMetric label="Flights climbed" value={flights.toString()} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#903801",
    justifyContent: "center",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
    flexWrap: "wrap",
    marginTop: 80,
  },
});
