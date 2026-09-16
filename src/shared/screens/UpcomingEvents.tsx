import AppHeader
from "@/shared/AppHeader";

import AppScreenLayout
from "@/shared/AppScreenLayout";

import EventCard
from "@/modules/events/components/EventCard";

// import EventsHeader
// from "@/modules/events/components/EventsHeader";

import EventsEmptyState
from "@/modules/events/components/EventsEmptyState";

import EventsLoading
from "@/modules/events/components/EventsLoading";

import useUpcomingEvents
from "@/modules/events/hooks/useUpcomingEvents";
import { getEvents } from "@/modules/events/service/event.services";

import {
  useNavigation,
} from "@react-navigation/native";
import { View } from "react-native";

export default function UpcomingEventsScreen({
  closeModal,
}: {
  closeModal?: () => void;
}) {
  const navigation =
    useNavigation<any>();

  const {
    loading,
    events,
  } =
    useUpcomingEvents();

  if (loading) {
    return (
      <EventsLoading />
    );
  }

  

  return (
    <>
      {/* <AppHeader
        title="Events"
        onBackPress={() =>
          navigation.goBack()
        }
      /> */}

      <View style={{flex: 1, backgroundColor: '#F8F9FC', padding: 15}}>
        {events.length >
        0 ? (
          <>
            {/* <EventsHeader /> */}

            {events.map(
              event => (
                <EventCard
                  key={
                    event.id
                  }
                  event={
                    event
                  }
                  onPress={
                    event =>
                      navigation.navigate(
                        "EventDetails",
                        {
                          event,
                        }
                      )
                  }
                />
              )
            )}
          </>
        ) : (
          <EventsEmptyState />
        )}
      </View>
    </>
  );
}