import {Animated, Easing} from 'react-native'

const AnimatedDot = (props) => {
    
    const animatedValue = new Animated.Value(1);

    // Define the animation configuration
    const animationConfig = {
        toValue: 0, // End value (1 represents the top position)
        duration: 1000, // Animation duration (milliseconds)
        easing: Easing.linear,
        useNativeDriver: false, // Set to true if you can (performance improvement)
    };

    // Function to start the animation
    const startAnimation = async () => {
      
        await new Promise((resolve) => setTimeout(resolve, props.delay))

        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    ...animationConfig,
                    toValue: 0, // Go up
                    duration: 200,
                    
                }),
                Animated.timing(animatedValue, {
                    ...animationConfig,
                    toValue: 1, // Go down
                    duration: 300
                }),
                Animated.timing(animatedValue, {
                    ...animationConfig,
                    toValue: 1, // stay down
                    duration: 1000
                }),
            ])
      ).start();
    }
  
    // Start the animation
    startAnimation()
  
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10], // Adjust the range for desired up and down distance
    })

    return (<Animated.View
        style={{
          width: 10,
          height: 10,
          borderRadius: 10,
          margin: 2,
          backgroundColor: props.color, // Dot's color
          transform: [{ translateY }], // Apply vertical translation
        }}
        />)
}

export default AnimatedDot;