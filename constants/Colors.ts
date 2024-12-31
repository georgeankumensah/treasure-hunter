/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    socialMediaButtonColor: "rgba(125, 110, 96, 0.12)",
    socialMediaButtonTextColor: "#11181C",
    primary: "#11181C",
    cityCardBorder: "red",
    cityCardBackground: "rgba(17, 101, 48, 1)",
    subtext:"gray"
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    socialMediaButtonColor: "#2C2F33",
    socialMediaButtonTextColor: "#ECEDEE",
    primary: "#FF5A5F",
    cityCardBorder: "yellow",
    cityCardBackground: "#222B45",
    subtext:"gray"
  },
};
