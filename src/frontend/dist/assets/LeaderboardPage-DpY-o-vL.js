import { j as jsxRuntimeExports, m as motion, x as Trophy, e as Card, f as CardContent, B as Badge } from "./index-CG-f2g7d.js";
const leaderboardData = [
  {
    rank: 1,
    name: "Arjun Rawat",
    location: "Dehradun",
    coins: 12500,
    trips: 47
  },
  {
    rank: 2,
    name: "Priya Sharma",
    location: "Nainital",
    coins: 10200,
    trips: 38
  },
  {
    rank: 3,
    name: "Vikram Bisht",
    location: "Rishikesh",
    coins: 8900,
    trips: 34
  },
  {
    rank: 4,
    name: "Meera Patel",
    location: "Mussoorie",
    coins: 7600,
    trips: 29
  },
  {
    rank: 5,
    name: "Rohit Joshi",
    location: "Haridwar",
    coins: 6400,
    trips: 24
  },
  { rank: 6, name: "Sunita Negi", location: "Almora", coins: 5100, trips: 20 },
  { rank: 7, name: "Deepak Thakur", location: "Tehri", coins: 4200, trips: 16 },
  {
    rank: 8,
    name: "Anita Verma",
    location: "Pithoragarh",
    coins: 3300,
    trips: 13
  },
  {
    rank: 9,
    name: "Suresh Rana",
    location: "Champawat",
    coins: 2400,
    trips: 10
  },
  {
    rank: 10,
    name: "Kavita Singh",
    location: "Uttarkashi",
    coins: 1800,
    trips: 7
  }
];
const rankColors = ["text-yellow-500", "text-gray-400", "text-amber-700"];
const rankBg = [
  "bg-yellow-50 dark:bg-yellow-900/20",
  "bg-gray-50 dark:bg-gray-800/30",
  "bg-amber-50 dark:bg-amber-900/20"
];
function LeaderboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-muted py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-montserrat font-bold uppercase tracking-[0.2em] text-xs", children: "PITTHU" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-montserrat font-black uppercase text-2xl text-foreground", children: "Leaderboard" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Top Pitthu Travelers of the Month 🏆" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "leaderboard.list", children: leaderboardData.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.05 },
        "data-ocid": `leaderboard.item.${user.rank}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `shadow-card ${user.rank <= 3 ? rankBg[user.rank - 1] : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-black text-lg flex-shrink-0 ${user.rank <= 3 ? `${rankColors[user.rank - 1]} bg-white dark:bg-gray-900` : "text-muted-foreground bg-muted"}`,
                  children: user.rank <= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trophy,
                    {
                      className: `w-5 h-5 ${rankColors[user.rank - 1]}`
                    }
                  ) : user.rank
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-montserrat font-bold text-sm flex-shrink-0", children: user.name.split(" ").map((n) => n[0]).join("") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-foreground", children: user.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  user.location,
                  " · ",
                  user.trips,
                  " trips"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 font-montserrat font-bold",
                  children: [
                    "🪙 ",
                    user.coins.toLocaleString("en-IN")
                  ]
                }
              )
            ] }) })
          }
        )
      },
      user.rank
    )) })
  ] }) });
}
export {
  LeaderboardPage as default
};
