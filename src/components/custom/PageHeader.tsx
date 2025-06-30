import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="text-center mb-16 relative">
      {badge && (
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {badge.icon || <Leaf className="w-4 h-4" />}
          {badge.text}
        </motion.div>
      )}

      <motion.h1
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h1>
      
      <motion.p
        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
