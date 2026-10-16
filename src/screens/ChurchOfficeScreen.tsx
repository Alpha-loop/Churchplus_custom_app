import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  ChevronLeft,
  Mail,
  Phone,
} from "lucide-react-native";

import useChurchOffice from "@/modules/churchOffice/hooks/useChurchOffice";

import { useTheme } from "@/theme/ThemeContext";

// Accent for the line under each title — fixed (not a theme
// token) because it sits on top of a photo.
const ACCENT = "#FACC15";

export default function ChurchOfficeScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    items,
    phone,
    email,
    churchName,
    openItem,
    call,
    sendEmail,
  } = useChurchOffice(navigation);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.topBar,
          { backgroundColor: colors.surface },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            { color: colors.textPrimary },
          ]}
        >
          Church Office
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text
          style={[
            styles.heading,
            { color: colors.textPrimary },
          ]}
        >
          How can we help?
        </Text>

        <Text
          style={[
            styles.subheading,
            { color: colors.textSecondary },
          ]}
        >
          Reach {churchName || "the church"}{" "}
          directly — pick an option below.
        </Text>

        {phone || email ? (
          <View style={styles.contactRow}>
            {phone ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={call}
                style={[
                  styles.contactPill,
                  { backgroundColor: colors.primaryMuted },
                ]}
              >
                <Phone
                  size={16}
                  color={colors.primary}
                />

                <Text
                  style={[
                    styles.contactText,
                    { color: colors.primary },
                  ]}
                >
                  Call
                </Text>
              </TouchableOpacity>
            ) : null}

            {email ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={sendEmail}
                style={[
                  styles.contactPill,
                  { backgroundColor: colors.primaryMuted },
                ]}
              >
                <Mail
                  size={16}
                  color={colors.primary}
                />

                <Text
                  style={[
                    styles.contactText,
                    { color: colors.primary },
                  ]}
                >
                  Email
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}

        {items.length === 0 ? (
          <Text
            style={[
              styles.empty,
              { color: colors.textMuted },
            ]}
          >
            Nothing has been set up here
            yet.
          </Text>
        ) : (
          items.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() =>
                openItem(item)
              }
              style={[
                styles.card,
                { backgroundColor: colors.primary },
              ]}
            >
              {item.imageUrl ? (
                <Image
                  key={item.imageUrl}
                  source={{
                    uri: item.imageUrl,
                  }}
                  cachePolicy="memory-disk"
                  contentFit="cover"
                  transition={150}
                  style={
                    StyleSheet.absoluteFill
                  }
                />
              ) : null}

              {/* Keeps white text readable on any photo. */}
              <View
                style={[
                  StyleSheet.absoluteFill,
                  styles.shade,
                ]}
              />

              <Text
                style={styles.cardTitle}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <View
                style={styles.underline}
              />

              <Text
                style={styles.cardSubtitle}
              >
                {item.subtitle}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 14,
  },

  topBarTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
  },

  subheading: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 16,
  },

  contactRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  contactPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  contactText: {
    fontSize: 14,
    fontWeight: "700",
  },

  card: {
    height: 200,
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 14,
  },

  shade: {
    backgroundColor: "rgba(0,0,0,0.38)",
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },

  underline: {
    width: 120,
    height: 3,
    borderRadius: 2,
    backgroundColor: ACCENT,
    marginTop: 8,
    marginBottom: 8,
  },

  cardSubtitle: {
    color: "#FFFFFF",
    fontSize: 13,
    letterSpacing: 1.6,
    fontWeight: "500",
  },

  empty: {
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 30,
  },
});
