import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { Product } from "@/types/product";

interface ProductActionsProps {
  favorites: string[];
  productId: string;
  product?: Product;
  onToggleFavorite: (productId: string) => void;
  onAddToCart?: () => void;
}

export default function ProductActions({
  favorites,
  productId,
  product,
  onToggleFavorite,
  onAddToCart,
}: ProductActionsProps) {
  const handleAddToCart = () => {
    if (product) {
      const success = addToCart(product);
      if (success && onAddToCart) {
        onAddToCart();
      }
    } else if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className="flex gap-4 pt-6">
      <Button
        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>
      <Button
        variant="outline"
        onClick={() => onToggleFavorite(productId)}
        className={`p-3 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
          favorites.includes(productId)
            ? "text-red-500 border-red-500 bg-red-50 hover:bg-red-100"
            : "border-gray-300 hover:border-red-300 hover:bg-red-50"
        }`}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            favorites.includes(productId) ? "fill-red-500" : ""
          }`}
        />
      </Button>
    </div>
  );
}
