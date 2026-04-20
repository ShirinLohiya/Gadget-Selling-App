/**
 * navigation/types.ts
 *
 * Central file for all navigation type definitions.
 * Person A's auth screens import RootStackParamList from here.
 * This keeps AppNavigator.tsx clean and gives all contributors
 * a single place to reference or extend navigation types.
 */

// Re-export the param list defined in AppNavigator so all
// screens can import from a dedicated types file.
export type { RootStackParamList } from './AppNavigator';
