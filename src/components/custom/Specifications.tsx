import { CheckCircle } from "lucide-react";

interface SpecificationsProps {
  specifications: Record<string, string>;
}

export default function Specifications({ specifications }: SpecificationsProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
          <CheckCircle className="w-5 h-5 text-blue-600" />
        </div>
        Specifications
      </h3>
      <div className="space-y-3">
        {Object.entries(specifications).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center py-2"
          >
            <span className="text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
