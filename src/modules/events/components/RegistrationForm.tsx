import AppInput
from "@/shared/AppInput";

interface Props {
  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  onFirstNameChange:
    (text: string) => void;

  onLastNameChange:
    (text: string) => void;

  onEmailChange:
    (text: string) => void;

  onPhoneNumberChange:
    (text: string) => void;
}

export default function RegistrationForm({
  firstName,
  lastName,
  email,
  phoneNumber,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneNumberChange,
}: Props) {
  return (
    <>
      <AppInput
        placeholder="First Name"
        value={firstName}
        onChangeText={
          onFirstNameChange
        }
      />

      <AppInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={
          onLastNameChange
        }
      />

      <AppInput
        placeholder="Email"
        value={email}
        onChangeText={
          onEmailChange
        }
      />

      <AppInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={
          onPhoneNumberChange
        }
      />
    </>
  );
}