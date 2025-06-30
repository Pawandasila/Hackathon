import { Coins, Star, Users } from "lucide-react";

interface QuickStatsProps {
  ecoPoints: number;
  rating: number;
  reviews: number;
}

export default function QuickStats({ ecoPoints, rating, reviews }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200">
        <Coins className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <div className="text-lg font-bold text-green-600">{ecoPoints}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          Eco Coins
        </div>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200">
        <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <div className="text-lg font-bold text-blue-600">{rating}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          Rating
        </div>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200">
        <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
        <div className="text-lg font-bold text-purple-600">{reviews}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          Reviews
        </div>
      </div>
    </div>
  );
}
