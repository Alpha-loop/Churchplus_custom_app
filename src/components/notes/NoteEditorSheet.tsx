import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useTheme } from "@/theme/ThemeContext";

export interface NoteEditorHandle {
  // contextLabel is shown at the top of the sheet (e.g. "John
  // 3") so it's clear what the note being written is attached
  // to; existingContent pre-fills the sheet when editing a note
  // that already exists rather than always starting blank.
  open: (params: {
    contextLabel?: string;

    existingContent?: string;

    onSave: (
      content: string
    ) => void;
  }) => void;
}

const NoteEditorSheet = forwardRef<
  NoteEditorHandle,
  {}
>((_props, ref) => {
  const { colors } = useTheme();

  const sheetRef =
    useRef<BottomSheetModal>(
      null
    );

  const snapPoints = useMemo(
    () => ["60%"],
    []
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const [
    contextLabel,
    setContextLabel,
  ] = useState<
    string | undefined
  >(undefined);

  const [
    content,
    setContent,
  ] = useState("");

  const saveHandlerRef =
    useRef<
      (content: string) => void
    >(() => {});

  useImperativeHandle(
    ref,
    () => ({
      open: ({
        contextLabel: label,
        existingContent,
        onSave,
      }) => {
        setContextLabel(label);

        setContent(
          existingContent ?? ""
        );

        saveHandlerRef.current =
          onSave;

        sheetRef.current?.present();
      },
    }),
    []
  );

  const handleSave = () => {
    if (!content.trim()) {
      return;
    }

    saveHandlerRef.current(
      content.trim()
    );

    sheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      backdropComponent={
        renderBackdrop
      }
      enablePanDownToClose
      keyboardBehavior="extend"
      backgroundStyle={{
        backgroundColor: colors.surface,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.border,
      }}
    >
      <BottomSheetView
        style={styles.container}
      >
        <View
          style={
            styles.headerRow
          }
        >
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: colors.textPrimary },
            ]}
          >
            {contextLabel
              ? `Note — ${contextLabel}`
              : "New Note"}
          </Text>

          <TouchableOpacity
            onPress={
              handleSave
            }
            disabled={
              !content.trim()
            }
          >
            <Text
              style={[
                styles.saveText,
                {
                  color: content.trim()
                    ? colors.primary
                    : colors.textMuted,
                },
              ]}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={content}
          onChangeText={
            setContent
          }
          placeholder="Write your note..."
          placeholderTextColor={colors.textMuted}
          multiline
          autoFocus
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              color: colors.textPrimary,
            },
          ]}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default NoteEditorSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  headerRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 16,
  },

  title: {
    fontSize: 16,

    fontWeight: "700",

    flex: 1,

    marginRight: 12,
  },

  saveText: {
    fontSize: 14,

    fontWeight: "700",
  },

  input: {
    flex: 1,

    borderRadius: 14,

    padding: 14,

    fontSize: 15,

    lineHeight: 22,

    textAlignVertical: "top",
  },
});
