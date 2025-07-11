"use client";

import type { ThemeProviderProps } from "next-themes";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { useRouter } from "next/navigation";
import * as React from "react";

import { HeroUIProvider } from "@heroui/system";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

// declare module "@react-types/shared" {
//   interface RouterConfig {
//     routerOptions: NonNullable<
//       Parameters<ReturnType<typeof useRouter>["push"]>[1]
//     >;
//   }
// }

export function Providers({ children, themeProps }: ProvidersProps) {
  // const router = useRouter();

  return (
    // <HeroUIProvider navigate={router.push}>
    <HeroUIProvider className="h-full">
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
