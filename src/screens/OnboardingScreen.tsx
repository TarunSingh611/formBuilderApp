// src/screens/OnboardingScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Step {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const steps: Step[] = [
    {
      title: 'Create Your First Form',
      description: 'Start with a template or build from scratch',
      icon: 'create-outline',
    },
    {
      title: 'Share With Others',
      description: 'Get responses via link or embed',
      icon: 'share-social-outline',
    },
    {
      title: 'Analyze Results',
      description: 'View responses and analytics',
      icon: 'bar-chart-outline',
    },
  ];

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      scrollRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('CreateForm');
    }
  };

  const handleSkip = () => {
    navigation.replace('CreateForm');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      >
        {steps.map((step, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.iconContainer}>
              <Ionicons name={step.icon} size={80} color="#2196F3" />
            </View>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {steps.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
              ]}
            />
          );
        })}
      </View>

      <View style={styles.footer}>
        <Button
          title={currentIndex === steps.length - 1 ? "Get Started" : "Next"}
          icon={
            currentIndex === steps.length - 1
              ? undefined
              : {
                  name: 'arrow-forward',
                  type: 'ionicon',
                  color: 'white',
                  size: 24,
                }
          }
          iconRight={currentIndex !== steps.length - 1}
          onPress={handleNext}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  iconContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#f5f5f5',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginHorizontal: 4,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    height: 50,
    borderRadius: 25,
  },
});

export default OnboardingScreen;