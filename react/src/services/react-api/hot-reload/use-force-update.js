import { useState, useCallback } from "react";

export default function useForceUpdate() {
  const [tick, setTick] = useState(0);
  return [
    tick,
    useCallback(() => {
      setTick(tick + 1);
    }, [tick])
  ];
}
