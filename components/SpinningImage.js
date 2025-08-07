import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image } from 'react-native';

export default function SpinningImage({ spinning, imagePath }) {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const animation = useRef(null);

  const startSpinning = () => {
    spinAnim.setValue(0);
    animation.current = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.current.start();
  };

  const stopSpinning = () => {
    animation.current?.stop();
  };

  useEffect(() => {
    if (spinning) {
      startSpinning();
    } else {
      stopSpinning();
    }

    return () => stopSpinning();
  }, [spinning]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      source={require('../assets/logo.png')} 
      style={{
        width: 100,
        height: 100,
        transform: [{ rotate: spin }],
      }}
    />
  );
}
