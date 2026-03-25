import { useCallback, useEffect, useState } from "react";

export type HappeningType =
  | "weather"
  | "traffic"
  | "event"
  | "wildlife"
  | "alert"
  | "crowd";
export type Severity = "info" | "warning" | "danger";

export interface Happening {
  type: HappeningType;
  title: string;
  description: string;
  severity: Severity;
}

const FALLBACK: Happening[] = [
  {
    type: "weather",
    title: "Light Rain Expected",
    description:
      "Drizzle forecast between Rishikesh and Devprayag. Carry rain gear.",
    severity: "info",
  },
  {
    type: "alert",
    title: "Road Repair Near Rudraprayag",
    description:
      "One-lane traffic near Rudraprayag bridge. Expect 20-30 min delay.",
    severity: "warning",
  },
  {
    type: "crowd",
    title: "Char Dham Yatra Crowds",
    description:
      "Heavy pilgrim traffic towards Kedarnath. Book slots in advance.",
    severity: "warning",
  },
  {
    type: "wildlife",
    title: "Wildlife Crossing Alert",
    description:
      "Elephant herd spotted near Corbett stretch. Drive cautiously at dusk.",
    severity: "warning",
  },
  {
    type: "event",
    title: "Ganga Aarti - Haridwar",
    description:
      "Evening Ganga Aarti at 6:30 PM. Roads near Har Ki Pauri will be crowded.",
    severity: "info",
  },
  {
    type: "traffic",
    title: "Landslide Debris Cleared",
    description:
      "Earlier blockage on NH-58 near Chamoli fully cleared. Traffic moving smoothly.",
    severity: "info",
  },
];

export function useGeminiRouteHappenings(from: string, to: string) {
  const [happenings, setHappenings] = useState<Happening[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!from || !to) return;
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const prompt = `You are a travel assistant for Uttarakhand, India. Give me 5-7 current live happenings and alerts for travelers on the route from ${from} to ${to} in Uttarakhand. Include road conditions, weather, local events, pilgrim crowds, wildlife crossings, landslide risks, fairs/melas, or any relevant travel alerts. Format as JSON array with no markdown: [{"type": "weather"|"traffic"|"event"|"wildlife"|"alert"|"crowd", "title": string, "description": string, "severity": "info"|"warning"|"danger"}]`;

      const res = await window.fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        },
      );
      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
      const data = await res.json();
      const text: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      // Extract JSON array from response
      const match = text.match(/\[\s*\{[\s\S]*?\}\s*\]/m);
      if (!match) throw new Error("No JSON array in response");
      const parsed: Happening[] = JSON.parse(match[0]);
      setHappenings(parsed);
    } catch {
      setHappenings(FALLBACK);
      setError("Using cached route intel");
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { happenings, loading, error, refetch: fetch };
}
