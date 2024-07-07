import { View, Text, NativeEventEmitter, NativeModules } from "react-native";
import React, { useEffect, useState } from "react";
import appleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthValue,
} from "react-native-health";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      appleHealthKit.Constants.Permissions.Steps,
      appleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      appleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const useHealthData = (date: Date) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);

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
    };

    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      "healthKit:StepCount:new",
      async () => {
        appleHealthKit.getStepCount(options, (error, result) => {
          if (error) {
            console.log("Error getting the stesps");
          }

          setSteps(result.value);
        });
      }
    );

    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      "healthKit:Walking:new",
      async () => {
        appleHealthKit.getDistanceWalkingRunning(options, (error, result) => {
          if (error) {
            console.log("Error getting the stesps");
          }
          console.log({ result });

          setDistance(result.value / 1000);
        });
      }
    );

    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      "healthKit:ActiveEnergyBurned:new",
      async () => {
        appleHealthKit.getBasalEnergyBurned(options, (error, value) => {
          if (error) {
            console.log("Error getting the stesps");
          }
          console.log("caloeries", { value });

          // const totalCalories = value.reduce((accumulator, currentValue) => {
          //   accumulator + currentValue;
          // }, 0);
          // let sum = 0;

          // // calculate sum using forEach() method
          // value.forEach((num) => {
          //   sum += num;
          // });

          // setCalories(totalCalories);
        });
      }
    );
  }, [hasPermission]);

  return {
    steps,
    distance,
    calories,
  };
};

export default useHealthData;
