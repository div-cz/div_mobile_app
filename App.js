import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './app/screens/HomeScreen';
import ViceScreen from './app/screens/ViceScreen';
import { colors } from './app/theme/colors';

const divIcon = require('./app/assets/div-logo-color-24x24.png');

const HeaderLeft = () => (
  <View style={styles.headerLeft}>
    <Image source={divIcon} style={styles.headerLogo} />
    <Text style={styles.headerTitle}>Div.cz</Text>
  </View>
);

const HeaderRight = () => (
  <View style={styles.headerRight}>
    <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
      <Ionicons name="search-outline" size={22} color="#ffffff" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
      <Ionicons name="person-circle-outline" size={24} color="#ffffff" />
    </TouchableOpacity>
  </View>
);

const Filmy = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Filmy</Text>
  </View>
);
const Knihy = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Knihy</Text>
  </View>
);
const Hry = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Hry</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerStyle: {
        backgroundColor: colors.surfaceContainerLow,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => <HeaderLeft />,
      headerTitle: () => null,
      headerRight: () => <HeaderRight />,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: 'rgba(255,255,255,0.06)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: 70,
        paddingBottom: 12,
        paddingTop: 10,
      },
      tabBarActiveTintColor: colors.brand,
      tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        marginTop: 2,
      },
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Div') {
          return (
            <View style={[
              styles.divTabIcon,
              { backgroundColor: focused ? colors.surfaceContainerHigh : 'transparent' },
            ]}>
              <Image
                source={divIcon}
                style={{ width: size + 4, height: size + 4, opacity: focused ? 1 : 0.4 }}
              />
            </View>
          );
        }
        const icons = {
          Filmy: focused ? 'film' : 'film-outline',
          Knihy: focused ? 'library' : 'library-outline',
          Hry: focused ? 'game-controller' : 'game-controller-outline',
          Více: focused ? 'ellipsis-horizontal-circle' : 'ellipsis-horizontal-circle-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Filmy" component={Filmy} options={{ tabBarActiveTintColor: colors.primary }} />
    <Tab.Screen name="Knihy" component={Knihy} options={{ tabBarActiveTintColor: colors.secondary }} />
    <Tab.Screen name="Div" component={HomeScreen} options={{ tabBarActiveTintColor: colors.brand }} />
    <Tab.Screen name="Hry" component={Hry} options={{ tabBarActiveTintColor: colors.tertiary }} />
    <Tab.Screen name="Více" component={ViceScreen} options={{ tabBarActiveTintColor: colors.accent }} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <TabNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 16,
  },
  headerLogo: {
    width: 26,
    height: 26,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  headerBtn: {
    padding: 8,
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.onSurfaceVariant,
    fontSize: 16,
    fontWeight: '600',
  },
  divTabIcon: {
    borderRadius: 12,
    padding: 4,
  },
});
