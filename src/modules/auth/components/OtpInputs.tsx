import {
  TextInput,
  View,
  StyleSheet,
} from "react-native";

interface Props {
  inputs: any;

  otpArray:
    string[];

  onChange: (
    text: string,
    index: number
  ) => void;
}

export default function OtpInputs({
  inputs,
  otpArray,
  onChange,
}: Props) {
  return (
    <View
      style={
        styles.row
      }
    >
      {[...Array(6)].map(
        (_, i) => (
          <TextInput
            key={i}
            ref={ref => {
              if (
                ref
              ) {
                inputs.current[
                  i
                ] = ref;
              }
            }}
            style={
              styles.input
            }
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text =>
              onChange(
                text,
                i
              )
            }
          />
        )
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    row: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",
    },

    input: {
      width: 50,

      height: 56,

      borderWidth: 1,

      borderColor:
        "#DCDCDC",

      borderRadius: 10,

      textAlign:
        "center",

      fontSize: 18,

      backgroundColor:
        "#FFF",
    },
  });