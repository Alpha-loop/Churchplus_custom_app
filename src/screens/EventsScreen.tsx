import {
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useUpcomingEvents from "@/modules/events/hooks/useUpcomingEvents";

import EventCategoryFilter, {
  ALL_EVENTS,
} from "../components/events/EventCategoryFilter";

import ModernEventCard from "../components/events/ModernEventCard";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernEventsScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    events,
    loading,
  } =
    useUpcomingEvents();

  const [
    activeCategory,
    setActiveCategory,
  ] = useState(ALL_EVENTS);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          events
            .map(
              e =>
                e.eventTypeName
            )
            .filter(
              (
                name
              ): name is string =>
                Boolean(name)
            )
        )
      ),
    [events]
  );

  const filteredEvents =
    activeCategory ===
    ALL_EVENTS
      ? events
      : events.filter(
          e =>
            e.eventTypeName ===
            activeCategory
        );

  if (loading) {
    return (
      <View
        style={[
          styles.loadingWrap,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <Text
        style={[
          styles.title,
          { color: colors.textPrimary },
        ]}
      >
        Upcoming Events
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colors.textSecondary },
        ]}
      >
        Join our community in
        prayer, fellowship, and
        service. Find a digital
        sanctuary in our upcoming
        gatherings.
      </Text>

      {categories.length >
      0 ? (
        <EventCategoryFilter
          categories={
            categories
          }
          active={
            activeCategory
          }
          onChange={
            setActiveCategory
          }
        />
      ) : null}

      <View
        style={styles.list}
      >
        {filteredEvents.length >
        0 ? (
          filteredEvents.map(
            event => (
              <ModernEventCard
                key={event.id}
                event={event}
                onPress={() =>
                  navigation.navigate(
                    "EventDetails",
                    {
                      event,
                    }
                  )
                }
                onAddToCalendar={() => {
                  console.log(
                    "Add to calendar pressed",
                    event.name
                  );
                }}
              />
            )
          )
        ) : (
          <Text
            style={[
              styles.emptyText,
              { color: colors.textMuted },
            ]}
          >
            {activeCategory ===
            ALL_EVENTS
              ? "No upcoming events right now — check back soon."
              : `No upcoming ${activeCategory} events right now.`}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
  },

  loadingWrap: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  title: {
    fontSize: 26,

    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,

    lineHeight: 20,

    marginTop: 8,

    marginBottom: 18,
  },

  list: {
    marginTop: 18,
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    paddingVertical: 24,
  },
});