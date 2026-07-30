"use client";

import { useEffect, useState } from "react";

const FALLBACK = { count: 127, cap: 500 };

export function useFoundingCount() {
  const [data, setData] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/waitlist")
      .then((res) => (res.ok ? res.json() : FALLBACK))
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
