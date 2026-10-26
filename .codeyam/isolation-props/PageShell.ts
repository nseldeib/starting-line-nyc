import type Component from "../../app/components/PageShell";
import type { ComponentProps } from "react";
import { createElement } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { children: createElement("p", { className: "tz" }, "Page content sits in the centred 1280px column with 40px gutters.") },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = undefined;
