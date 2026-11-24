import { createNavigationContainerRef } from "@react-navigation/native";

// Lets code outside a screen (like the push-notification hook)
// navigate safely. Passed to <NavigationContainer ref={...}> in App.tsx.
export const navigationRef = createNavigationContainerRef<any>();
