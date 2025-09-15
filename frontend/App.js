import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // icons
import DailyVerse from './DailyVerse';
const Splash1 = require('./assets/splash-1.png');
const Splash2 = require('./assets/splash-2.png');
const Splash3 = require('./assets/splash-3.png');
const Splash4 = require('./assets/splash-4.png');
const Splash5 = require('./assets/splash-5.png');
const Splash6 = require('./assets/splash-6.png');

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section */}
        {/* <View style={styles.heroSection}>
          <Image 
            source={Splash1} 
            style={styles.splashImage} 
            resizeMode="contain"
            onError={(error) => console.log('Image load error:', error)}
            onLoad={() => console.log('Image loaded successfully')}
          /> 
          * <Text style={styles.subtitle}>Find your moment of tranquility</Text>
        </View> */}
        
        
        {/* Bento Grid Layout */}
        <View style={styles.bentoGrid}>
          <View style={styles.greetingWrapper}>
            <Ionicons name="sunny-outline" size={25} color="#F4B324" /> 
            <Text style={styles.greetingText}>  Good Morning, <Text style={styles.highlightedText}>Steven</Text></Text>
          </View>

          {/* Main Verse Card - Takes up more space */}
          <View style={styles.verseCard}>
            <DailyVerse />
          </View>
          
          {/* Secondary Cards */}
          <View style={styles.secondaryCard}>
            <Text style={styles.cardTitle}>Today's Reflection</Text>
            <Text style={styles.cardContent}>Take a moment to breathe and find peace in this verse.</Text>
          </View>
          
          <View style={styles.secondaryCard}>
            <Text style={styles.cardTitle}>Today's Exercise</Text>
            <Text style={styles.cardContent}>2 minutes of mindful breathing</Text>
          </View>
        </View>
        
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    paddingTop: height * 0.08,
    paddingHorizontal: 0,
    paddingBottom: 40,
    minHeight: height,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 20,
  },
  splashImage: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 0,
  },
  greetingWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 15,
  },
  greetingText: {
    color: '#d1feef',
    fontSize: 20,
    fontWeight: 600,
  },
  highlightedText: {
    color: '#F4B324',
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  bentoGrid: {
    gap: 15,
  },
  verseCard: {
    marginHorizontal: 16,
    backdropFilter: 'blur(20px)',
  },
  secondaryCard: {
    backgroundColor: 'rgba(49, 44, 44, 0.41)',
    borderRadius: 10,
    padding: 24,
    marginHorizontal: 16,
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  cardContent: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    fontWeight: '400',
  },
});
