import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const BouncingDots = (props) => {
    const progress = useSharedValue(0);

    // Continuous loop 0 → 2π
    useEffect(() => {
        progress.value = withRepeat(
            withTiming(2 * Math.PI, {
                duration: 1200,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, []);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            //minHeight: 30,
        },
        dot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: props.color,
            marginLeft: 1,
            marginRight: 1
        },
    });

  // Helper for dot bounce with phase offset
    const createDotStyle = (phaseOffset) =>
        useAnimatedStyle(() => {
        const y = Math.cos(progress.value + phaseOffset); // perfectly looped
        return {
            transform: [{ translateY: -y * 5 }], // adjust amplitude here
        };
    });

    const dotStyles = [0, (Math.PI) / 3, (2 * Math.PI) / 3].map(createDotStyle);
  

    return (
        <View style={styles.container}>
            {dotStyles.map((style, i) => (
                <Animated.View key={i} style={[styles.dot, style]} />
            ))}
        </View>
    );
};

export default BouncingDots;
