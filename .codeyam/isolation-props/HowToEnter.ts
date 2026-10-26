import type Component from "../../app/components/HowToEnter";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  OpenWithPrice: { title: "Open registration", explain: "First come, first served until it fills or registration closes.", entryNote: "Capped at 400 runners across all three events. It has sold out each of the last four years, typically by the end of March. Charity bibs and free hardship entries are available.", priceCents: 7520, priceNote: "Includes a $5.20 sign-up fee. The price rises after Dec 31, 2026.", raceDayCalendarHref: "/api/races/big-bear-squatch-north-half/calendar?event=raceday" },
  QualifierNoPrice: { title: "Qualifying standard", explain: "You have to meet a qualifying standard to be accepted.", entryNote: "You must meet one qualifying standard: an Escarpment finish under 6 hours in the last 2 years, a road or trail marathon under 4:15 in the last year, a finish at a listed qualifying race in the last year, or 18+ mile trail race results reviewed by the race director. Applications open in early 2027 (exact dates not announced). Capped at 275 runners; your card is charged only if you are accepted.", priceCents: null, priceNote: null, raceDayCalendarHref: "/api/races/escarpment-trail-run/calendar?event=raceday" },
};

// Capture width matches the component's container on the race page.
export const captureWidth: number | undefined = 520;
