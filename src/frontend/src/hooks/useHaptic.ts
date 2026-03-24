export function useHaptic() {
  const tap = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const success = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([50, 30, 80]);
    }
  };

  const sos = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  };

  return { tap, success, sos };
}
