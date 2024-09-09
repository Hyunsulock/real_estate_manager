import Animated, {
  withDelay,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Link } from 'expo-router';

import {StyleSheet, Text, View, Pressable, FlatList, TextInput, TouchableOpacity} from 'react-native'

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedText = Animated.createAnimatedComponent(Text);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

export const FloatingActionButton = ({ isExpanded, index, buttonLetter, onPress }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 2;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
         {translateX: -30},
      ],
    };
  });
    const animatedStyles2 = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 2;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
        {translateX: -40},
        
        
      ],
    };
  });

  return (
    <View style={styles.buttonContainer2}>
        
    <AnimatedPressable 
    onPress={onPress}
    style={[animatedStyles, styles.shadow, styles.button]}>
        
      <Animated.Text style={styles.content}>{buttonLetter}</Animated.Text>
    </AnimatedPressable>
    
    </View>
  );
};





const styles = StyleSheet.create({
    buttonContainer2: {
            position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    },
  mainContainer: {
    position: 'relative',
    height: 260,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
    btn2: {
        margin: 2
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: '#82cab2',
    position: 'absolute',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    flexDirection: 'row',
    paddingHorizontal:2
    
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 10,
    right: 10
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    color: '#f8f9ff',
    fontWeight: 500,
  },
});