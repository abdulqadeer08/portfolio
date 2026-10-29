"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/portfolio";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timezone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

/** The current time where you are based, e.g. "14:32 PKT". */
export function LiveClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "--:--",
  );

  return (
    <span className={className}>
      <time suppressHydrationWarning>{time}</time> {profile.timezoneLabel}
    </span>
  );
}
