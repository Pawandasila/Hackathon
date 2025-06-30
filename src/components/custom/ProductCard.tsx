"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Star,
  ShoppingCart,
  Coins,
} from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onCardClick: () => void;
  getEcoPointsColor: (points: number) => string;
}

export default function ProductCard({
  product,
  index,
  favorites,
  onToggleFavorite,
  onCardClick,
  getEcoPointsColor,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className="p-0 h-full hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group cursor-pointer border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:-translate-y-2"
        onClick={onCardClick}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Eco Points Badge */}
            <div
              className={`absolute top-4 left-4 px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 backdrop-blur-md z-20 ${getEcoPointsColor(
                product.ecoPoints
              )}`}
            >
              <Coins className="w-4 h-4" />
              {product.ecoPoints} Eco
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all duration-300 hover:scale-110 z-20"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorites.includes(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              />
            </button>

            {/* Discount Badge */}
            {product.originalPrice > product.price && (
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-red-300 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl z-20">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                {product.shortDesc}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium border border-green-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center justify-center gap-2 py-3 rounded-2xl font-medium shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30">
                <ShoppingCart className="w-4 h-4" />
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
