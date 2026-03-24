import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";

const leaderboardData = [
  {
    rank: 1,
    name: "Arjun Rawat",
    location: "Dehradun",
    coins: 12500,
    trips: 47,
  },
  {
    rank: 2,
    name: "Priya Sharma",
    location: "Nainital",
    coins: 10200,
    trips: 38,
  },
  {
    rank: 3,
    name: "Vikram Bisht",
    location: "Rishikesh",
    coins: 8900,
    trips: 34,
  },
  {
    rank: 4,
    name: "Meera Patel",
    location: "Mussoorie",
    coins: 7600,
    trips: 29,
  },
  {
    rank: 5,
    name: "Rohit Joshi",
    location: "Haridwar",
    coins: 6400,
    trips: 24,
  },
  { rank: 6, name: "Sunita Negi", location: "Almora", coins: 5100, trips: 20 },
  { rank: 7, name: "Deepak Thakur", location: "Tehri", coins: 4200, trips: 16 },
  {
    rank: 8,
    name: "Anita Verma",
    location: "Pithoragarh",
    coins: 3300,
    trips: 13,
  },
  {
    rank: 9,
    name: "Suresh Rana",
    location: "Champawat",
    coins: 2400,
    trips: 10,
  },
  {
    rank: 10,
    name: "Kavita Singh",
    location: "Uttarkashi",
    coins: 1800,
    trips: 7,
  },
];

const rankColors = ["text-yellow-500", "text-gray-400", "text-amber-700"];
const rankBg = [
  "bg-yellow-50 dark:bg-yellow-900/20",
  "bg-gray-50 dark:bg-gray-800/30",
  "bg-amber-50 dark:bg-amber-900/20",
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-primary font-montserrat font-bold uppercase tracking-[0.2em] text-xs">
                PITTHU
              </p>
              <h1 className="font-montserrat font-black uppercase text-2xl text-foreground">
                Leaderboard
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            Top Pitthu Travelers of the Month 🏆
          </p>
        </motion.div>

        <div className="space-y-3" data-ocid="leaderboard.list">
          {leaderboardData.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`leaderboard.item.${user.rank}`}
            >
              <Card
                className={`shadow-card ${user.rank <= 3 ? rankBg[user.rank - 1] : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-black text-lg flex-shrink-0 ${
                        user.rank <= 3
                          ? `${rankColors[user.rank - 1]} bg-white dark:bg-gray-900`
                          : "text-muted-foreground bg-muted"
                      }`}
                    >
                      {user.rank <= 3 ? (
                        <Trophy
                          className={`w-5 h-5 ${rankColors[user.rank - 1]}`}
                        />
                      ) : (
                        user.rank
                      )}
                    </div>
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-montserrat font-bold text-sm flex-shrink-0">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-montserrat font-bold text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.location} · {user.trips} trips
                      </p>
                    </div>
                    {/* Coins */}
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 font-montserrat font-bold"
                    >
                      🪙 {user.coins.toLocaleString("en-IN")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
