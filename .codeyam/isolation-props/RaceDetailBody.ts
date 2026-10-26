import type Component from "../../app/components/RaceDetailBody";
import type { ComponentProps } from "react";
import { createElement } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: {
    main: createElement("p", null, "Key dates column"),
    aside: createElement("p", null, "How to enter, course and sources column"),
  },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 1200;
