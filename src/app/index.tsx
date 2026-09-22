/**
 * App Entry Point
 * Redirects directly to Main Home screen
 */

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(main)/home" />;
}
