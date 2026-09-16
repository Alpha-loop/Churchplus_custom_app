import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  Home,
  PlayCircle,
  Calendar,
  Gift,
} from "lucide-react-native";

// Home is the only tab with its own Faith/Socials split — see
// ModernHomeTab.tsx.
import ModernHomeTab from "./ModernHomeTab";

import ModernMediaScreen from "../screens/MediaScreen";

import ModernEventsScreen from "../screens/EventsScreen";

import ModernScreenWithHeader from "../components/ModernScreenWithHeader";

import ModernGivingScreen from "../screens/GivingScreen";

import { useTheme } from "@/theme/ThemeContext";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab =
  createBottomTabNavigator();

// Small wrappers so Media/Events/Giving each get the standard
// header without repeating ModernScreenWithHeader's JSX three
// times, while still forwarding navigation/route props through.
function ModernEventsTab(
  props: any
) {
  return (
    <ModernScreenWithHeader>
      <ModernEventsScreen
        {...props}
      />
    </ModernScreenWithHeader>
  );
}

function ModernGivingTab(
  props: any
) {
  return (
    <ModernScreenWithHeader>
      <ModernGivingScreen
        {...props}
      />
    </ModernScreenWithHeader>
  );
}

function ModernMediaTab(
  props: any
) {
  return (
    <ModernScreenWithHeader>
      <ModernMediaScreen
        {...props}
      />
    </ModernScreenWithHeader>
  );
}

export default function ModernMainTabNavigator() {
  const { colors } = useTheme();

  // Was a fixed height/paddingBottom with no safe-area awareness
  // at all — on any device with a home indicator instead of a
  // physical home button, that squeezed the tab bar's actual
  // content right up against (or under) the gesture area, since
  // nothing here ever accounted for insets.bottom. This adds the
  // real device inset on top of a fixed baseline padding, so the
  // icons/labels always sit clear of it regardless of device.
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }) => ({
        headerShown: false,

        tabBarActiveTintColor:
          colors.primary,

        tabBarInactiveTintColor:
          colors.textMuted,

        tabBarStyle: {
          backgroundColor:
            colors.surface,

          borderTopColor:
            colors.border,

          height: 60 + insets.bottom,

          paddingBottom:
            6 + insets.bottom,

          paddingTop: 6,
        },

        tabBarLabelStyle: {
          fontSize: 11,

          fontWeight: "600",
        },

        tabBarIcon: ({
          color,
        }) => {
          const size = 22;

          if (
            route.name ===
            "Home"
          ) {
            return (
              <Home
                size={size}
                color={color}
              />
            );
          }

          if (
            route.name ===
            "Media"
          ) {
            return (
              <PlayCircle
                size={size}
                color={color}
              />
            );
          }

          if (
            route.name ===
            "Events"
          ) {
            return (
              <Calendar
                size={size}
                color={color}
              />
            );
          }

          if (
            route.name ===
            "Giving"
          ) {
            return (
              <Gift
                size={size}
                color={color}
              />
            );
          }

          return null;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={
          ModernHomeTab
        }
      />

      <Tab.Screen
        name="Media"
        component={
          ModernMediaTab
        }
      />

      <Tab.Screen
        name="Events"
        component={
          ModernEventsTab
        }
      />

      <Tab.Screen
        name="Giving"
        component={
          ModernGivingTab
        }
      />
    </Tab.Navigator>
  );
}