import {
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";

import { useChurchStore } from "@/store/churchStore";

import ModernHeader from "../components/ModernHeader";

import ModernHomeScreen from "../screens/HomeScreen";

// Real discovery/connect screen — deliberately NOT reusing
// Classic's SocialTabs here. SocialTabs is its own
// createBottomTabNavigator() with 4 sub-tabs (Home/Messages/
// Connections/Notifications), which would give Modern a second,
// nested bottom tab bar — explicitly not wanted. Modern is meant
// to have exactly one bottom tab bar (ModernMainTabNavigator).
// Messages/Connections/Notifications don't have a Modern home yet
// — flagged in the response, not guessed at here.
import ModernSocialsScreen from "../screens/SocialsScreen";

import { useTheme } from "@/theme/ThemeContext";

const Tab =
  createMaterialTopTabNavigator();

// Only the Home bottom tab has this Faith/Socials split — Media,
// Events, and Giving each just get the header directly (see
// ModernScreenWithHeader.tsx), no top tabs above them.
export default function ModernHomeTab() {
  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const { colors } = useTheme();

  return (
    <>
      <ModernHeader
        churchName={
          fullProfile?.churchName
        }
        avatarUrl={
          fullProfile?.logoUrl
        }
      />

      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,

          tabBarStyle: {
            backgroundColor:
              colors.surface,

            elevation: 0,

            shadowOpacity: 0,
          },

          tabBarActiveTintColor:
            colors.primary,

          tabBarInactiveTintColor:
            colors.textMuted,

          tabBarLabelStyle: {
            fontWeight: "700",

            textTransform:
              "none",

            fontSize: 14,
          },

          tabBarIndicatorStyle: {
            backgroundColor:
              colors.primary,

            height: 2,
          },

          sceneStyle: {
            backgroundColor:
              colors.background,
          },
        }}
      >
        <Tab.Screen
          name="Faith"
          component={
            ModernHomeScreen
          }
          options={{
            tabBarLabel:
              "Faith",
          }}
        />

        <Tab.Screen
          name="Socials"
          component={
            ModernSocialsScreen
          }
        />
      </Tab.Navigator>
    </>
  );
}