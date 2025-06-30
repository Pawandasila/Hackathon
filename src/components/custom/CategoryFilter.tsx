import { Button } from "@/components/ui/button";
import { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategorySelect(category.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25 border-0"
                : "bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 hover:shadow-md"
            }`}
          >
            <IconComponent className="w-5 h-5" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}
