import type Component from "../../app/components/CourseNote";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  Default: { text: "A lollipop course in Harriman State Park with over 2,600 ft of climbing. Also offered the same day: a 10K (1,400 ft) and a 10K ruck. 6-hour cutoff; the course closes at 3:00 PM." },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 520;
