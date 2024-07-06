import { StyleSheet, Text, View } from "react-native";

type StepMtricProps = {
  label: string;
  value: string;
};

const StepsMetric = ({ label, value }: StepMtricProps) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  label: {
    color: "#fff",
    fontSize: 20,
  },
  value: { fontSize: 45, color: "#fff", fontWeight: "500" },
});

export default StepsMetric;
