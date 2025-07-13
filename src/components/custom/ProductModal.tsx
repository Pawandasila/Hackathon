import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogImage,
  DialogTitle,
} from "@/components/custom/LinearDialog";
import { Coins } from "lucide-react";
import { Product } from "@/types/product";
import QuickStats from "./QuickStats";
import WhereToFind from "./WhereToFind";
import KeyFeatures from "./KeyFeatures";
import EnvironmentalImpactSection from "./EnvironmentalImpactSection";
import Specifications from "./Specifications";
import ProductActions from "./ProductActions";

interface ProductModalProps {
  product: Product;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  getEcoPointsColor: (points: number) => string;
}

export default function ProductModal({
  product,
  favorites,
  onToggleFavorite,
  getEcoPointsColor,
}: ProductModalProps) {
  return (
    <DialogContent
      style={{ borderRadius: "24px" }}
      className="relative flex h-full mx-auto flex-col overflow-y-auto bg-white dark:bg-gray-900 lg:max-w-6xl w-[95%] max-h-[90vh] shadow-2xl"
    >
      <div className="grid lg:grid-cols-2 gap-8 p-8">
        {/* Product Image and Stats */}
        <div className="space-y-4">
          <DialogImage
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />

          <QuickStats
            ecoPoints={product.ecoPoints}
            rating={product.rating}
            reviews={product.reviews}
          />

          <WhereToFind stores={product.whereToFind} />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </DialogTitle>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 ${getEcoPointsColor(
                  product.ecoPoints
                )}`}
              >
                <Coins className="w-4 h-4" />
                {product.ecoPoints} Eco Coins
              </div>
            </div>

            <DialogDescription className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
              {product.description}
            </DialogDescription>
          </div>

          <KeyFeatures features={product.features} />

          <EnvironmentalImpactSection impact={product.environmentalImpact} />

          <Specifications specifications={product.specifications} />

          <ProductActions
            favorites={favorites}
            productId={product.id}
            product={product}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </div>

      <DialogClose className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg z-10" />
    </DialogContent>
  );
}
