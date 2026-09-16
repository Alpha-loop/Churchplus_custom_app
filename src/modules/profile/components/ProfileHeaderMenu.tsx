import { useState } from "react";

import {
  Menu,
  Divider,
} from "react-native-paper";

import {
  TouchableOpacity,
} from "react-native";

import {
  MoreVertical,
} from "lucide-react-native";

interface Props {
  onManageProfile: () => void;

  onDeleteAccount: () => void;
}

export default function ProfileOptionsMenu({
  onManageProfile,
  onDeleteAccount,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() =>
        setVisible(false)
      }
      anchor={
        <TouchableOpacity
          onPress={() =>
            setVisible(true)
          }
        >
          <MoreVertical
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      }
    >
      <Menu.Item
        title="Manage Profile"
        onPress={() => {
          setVisible(false);

          onManageProfile();
        }}
      />

      <Divider />

      <Menu.Item
        title="Delete Account"
        onPress={() => {
          setVisible(false);

          onDeleteAccount();
        }}
      />
    </Menu>
  );
}