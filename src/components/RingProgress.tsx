import { View } from "react-native";
import React, { useEffect } from "react";
import Svg, { Circle, CircleProps } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};

const color = "#EE0F55";

const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress,
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));

  const circleDefaultProps: CircleProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    originX: radius,
    originY: radius,
    fill: "#903801",
    strokeWidth: strokeWidth,
    stroke: color,
    strokeLinecap: "round",
    rotation: "-90",
  };

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <Svg>
        {/* background */}
        <Circle {...circleDefaultProps} opacity={0.2} />
        {/* foreground */}
        <AnimatedCircle animatedProps={animatedProps} {...circleDefaultProps} />
      </Svg>
    </View>
  );
};

export default RingProgress;
