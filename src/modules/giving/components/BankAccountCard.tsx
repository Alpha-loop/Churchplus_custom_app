import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Clipboard
from "expo-clipboard";

import {
  CopyIcon,
} from "@/assets/img/icons";

import {
  BankAccount,
} from "../types/giving.types";

interface Props {
  bank: BankAccount;
}

export default function BankAccountCard({
  bank,
}: Props) {
  const copyAccount =
    async () => {
      await Clipboard.setStringAsync(
        bank.accountNumber
      );
    };

  return (
    <View style={styles.card}>
      <View
        style={styles.top}
      >
        {bank.bankLogoSource ? (
          <Image
            source={
              bank.bankLogoSource
            }
            style={
              styles.logo
            }
          />
        ) : null}

        <Text
          style={
            styles.bankName
          }
        >
          {bank.bankName}
        </Text>
      </View>

      <View
        style={
          styles.accountRow
        }
      >
        <Text
          style={
            styles.accountNumber
          }
        >
          {
            bank.accountNumber
          }
        </Text>

        <TouchableOpacity
          onPress={
            copyAccount
          }
        >
          <CopyIcon
            size={17}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={
          styles.accountName
        }
      >
        {bank.accountName}
      </Text>

      {!!bank.description && (
        <Text
          style={
            styles.description
          }
        >
          {
            bank.description
          }
        </Text>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#D9D9D94D",

      borderRadius:
        15,

      padding: 15,

      marginBottom:
        15,

      borderWidth: 1,

      borderColor:
        "rgba(0,0,0,0.1)",
    },

    top: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 8,
    },

    logo: {
      width: 30,
      height: 30,
    },

    bankName: {
      fontSize: 13,
      fontWeight:
        "600",
    },

    accountRow: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      marginTop: 12,
    },

    accountNumber: {
      fontSize: 18,

      fontWeight:
        "700",
    },

    accountName: {
      marginTop: 6,

      fontWeight:
        "600",
    },

    description: {
      marginTop: 10,
    },
  });