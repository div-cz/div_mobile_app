import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';

import MediaCard from './app/components/MediaCard'
import { topMoviesApi } from './app/services/mediaEndpoints';

const { width } = Dimensions.get('window')

const divIcon = require('./app/assets/div-logo-color-24x24.png');

const Div = () => <View><Text>Div - úvodní stránka</Text></View>
const Knihy = () => <View><Text>Knihy</Text></View>
function Hry() {
  return (
    <MediaCard 
      title="V hlavě 2"
      year="2024"
      rating="79"
    />
  )
}

// Komponenta pro filmy (MoviesList je součástí této záložky)
function Filmy() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieList() {
      try {
        const data = await topMoviesApi.fetchMedia();
        setMovies(data.results);
      } catch (error) {
        console.error("Chyba při načítání filmů:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieList();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>TOP Filmy</Text>
    </View>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={movies}
      keyExtractor={(media) => media.indexid.toString()}
      contentContainerStyle={styles.flatListContent}
      renderItem={({ item }) => (
        <MediaCard 
          poster={topMoviesApi.getImageUrl(item.img)}
          title={item.title}
          year={item.divrating}
          rating={item.divrating}
        />
        /*{ <View style={styles.movieItem}>
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2//huVnXS9Qg8G6rB68N5YXGIo6Mtz.jpg` }} 
            style={styles.poster} 
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.releaseyear}</Text>
        </View> }*/
      )}
    />
    </View>
  );
}

const GradientHeader = () => (
  <LinearGradient 
    colors={['#340000', '#9e2a20']} 
    style={{ flex: 1 }} 
    start={{ x: 0, y: 0 }} 
    end={{ x: 1, y: 0 }} 
  />
);
// Vytvoření záložek (Tab.Navigator)
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      header: () => <GradientHeader />,
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Div.cz') {
          return (
            <Image 
              source={divIcon}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.7
              }}
            />
          );
        }
        let iconName;
        if (route.name === 'Filmy') {
          iconName = focused ? 'film' : 'film-outline';
        } else if (route.name === 'Knihy') {
          iconName = focused ? 'book' : 'book-outline';
        } else if (route.name === 'Hry') {
          iconName = focused ? 'game-controller' : 'game-controller-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Div.cz" component={Div} />
    <Tab.Screen name="Filmy" component={Filmy} />
    <Tab.Screen name="Knihy" component={Knihy} />
    <Tab.Screen name="Hry" component={Hry} />
  </Tab.Navigator>
);

// Hlavní komponenta aplikace
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <TabNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContent: {
    top: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    top: 10,
    left: 10,
  },
  movieItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  }
});