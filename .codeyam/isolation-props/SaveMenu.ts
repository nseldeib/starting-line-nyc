import type Component from "../../app/components/SaveMenu";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Unsaved: { raceName: "Big Apple Half Marathon", status: null, unavailable: false },
  Considering: { raceName: "Big Apple Half Marathon", status: "considering", unavailable: false },
  StorageBlocked: { raceName: "Big Apple Half Marathon", status: null, unavailable: true },
};

// Capture width matches the menu's fixed width under a Save button.
export const captureWidth: number | undefined = 240;
