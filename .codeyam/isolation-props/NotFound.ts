import type Component from "../../app/races/[slug]/not-found";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Component>;

// Scenario data for this component's isolation route. It lives here, under
// `.codeyam/`, rather than in the app's source tree — anything under the app's
// source tree compiles into the app and ships with it.
//
// TODO: fill in one entry per scenario, then register each with:
//   codeyam-editor editor register '{"name":"<Name> - <Scenario>","componentName":"<Name>","url":"/isolated-components/<Name>?s=<Scenario>","dimensions":["Desktop"]}'
// SEED data that exercises the component — populate lists with realistic rows,
// fill optional fields, trigger pluralization. All-empty props ([] / null)
// render an empty shell and is a bug; put empty / loading / error in their own
// separate scenarios.
export const scenarios: Record<string, Props> = {
  Default: {},
};

export const captureWidth: number | undefined = undefined;
