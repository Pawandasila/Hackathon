"use client";
import { useState } from "react";
import {
  Leaf,
  Recycle,
  Globe,
  TreePine,
  Droplets,
  Wind,
  Sun,
} from "lucide-react";
import {
  Dialog,
  DialogContainer,
  DialogTrigger,
} from "@/components/custom/LinearDialog";
import { Product, Category } from "@/types/product";
import PageHeader from "@/components/custom/PageHeader";
import CategoryFilter from "@/components/custom/CategoryFilter";
import ProductCard from "@/components/custom/ProductCard";
import ProductModal from "@/components/custom/ProductModal";
import EmptyState from "@/components/custom/EmptyState";

export default function EcoProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Eco-friendly products with detailed information
  const products: Product[] = [
    {
      id: "1",
      name: "Stainless Steel Water Bottle",
      category: "plastic-alternatives",
      price: 599,
      originalPrice: 799,
      ecoPoints: 150,
      rating: 4.8,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      shortDesc:
        "Premium 500ml stainless steel bottle that replaces 1000+ plastic bottles",
      description:
        "This premium stainless steel water bottle is designed to be your lifelong hydration companion. Made from food-grade 18/8 stainless steel, it keeps your drinks cold for 24 hours and hot for 12 hours. The vacuum-insulated double-wall construction prevents condensation while maintaining temperature.",
      features: ["BPA Free", "24hr Cold", "Leak Proof", "Dishwasher Safe"],
      environmentalImpact: {
        positive: [
          "Replaces 1000+ single-use plastic bottles per year",
          "Made from 90% recycled stainless steel",
          "Zero plastic waste generation",
          "Reduces carbon footprint by 80% vs plastic bottles",
        ],
        negative: [
          "Higher initial manufacturing energy",
          "Mining required for steel production",
        ],
      },
      specifications: {
        capacity: "500ml",
        material: "18/8 Stainless Steel",
        weight: "280g",
        dimensions: "26cm x 7cm",
        warranty: "Lifetime",
      },
      whereToFind: [
        {
          platform: "Amazon",
          link: "https://amazon.in/search?k=stainless+steel+water+bottle",
          price: "₹549",
        },
        {
          platform: "Flipkart",
          link: "https://flipkart.com/search?q=steel+water+bottle",
          price: "₹599",
        },
        {
          platform: "Myntra",
          link: "https://myntra.com/search?q=water+bottle",
          price: "₹629",
        },
      ],
    },
    {
      id: "2",
      name: "Bamboo Food Storage Set",
      category: "bamboo",
      price: 899,
      originalPrice: 1199,
      ecoPoints: 200,
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      shortDesc: "4-piece bamboo container set replacing plastic storage",
      description:
        "This elegant 4-piece bamboo food storage set revolutionizes your kitchen storage. Made from sustainably harvested bamboo, these containers are naturally antibacterial and odor-resistant. The airtight lids ensure freshness while the stackable design saves space.",
      features: ["Airtight", "Microwave Safe", "Biodegradable", "Stackable"],
      environmentalImpact: {
        positive: [
          "Replaces 20+ plastic containers",
          "Made from fast-growing bamboo",
          "Fully biodegradable within 3 years",
          "Carbon negative material",
        ],
        negative: [
          "Requires proper care to maintain longevity",
          "Not suitable for freezer storage",
        ],
      },
      specifications: {
        sizes: "250ml, 500ml, 750ml, 1000ml",
        material: "Organic Bamboo Fiber",
        weight: "400g (set)",
        care: "Hand wash recommended",
        warranty: "2 years",
      },
      whereToFind: [
        {
          platform: "Amazon",
          link: "https://amazon.in/search?k=bamboo+food+containers",
          price: "₹799",
        },
        {
          platform: "Flipkart",
          link: "https://flipkart.com/search?q=bamboo+storage",
          price: "₹849",
        },
        {
          platform: "Urban Company",
          link: "https://urbancompany.com",
          price: "₹899",
        },
      ],
    },
    {
      id: "3",
      name: "Premium Jute Shopping Bag",
      category: "jute-bags",
      price: 299,
      originalPrice: 399,
      ecoPoints: 120,
      rating: 4.7,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      shortDesc: "Handwoven jute bag with reinforced handles",
      description:
        "This premium jute shopping bag combines traditional craftsmanship with modern durability. Handwoven by skilled artisans, it features reinforced handles and a spacious interior perfect for grocery shopping, beach trips, or daily errands.",
      features: ["15kg Capacity", "Washable", "Durable", "Handwoven"],
      environmentalImpact: {
        positive: [
          "Replaces 500+ plastic bags annually",
          "Made from 100% natural jute fiber",
          "Supports local artisan communities",
          "Completely biodegradable",
        ],
        negative: [
          "Requires water for jute cultivation",
          "May show wear with heavy use",
        ],
      },
      specifications: {
        capacity: "15kg load capacity",
        material: "100% Natural Jute",
        dimensions: "40cm x 35cm x 15cm",
        handleLength: "60cm",
        warranty: "1 year",
      },
      whereToFind: [
        {
          platform: "Amazon",
          link: "https://amazon.in/search?k=jute+shopping+bag",
          price: "₹249",
        },
        {
          platform: "Etsy",
          link: "https://etsy.com/search?q=jute+bag",
          price: "₹299",
        },
        { platform: "Local Markets", link: "#", price: "₹199" },
      ],
    },
    {
      id: "4",
      name: "Solar Power Bank 20,000mAh",
      category: "solar",
      price: 1299,
      originalPrice: 1599,
      ecoPoints: 300,
      rating: 4.6,
      reviews: 298,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      shortDesc: "High-capacity solar power bank with wireless charging",
      description:
        "This advanced solar power bank harnesses the sun's energy to keep your devices charged anywhere. With 20,000mAh capacity and wireless charging capability, it's perfect for outdoor adventures and emergency situations.",
      features: ["Solar Charging", "Wireless Qi", "Fast Charge", "Waterproof"],
      environmentalImpact: {
        positive: [
          "Uses renewable solar energy",
          "Reduces grid electricity consumption",
          "Long lifespan reduces electronic waste",
          "Powers devices without fossil fuels",
        ],
        negative: [
          "Battery contains lithium",
          "Manufacturing requires rare earth elements",
        ],
      },
      specifications: {
        capacity: "20,000mAh",
        solarPanel: "5W Monocrystalline",
        outputs: "USB-A, USB-C, Wireless",
        chargingTime: "8hrs (wall), 20hrs (solar)",
        warranty: "2 years",
      },
      whereToFind: [
        {
          platform: "Amazon",
          link: "https://amazon.in/search?k=solar+power+bank",
          price: "₹1,199",
        },
        {
          platform: "Flipkart",
          link: "https://flipkart.com/search?q=solar+charger",
          price: "₹1,299",
        },
        { platform: "Croma", link: "https://croma.com", price: "₹1,399" },
      ],
    },
    {
      id: "5",
      name: "Organic Cotton Tote Bag",
      category: "cotton",
      price: 399,
      originalPrice: 599,
      ecoPoints: 100,
      rating: 4.9,
      reviews: 167,
      image:
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop",
      shortDesc: "Premium organic cotton tote with minimalist design",
      description:
        "This premium tote bag is made from 100% organic cotton, grown without harmful pesticides or chemicals. The minimalist design makes it perfect for everyday use, from grocery shopping to carrying work essentials.",
      features: [
        "Organic Cotton",
        "Machine Washable",
        "Durable Stitching",
        "Large Capacity",
      ],
      environmentalImpact: {
        positive: [
          "Made from pesticide-free organic cotton",
          "Biodegradable natural material",
          "Supports sustainable farming",
          "Replaces plastic bags",
        ],
        negative: [
          "Higher water usage during cotton growing",
          "Natural fiber processing requires energy",
        ],
      },
      specifications: {
        material: "100% Organic Cotton",
        dimensions: "38cm x 42cm x 12cm",
        handleLength: "65cm",
        weight: "180g",
        warranty: "1 year",
      },
      whereToFind: [
        {
          platform: "Amazon",
          link: "https://amazon.in/search?k=organic+cotton+tote",
          price: "₹349",
        },
        {
          platform: "Myntra",
          link: "https://myntra.com/search?q=tote+bag",
          price: "₹399",
        },
        { platform: "Nykaa", link: "https://nykaa.com", price: "₹449" },
      ],
    },
    {
      id: "6",
      name: "Biodegradable Phone Case",
      category: "biodegradable",
      price: 799,
      originalPrice: 999,
      ecoPoints: 180,
      rating: 4.7,
      reviews: 134,
      image:
        "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=400&h=400&fit=crop",
      shortDesc: "Plant-based phone case that protects your device and planet",
      description:
        "This innovative phone case is made from plant-based bioplastics that naturally biodegrade at the end of its life. It provides excellent protection for your phone while reducing plastic waste in landfills.",
      features: [
        "Plant-Based",
        "Drop Protection",
        "Biodegradable",
        "Precise Cutouts",
      ],
      environmentalImpact: {
        positive: [
          "Biodegrades in 2-5 years vs 400+ for plastic",
          "Made from renewable plant materials",
          "Compostable at end of life",
          "Reduces petroleum-based plastic use",
        ],
        negative: [
          "Shorter lifespan than traditional plastic",
          "Limited color options currently",
        ],
      },
      specifications: {
        material: "Plant-based Bioplastic",
        compatibility: "Multiple phone models",
        dropProtection: "2 meters",
        biodegradableTime: "2-5 years",
        warranty: "1 year",
      },
      whereToFind: [
        {
          platform: "Amazon",
          link: "https://amazon.in/search?k=biodegradable+phone+case",
          price: "₹749",
        },
        {
          platform: "Flipkart",
          link: "https://flipkart.com/search?q=eco+phone+case",
          price: "₹799",
        },
        { platform: "Brand Website", link: "#", price: "₹699" },
      ],
    },
  ];

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getEcoPointsColor = (points: number) => {
    if (points >= 200)
      return "text-purple-600 bg-gradient-to-r from-purple-100 to-purple-200 border border-purple-300";
    if (points >= 150)
      return "text-emerald-600 bg-gradient-to-r from-emerald-100 to-emerald-200 border border-emerald-300";
    if (points >= 100)
      return "text-blue-600 bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300";
    return "text-amber-600 bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300";
  };

  const categories = [
    { id: "all", name: "All Products", icon: Globe },
    { id: "plastic-alternatives", name: "Plastic Alternatives", icon: Recycle },
    { id: "bamboo", name: "Bamboo Products", icon: TreePine },
    { id: "jute-bags", name: "Jute Bags", icon: Leaf },
    { id: "solar", name: "Solar Products", icon: Sun },
    { id: "cotton", name: "Organic Cotton", icon: Wind },
    { id: "biodegradable", name: "Biodegradable", icon: Droplets },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-1/4 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl"></div>
        </div>

        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <PageHeader
            title="Eco-Friendly Products"
            subtitle="Discover premium sustainable alternatives that help protect our planet while earning eco coins with every conscious purchase"
            badge={{
              text: "Sustainable Living Made Easy",
              icon: <Leaf className="w-4 h-4" />,
            }}
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Dialog
              key={product.id}
              transition={{
                type: "spring",
                bounce: 0.05,
                duration: 0.5,
              }}
            >
              <DialogTrigger className="w-full">
                <ProductCard
                  product={product}
                  index={index}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onCardClick={() => {}}
                  getEcoPointsColor={getEcoPointsColor}
                />
              </DialogTrigger>

              {/* Product Modal */}
              <DialogContainer className="pt-20">
                <ProductModal
                  product={product}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  getEcoPointsColor={getEcoPointsColor}
                />
              </DialogContainer>
            </Dialog>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <EmptyState
            title="No products found"
            description="Try adjusting your category filter or check back later for new eco-friendly products."
          />
        )}
      </div>
    </div>
  );
}
