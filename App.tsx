import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StepsMetric from "./src/components/StepsMetric";
import RingProgress from "./src/components/RingProgress";
import { useEffect, useState } from "react";
import appleHealthKit, { HealthKitPermissions } from "react-native-health";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [appleHealthKit.Constants.Permissions.Steps],
    write: [],
  },
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    appleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log("Error getting permisions");
        return;
      }
      setHasPermission(true);
    });
  }, []);
  return (
    <View style={styles.container}>
      <RingProgress radius={150} strokeWidth={50} progress={0.5} />

      <View style={styles.metricsContainer}>
        <StepsMetric label="Steps" value="1000" />
        <StepsMetric label="Distance" value="5km" />
        <StepsMetric label="Flights climbed" value="0.65km" />
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
