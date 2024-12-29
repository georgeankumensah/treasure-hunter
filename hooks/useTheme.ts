import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useTheme() {
  const theme = useColorScheme() ?? 'light';

  // Get the current theme colors (light or dark)
  const themeColors = Colors[theme];

  return themeColors;
}
