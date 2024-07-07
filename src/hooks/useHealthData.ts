import { View, Text, NativeEventEmitter, NativeModules } from "react-native";
import React, { useEffect, useState } from "react";
import appleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthValue,
} from "react-native-health";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import uuid from "react-native-uuid";
import * as Location from "expo-location";

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
  const [userLocation, setUserLocation] = useState<Location.LocationObject>();

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
          console.log("result>>>>>", { result });

          setDistance(result.value / 1000);
        });
      }
    );

    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      "healthKit:ActiveEnergyBurned:new",
      async () => {
        appleHealthKit.getBasalEnergyBurned(options, (error, result) => {
          if (error) {
            console.log("Error getting the stesps");
          }
          console.log("caloeries>>>>", { result });

          let totalCalories = 0;

          result.forEach((value: HealthValue | number) => {
            totalCalories += value as number;
          });

          setCalories(totalCalories);
        });
      }
    );
  }, [hasPermission]);

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

  const location = {
    latitude: userLocation?.coords.latitude,
    longitude: userLocation?.coords.longitude,
  };

  const saveHealthData = async () => {
    await setDoc(doc(db, "Apple Health"), {
      id: uuid.v4(),
      steps,
      distance,
      calories,
      location,
    });
  };

  saveHealthData();

  return {
    steps,
    distance,
    calories,
    location,
  };
};

export default useHealthData;
