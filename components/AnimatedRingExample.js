import {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    Extrapolate,
    withRepeat,
    withDelay,
    Easing,
    
  } from 'react-native-reanimated';

const Ring = ({ delay, active }) => {
    const ring = useSharedValue(0);
  
    const ringStyle = useAnimatedStyle(() => {
      return {
        opacity: 0.8 - ring.value,
        transform: [
          {
            scale: interpolate(ring.value, [0, 1], [0, 2]),
          },
        ],
      };
    });
    
    useEffect(() => {
      if (active) {
        ring.value = withDelay(
          delay,
          withRepeat(
            withTiming(1, {
              duration: 3000,
            }),
            -1,
            false
          )
        );
      } else {
        ring.value = 0; // Reset to original state when not active
      }
    }, [active]);

    return <Animated.View style={[{position: "absolute",borderRadius: 100, borderColor: "#fff", borderWidth: 5, backgroundColor: null, minWidth: "20%", height: 80, width: 80}, ringStyle]} />;
}

function AnimatedRingExample({active = true}) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: 'absolute',
          zIndex: -1
        }}
      >
        
        <Ring delay={0} active={active}/>
      </View>
    );
}

const styles = StyleSheet.create({
    ring: {
      position: "absolute",
      width: 80,
      height: 80,
      borderRadius: 40,
      borderColor: "#091212",
      borderWidth: 3,
      borderWidth: 10,
    },
  });

export default AnimatedRingExample;
