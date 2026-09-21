import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuthStore } from "@/store/authStore";

import usePushNotifications from "@/modules/notifications/hooks/usePushNotifications";

// Auth screens — Modern's own, unchanged.
import LoginScreen from "@/screens/auth/LoginScreen";
import RegisterScreen from "@/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "@/screens/auth/ForgotPasswordScreen";
import VerifyOtpScreen from "@/screens/auth/VerifyOtpScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";

// Main shell + every screen it can navigate to.
import ModernMainTabNavigator from "@/navigation/ModernMainTabNavigator";
import ProfileScreen from "@/screens/ProfileScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import EditProfileScreen from "@/screens/EditProfileScreen";
import CommunityScreen from "@/screens/CommunityScreen";
import PostDetailScreen from "@/screens/PostDetailScreen";
import MessagesScreen from "@/screens/MessagesScreen";
import NewChatScreen from "@/screens/NewChatScreen";
import ChatScreen from "@/screens/ChatScreen";
import NotificationsScreen from "@/screens/NotificationsScreen";
import DevotionalsScreen from "@/screens/DevotionalsScreen";
import DevotionalDetailScreen from "@/screens/DevotionalDetailScreen";
import EventDetailsScreen from "@/screens/EventDetailsScreen";
import VideoDetailsScreen from "@/screens/VideoDetailsScreen";

// Real, layout-agnostic screens reused as-is (no Modern-styled
// version exists yet for these — same honesty rule as the main
// app: reuse the working thing rather than leave a dead end).
import ExternalUrlScreen from "@/shared/screens/ExternalUrlScreen";
import EventQRScannerScreen from "@/shared/screens/EventQRScanner";
import ConnectionProfileScreen from "@/shared/screens/ConnectionProfileScreen";
import BankAccountsScreen from "@/shared/screens/BankAccounts";
import OnlineGivingScreen from "@/shared/screens/OnlineGiving";
import PledgesAndDonationsScreen from "@/shared/screens/Pledges";

const Stack = createNativeStackNavigator();

// No Join/ChurchDetails/AutoJoin here at all — the tenant is
// fixed at the config level (see index.ts's bootstrap), and this
// navigator only ever has two states: not logged in yet, or
// logged in. There's also no MainRouter/ProfileRouter/etc. layout
// branching — every screen below is Modern's, directly, since
// there's only one layout in this build.
export default function AppNavigator() {
  const accessToken = useAuthStore(
    state => state.accessToken
  );

  const isGuest = useAuthStore(
    state => state.isGuest
  );

  const canAccessMain =
    !!accessToken || isGuest;

  // No-ops internally until someone is actually signed in (a
  // guest has no userId to register a token against), so this
  // is safe to call unconditionally here rather than needing its
  // own branch.
  usePushNotifications();

  return (
    <Stack.Navigator
      initialRouteName={
        canAccessMain
          ? "Main"
          : "Onboarding"
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      {!canAccessMain ? (
        <>
          <Stack.Screen
            name="Onboarding"
            component={
              OnboardingScreen
            }
          />

          <Stack.Screen
            name="Login"
            component={
              LoginScreen
            }
          />

          <Stack.Screen
            name="Register"
            component={
              RegisterScreen
            }
          />

          <Stack.Screen
            name="ForgotPassword"
            component={
              ForgotPasswordScreen
            }
          />

          <Stack.Screen
            name="VerifyOtp"
            component={
              VerifyOtpScreen
            }
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={
              ModernMainTabNavigator
            }
          />

          <Stack.Screen
            name="Profile"
            component={
              ProfileScreen
            }
          />

          <Stack.Screen
            name="Settings"
            component={
              SettingsScreen
            }
          />

          <Stack.Screen
            name="ManageProfile"
            component={
              EditProfileScreen
            }
          />

          <Stack.Screen
            name="Community"
            component={
              CommunityScreen
            }
          />

          <Stack.Screen
            name="FeedsDetail"
            component={
              PostDetailScreen
            }
          />

          <Stack.Screen
            name="Messages"
            component={
              MessagesScreen
            }
          />

          <Stack.Screen
            name="NewChat"
            component={
              NewChatScreen
            }
          />

          <Stack.Screen
            name="UserChat"
            component={
              ChatScreen
            }
          />

          <Stack.Screen
            name="Notifications"
            component={
              NotificationsScreen
            }
          />

          <Stack.Screen
            name="DevotionalLibrary"
            component={
              DevotionalsScreen
            }
          />

          <Stack.Screen
            name="TodayDevotional"
            component={
              DevotionalDetailScreen
            }
          />

          <Stack.Screen
            name="EventDetails"
            component={
              EventDetailsScreen
            }
          />

          <Stack.Screen
            name="ViewVideoDetails"
            component={
              VideoDetailsScreen
            }
          />

          <Stack.Screen
            name="ExternalUrl"
            component={
              ExternalUrlScreen
            }
          />

          <Stack.Screen
            name="EventQRScanner"
            component={
              EventQRScannerScreen
            }
          />

          <Stack.Screen
            name="ConnectionProfile"
            component={
              ConnectionProfileScreen
            }
          />

          <Stack.Screen
            name="BankAccount"
            component={
              BankAccountsScreen
            }
          />

          <Stack.Screen
            name="OnlineGive"
            component={
              OnlineGivingScreen
            }
          />

          <Stack.Screen
            name="PledgesAndDonation"
            component={
              PledgesAndDonationsScreen
            }
          />
        </>
      )}
    </Stack.Navigator>
  );
}