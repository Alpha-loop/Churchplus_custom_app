import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppCard from "@/shared/AppCard";

import {
  HandsPraying,
  ChurchIcon,
  Megaphone,
  UserPlus,
  NoteIcon,
} from "../../../assets/img/icons";

interface FormItem {
  id?: string;
  name: string;
  [key: string]: any;
}

interface ActionCardsProps {
  prayer?: FormItem;

  commitToChrist?: FormItem;

  testimony?: FormItem;

  iamNew?: FormItem;

  appointment?: FormItem;

  onPrayerPress: (form: FormItem) => void;

  onCommitPress: (form: FormItem) => void;

  onTestimonyPress: (form: FormItem) => void;

  onIamNewPress: (form: FormItem) => void;

  onAppointmentPress: (form: FormItem) => void;
}

interface ActionItem {
  name: string;

  subtitle: string;

  theme: string;

  enabled: boolean;

  form?: FormItem;
}



export default function ActionCards({
  prayer,
  commitToChrist,
  testimony,
  iamNew,
  appointment,

  onPrayerPress,
  onCommitPress,
  onTestimonyPress,
  onIamNewPress,
  onAppointmentPress,
}: ActionCardsProps) {

  const actions: ActionItem[] = [
    {
      name: "Prayer Request",
      subtitle: "We'd love to pray for you",
      theme: "rgba(254, 211, 102, 1)",
      enabled: !!prayer,
      form: prayer,
    },
    {
      name: "Commit to Christ",
      subtitle: "Let others be motivated",
      theme: "rgba(128, 47, 163, 1)",
      enabled: !!commitToChrist,
      form: commitToChrist,
    },
    {
      name: "Share Testimony",
      subtitle: "Let others be motivated",
      theme: "rgba(247, 105, 118, 1)",
      enabled: !!testimony,
      form: testimony,
    },
    {
      name: "I Am New",
      subtitle: "Let us treat you as a beloved guest",
      theme: "rgba(93, 177, 254, 1)",
      enabled: !!iamNew,
      form: iamNew,
    },
    {
      name: "Book Appointment",
      subtitle: "We'd love to hear from you",
      theme: "rgba(23, 254, 142, 1)",
      enabled: !!appointment,
      form: appointment,
    },
  ];
  
  const handlePress = (item: ActionItem) => {
    if (!item.form) return;

    switch (item.name) {
      case "Prayer Request":
        onPrayerPress(item.form);
        break;

      case "Commit to Christ":
        onCommitPress(item.form);
        break;

      case "Share Testimony":
        onTestimonyPress(item.form);
        break;

      case "I Am New":
        onIamNewPress(item.form);
        break;

      case "Book Appointment":
        onAppointmentPress(item.form);
        break;
    }
  };

  

  const renderIcon = (
    index: number,
    backgroundColor: string
  ) => {
    return (
      <View
        style={[
          styles.iconContainer,

          {
            backgroundColor,
          },
        ]}
      >
        {index === 0 ? (
          <HandsPraying
            width={20}
            height={20}
            color="#FFFFFF"
            />
        ) : index === 1 ? (
          <ChurchIcon
            width={20}
            height={20}
            color="#FFFFFF"
          />
        ) : index === 2 ? (
          <Megaphone />
        ) : index === 3 ? (
          <UserPlus />
        ) : (
          <NoteIcon />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={actions}
        keyExtractor={(
          item
        ) => item.name}
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
        renderItem={({
          item,
          index,
        }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!item.enabled}
            style={{
              opacity: item.enabled ? 1 : 0.4,
            }}
            onPress={() => handlePress(item)}
          >
            <AppCard
              style={
                styles.card
              }
            >
              {renderIcon(
                index,
                item.theme
              )}

              <View>
                <Text
                  style={
                    styles.title
                  }
                >
                  {item.name}
                </Text>

                <Text
                  style={
                    styles.subtitle
                  }
                >
                  {item.subtitle}
                </Text>
              </View>
            </AppCard>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 20,
      paddingVertical: 10,
    },

    list: {
      gap: 10,
    },

    card: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 10,

      paddingVertical: 10,

      borderRadius: 10,

      marginBottom: 2,
    },

    iconContainer: {
      width: 35,

      height: 35,

      borderRadius: 20,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    title: {
      fontSize: 12,

      fontWeight: "700",

      color:
        "rgba(0,0,0,0.8)",
    },

    subtitle: {
      fontSize: 11,

      color:
        "rgba(0,0,0,0.7)",

      marginTop: 2,
    },
  });