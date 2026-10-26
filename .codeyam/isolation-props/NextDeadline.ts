import type Component from "../../app/components/NextDeadline";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route.
export const scenarios: Record<string, Props> = {
  UrgentOpeningSoon: { status: "opening_soon", milestone: { kind: "registration_opens", at: "2026-11-10T17:00:00.000Z", tentative: false }, urgent: true, calendarHref: "/api/races/fred-lebow-manhattan-half/calendar" },
  LotteryOpen: { status: "lottery_open", milestone: { kind: "lottery_closes", at: "2026-11-18T04:59:00.000Z", tentative: false }, urgent: false, calendarHref: "/api/races/united-airlines-nyc-half/calendar" },
  TentativeDate: { status: "open", milestone: { kind: "registration_closes", at: "2027-04-03T03:59:00.000Z", tentative: true }, urgent: false, calendarHref: "/api/races/breakneck-point-trail-half/calendar" },
  NotAnnounced: { status: "not_announced", milestone: null, urgent: false, calendarHref: "/api/races/brooklyn-half/calendar" },
};

// Capture width matches the component's container on the home page.
export const captureWidth: number | undefined = 306;
