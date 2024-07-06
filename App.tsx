import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StepsMetric from "./src/components/StepsMetric";

export default function App() {
  return (
    <View style={styles.container}>
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
  },
});
