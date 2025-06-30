import { CheckCircle } from "lucide-react";

interface KeyFeaturesProps {
  features: string[];
}

export default function KeyFeatures({ features }: KeyFeaturesProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        Key Features
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200"
          >
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
