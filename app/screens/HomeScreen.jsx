import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import HeroCard from '../components/HeroCard';
import MediaCard from '../components/MediaCard';
import { topMoviesApi } from '../services/mediaEndpoints';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BOOK_PLACEHOLDERS = [
  { id: '1', title: 'Emerald Archive', subtitle: 'Elena Vance • 2024' },
  { id: '2', title: 'Digital Logic', subtitle: 'Marcus Thorne • 2023' },
  { id: '3', title: "Herbalist's Tale", subtitle: 'Sarah Green • 2024' },
];

const GAME_PLACEHOLDERS = [
  { id: '1', title: 'Cyber Sprint 2099', subtitle: 'Action RPG' },
  { id: '2', title: 'Aether Realms', subtitle: 'Adventure' },
];

const SectionHeader = ({ label, labelColor, title }) => (
  <View style={styles.sectionHeader}>
    <View>
      <Text style={[styles.sectionLabel, { color: labelColor }]}>{label}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.7}>
      <Text style={[styles.viewAllText, { color: labelColor }]}>Zobrazit vše</Text>
      <MaterialIcons name="arrow-forward" size={14} color={labelColor} />
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    topMoviesApi.fetchMedia()
      .then(data => setMovies(data.results))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Carousel */}
      <View style={styles.heroSection}>
        {loading ? (
          <View style={styles.heroLoader}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            horizontal
            data={movies.slice(0, 3)}
            keyExtractor={item => item.indexid.toString()}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={SCREEN_WIDTH * 0.85 + 16}
            contentContainerStyle={styles.heroList}
            renderItem={({ item }) => (
              <HeroCard
                image={topMoviesApi.getImageUrl(item.img)}
                badge="Doporučený film"
                badgeColor={colors.primary + '33'}
                badgeTextColor={colors.primary}
                title={item.title}
                description={item.originaltitle}
              />
            )}
          />
        )}
      </View>

      {/* Filmy */}
      <View style={styles.section}>
        <SectionHeader label="Kino" labelColor={colors.primary} title="Nové & Trending filmy" />
        {loading ? (
          <ActivityIndicator color={colors.primary} style={styles.sectionLoader} />
        ) : (
          <FlatList
            horizontal
            data={movies}
            keyExtractor={item => item.indexid.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <MediaCard
                poster={topMoviesApi.getImageUrl(item.img)}
                title={item.title}
                year={item.releaseyear}
                rating={item.divrating}
              />
            )}
          />
        )}
      </View>

      {/* Knihy */}
      <View style={styles.section}>
        <SectionHeader label="Literatura" labelColor={colors.secondary} title="Nové & Trending knihy" />
        <FlatList
          horizontal
          data={BOOK_PLACEHOLDERS}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <MediaCard title={item.title} year={item.subtitle} />
          )}
        />
      </View>

      {/* Hry */}
      <View style={[styles.section, styles.lastSection]}>
        <SectionHeader label="Gaming" labelColor={colors.tertiary} title="Nové & Trending hry" />
        <FlatList
          horizontal
          data={GAME_PLACEHOLDERS}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <MediaCard title={item.title} year={item.subtitle} wide />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 100,
  },
  heroSection: {
    marginBottom: 32,
  },
  heroLoader: {
    height: SCREEN_WIDTH * 0.85 * (9 / 16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroList: {
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionLoader: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  horizontalList: {
    paddingHorizontal: 24,
    gap: 16,
  },
});
