import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DailyVerse from './DailyVerse';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.title}>Daily Peace</Text>
            <Text style={styles.subtitle}>Find your moment of tranquility</Text>
          </View>
          
          {/* Bento Grid Layout */}
          <View style={styles.bentoGrid}>
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
              <Text style={styles.cardTitle}>Peace Timer</Text>
              <Text style={styles.cardContent}>5 minutes of mindful breathing</Text>
            </View>
          </View>
          
          <StatusBar style="light" />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: height * 0.08,
    paddingHorizontal: 24,
    paddingBottom: 40,
    minHeight: height,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  bentoGrid: {
    gap: 20,
  },
  verseCard: {
    marginBottom: 20,
  },
  secondaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
