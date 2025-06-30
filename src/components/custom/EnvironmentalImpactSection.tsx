import { CheckCircle, Shield, Leaf } from "lucide-react";

interface EnvironmentalImpact {
  positive: string[];
  negative: string[];
}

interface EnvironmentalImpactSectionProps {
  impact: EnvironmentalImpact;
}

export default function EnvironmentalImpactSection({
  impact,
}: EnvironmentalImpactSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-green-600" />
        Environmental Impact
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200">
          <h4 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Positive Impact:
          </h4>
          <ul className="space-y-2">
            {impact.positive.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200">
          <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Considerations:
          </h4>
          <ul className="space-y-2">
            {impact.negative.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <Shield className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
