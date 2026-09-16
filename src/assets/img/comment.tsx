import Svg, { Path } from "react-native-svg";

interface CommentProps {
  color?: string;
  size?: number;
}

export const Comment = ({
  color = "#000",
  size = 24,
}: CommentProps) => {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        fill={color}
        d="M13.125 12a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-5.25-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm8.25 0a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM21.75 12a9.75 9.75 0 01-14.332 8.608l-3.193 1.064a1.5 1.5 0 01-1.897-1.897l1.064-3.193A9.75 9.75 0 1121.75 12zm-1.5 0a8.25 8.25 0 10-15.393 4.13.75.75 0 01.062.614L3.75 20.25l3.506-1.17a.736.736 0 01.612.063A8.25 8.25 0 0020.25 12z"
      />
    </Svg>
  );
};