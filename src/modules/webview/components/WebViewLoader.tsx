import {
  WebView,
} from "react-native-webview";

interface Props {
  uri: string;

  onLoaded: () => void;
}

export default function WebViewLoader({
  uri,
  onLoaded,
}: Props) {
  return (
    <WebView
      source={{
        uri,
      }}
      onLoad={onLoaded}
    />
  );
}