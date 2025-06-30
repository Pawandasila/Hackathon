import Link from "next/link";
import { Globe, ArrowRight, Shield } from "lucide-react";

interface WhereToFindStore {
  platform: string;
  link: string;
  price: string;
}

interface WhereToFindProps {
  stores: WhereToFindStore[];
}

export default function WhereToFind({ stores }: WhereToFindProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
          <Globe className="w-5 h-5 text-purple-600" />
        </div>
        Where to Buy
      </h3>
      <div className="space-y-4">
        {stores.map((store, idx) => (
          <div key={idx} className="group">
            <div className="relative overflow-hidden bg-gradient-to-r from-white via-gray-50/50 to-white dark:from-gray-800 dark:via-gray-750/50 dark:to-gray-800 rounded-3xl border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 backdrop-blur-sm">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 group-hover:scale-110">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    {/* Animated ring on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-400/0 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-125"></div>
                  </div>
                  <div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300">
                      {store.platform}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {store.price}
                      </span>
                      <div className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                        Best Price
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={store.link}
                  target="_blank"
                  className="relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 group/button"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000"></div>

                  <span className="relative z-10">Visit Store</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/button:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional info card */}
      <div className="mt-6 p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl border-2 border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-xl shadow-sm">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              💡 Pro Tip
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Compare prices across platforms and check for seasonal discounts.
              Many stores offer additional eco-friendly product bundles that can
              save you more money!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
