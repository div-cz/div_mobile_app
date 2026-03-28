import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Profil' },
  { icon: 'heart-outline', label: 'Oblíbené' },
  { icon: 'time-outline', label: 'Historie' },
  { icon: 'star-outline', label: 'Hodnocení' },
  { icon: 'notifications-outline', label: 'Oznámení' },
  { icon: 'settings-outline', label: 'Nastavení' },
  { icon: 'information-circle-outline', label: 'O aplikaci' },
];

export default function ViceScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.group}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.item,
              index < MENU_ITEMS.length - 1 && styles.itemBorder,
            ]}
            activeOpacity={0.6}
          >
            <View style={styles.itemLeft}>
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={20} color={colors.accent} />
              </View>
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.outlineVariant} />
          </TouchableOpacity>
        ))}
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
    padding: 20,
    paddingBottom: 100,
  },
  group: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '40',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
  },
});
