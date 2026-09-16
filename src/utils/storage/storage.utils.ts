import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStorageItem<T>(
  key: string,
  value: T
) {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.log(
      "Storage Set Error:",
      error
    );
  }
}

export async function getStorageItem<T>(
  key: string
): Promise<T | null> {
  try {
    const value =
      await AsyncStorage.getItem(
        key
      );

    if (!value) return null;

    return JSON.parse(value);
  } catch (error) {
    console.log(
      "Storage Get Error:",
      error
    );

    return null;
  }
}

export async function removeStorageItem(
  key: string
) {
  try {
    await AsyncStorage.removeItem(
      key
    );
  } catch (error) {
    console.log(
      "Storage Remove Error:",
      error
    );
  }
}

export async function clearStorage() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(
      "Storage Clear Error:",
      error
    );
  }
}