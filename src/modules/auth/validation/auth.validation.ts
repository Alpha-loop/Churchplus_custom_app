export function validateEmail(
  email: string
) {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

export function validateRegisterForm({
  name,
  email,
  password,
}: {
  name: string;

  email: string;

  password: string;
}) {
  if (
    !name ||
    !email ||
    !password
  ) {
    return "Kindly fill in all fields";
  }

  if (
    !validateEmail(email)
  ) {
    return "Kindly enter a valid email";
  }

  return null;
}