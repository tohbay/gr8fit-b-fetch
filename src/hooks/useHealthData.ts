import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import appleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from "react-native-health";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      appleHealthKit.Constants.Permissions.Steps,
      appleHealthKit.Constants.Permissions.FlightsClimbed,
      appleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const useHealthData = (date: Date) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    appleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log("Error getting permisions");
        return;
      }
      setHasPermission(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      return;
    }
    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
      // unit: HealthUnit.meter,
    };

    appleHealthKit.getStepCount(options, (error, result) => {
      if (error) {
        console.log("Error getting the stesps");
      }
      console.log({ result });

      setSteps(result.value);
    });

    appleHealthKit.getFlightsClimbed(options, (error, result) => {
      if (error) {
        console.log("Error getting the stesps");
      }
      console.log({ result });

      setFlights(result.value);
    });

    appleHealthKit.getDistanceWalkingRunning(options, (error, result) => {
      if (error) {
        console.log("Error getting the stesps");
      }
      console.log({ result });

      setDistance(result.value / 1000);
    });
  }, [hasPermission]);

  return {
    steps,
    flights,
    distance,
  };
};

export default useHealthData;
