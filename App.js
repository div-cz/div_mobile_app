import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';


export default function App() {
  return (
    <NavigationContainer>
        <TabNavigator></TabNavigator>
    </NavigationContainer>
  );
}

const divIcon = require('./app/assets/div-logo-color-24x24.png')
const Div = () => <View><Text>Div.cz</Text></View>
const Filmy = () => <View><Text>Filmy</Text></View>
const Knihy = () => <View><Text>Knihy</Text></View>
const Hry = () => <View><Text>Hry</Text></View>

const Tab = createBottomTabNavigator()
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        // Pro tab Div.cz použijeme vlastní obrázek
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

        // Pro ostatní taby použijeme Ionicons
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
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
