import * as WebBrowser from "expo-web-browser";

export async function openInAppBrowser(
  url: string
) {
  try {
    const result =
      await WebBrowser.openBrowserAsync(
        url,
        {
          toolbarColor:
            "#1146B5",

          controlsColor:
            "#FFFFFF",

          showTitle: true,

          enableBarCollapsing: true,

          presentationStyle:
            WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
        }
      );

    return result;
  } catch (error) {
    console.log(
      "Browser Error:",
      error
    );
  }
}