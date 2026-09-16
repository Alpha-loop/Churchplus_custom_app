import {
  useRef,
  useState,
} from "react";

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ArrowRight,
  ChevronLeft,
  Users,
  HandHeart,
} from "lucide-react-native";

import {
  onboardingSlides,
  OnboardingSlide,
} from "../data/onboardingSlides";

export default function ModernOnboardingScreen({
  navigation,
}: any) {
  const { width } =
    useWindowDimensions();

  const flatListRef =
    useRef<FlatList>(null);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const isLastSlide =
    currentIndex ===
    onboardingSlides.length - 1;

  const goToAuth = () => {
    // Was { name: "Auth" } — that nested wrapper only exists in
    // the main faithConnect app. This app's AppNavigator.tsx
    // registers "Login" directly, flat, with no "Auth" sub-
    // navigator around it — same fix as useRequireAuth.ts.
    navigation.reset({
      index: 0,

      routes: [
        { name: "Login" },
      ],
    });
  };

  const goToSlide = (
    index: number
  ) => {
    flatListRef.current?.scrollToIndex(
      {
        index,
        animated: true,
      }
    );

    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (isLastSlide) {
      goToAuth();

      return;
    }

    goToSlide(
      currentIndex + 1
    );
  };

  const renderItem = ({
    item,
  }: {
    item: OnboardingSlide;
  }) => (
    <View
      style={[
        styles.slide,
        { width },
      ]}
    >
      <View
        style={
          styles.imageWrap
        }
      >
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />

        {item.tag ? (
          <View
            style={styles.tag}
          >
            {item.tag.icon ===
            "users" ? (
              <Users
                size={14}
                color="#1D3AA8"
              />
            ) : null}

            <Text
              style={
                styles.tagText
              }
            >
              {item.tag.label}
            </Text>
          </View>
        ) : null}

        {item.centerIcon ? (
          <View
            style={
              styles.centerIconWrap
            }
          >
            <HandHeart
              size={26}
              color="#1D3AA8"
            />
          </View>
        ) : null}
      </View>

      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text
        style={
          styles.description
        }
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View
        style={styles.topBar}
      >
        {isLastSlide ? (
          <TouchableOpacity
            onPress={() =>
              goToSlide(
                currentIndex - 1
              )
            }
            style={
              styles.backRow
            }
          >
            <ChevronLeft
              size={18}
              color="rgba(17, 17, 17, 0.7)"
            />

            <Text
              style={
                styles.backText
              }
            >
              Back
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {!isLastSlide ? (
          <TouchableOpacity
            onPress={goToAuth}
          >
            <Text
              style={
                styles.skipText
              }
            >
              Skip
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={
          false
        }
        keyExtractor={item =>
          item.id
        }
        renderItem={renderItem}
        onMomentumScrollEnd={event => {
          const index =
            Math.round(
              event
                .nativeEvent
                .contentOffset
                .x / width
            );

          setCurrentIndex(index);
        }}
      />

      <View
        style={
          styles.dotsContainer
        }
      >
        {onboardingSlides.map(
          (_, index) => (
            <View
              key={index}
              style={[
                styles.dot,

                currentIndex ===
                  index &&
                  styles.activeDot,
              ]}
            />
          )
        )}
      </View>

      <View
        style={
          styles.bottomArea
        }
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          style={styles.button}
        >
          <Text
            style={
              styles.buttonText
            }
          >
            {isLastSlide
              ? "GET STARTED"
              : "NEXT"}
          </Text>

          <ArrowRight
            size={18}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {isLastSlide ? (
          <Text
            style={
              styles.terms
            }
          >
            By continuing, you
            agree to our Terms
            of Service.
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFFFF",
  },

  topBar: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    paddingHorizontal: 20,

    paddingTop: 8,

    height: 40,
  },

  skipText: {
    fontSize: 13,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.6)",

    letterSpacing: 0.5,
  },

  backRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 2,
  },

  backText: {
    fontSize: 13,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.7)",
  },

  slide: {
    paddingHorizontal: 24,

    paddingTop: 12,
  },

  imageWrap: {
    width: "100%",

    height: 380,

    borderRadius: 20,

    overflow: "hidden",

    position: "relative",

    marginBottom: 28,
  },

  image: {
    width: "100%",

    height: "100%",
  },

  tag: {
    position: "absolute",

    left: 14,

    bottom: 14,

    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    paddingHorizontal: 12,

    paddingVertical: 8,
  },

  tagText: {
    fontSize: 13,

    fontWeight: "700",

    color: "#1D3AA8",
  },

  centerIconWrap: {
    position: "absolute",

    alignSelf: "center",

    bottom: 24,

    width: 52,

    height: 52,

    borderRadius: 26,

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",
  },

  title: {
    fontSize: 28,

    fontWeight: "800",

    color: "rgba(17, 17, 17, 0.92)",

    textAlign: "center",
  },

  description: {
    fontSize: 15,

    color: "rgba(0,0,0,0.55)",

    textAlign: "center",

    lineHeight: 22,

    marginTop: 10,

    paddingHorizontal: 8,
  },

  dotsContainer: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 6,

    marginTop: 12,
  },

  dot: {
    width: 7,

    height: 7,

    borderRadius: 4,

    backgroundColor: "rgba(0,0,0,0.15)",
  },

  activeDot: {
    width: 22,

    backgroundColor: "#1D3AA8",
  },

  bottomArea: {
    paddingHorizontal: 24,

    paddingTop: 18,

    paddingBottom: 20,
  },

  button: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 10,

    backgroundColor: "#1D3AA8",

    borderRadius: 26,

    paddingVertical: 16,
  },

  buttonText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 14,

    letterSpacing: 0.5,
  },

  terms: {
    fontSize: 12,

    color: "rgba(0,0,0,0.45)",

    textAlign: "center",

    marginTop: 12,
  },
});