import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import StepsMetric from "./src/components/StepsMetric";
import RingProgress from "./src/components/RingProgress";
import { useEffect, useState } from "react";
import useHealthData from "./src/hooks/useHealthData";
import LocationMap from "./src/components/LocationMap";

const STEP_GOAL = 10000;

export default function App() {
  const { steps, calories, distance, location } = useHealthData(
    new Date("2024-07-02")
  );

  return (
    <View style={styles.container}>
      <LocationMap location={location} />
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
        <StepsMetric label="Calories" value={calories.toString()} />
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
