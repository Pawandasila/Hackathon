"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Leaf, TrendingUp, Recycle, Star, ArrowRight } from 'lucide-react';
import { EcoOptimizationAI } from '@/lib/ai-optimization';
import { mockSuppliers, productNames } from '@/lib/mock-data';

interface EcoAlternative {
  originalProduct: string;
  suggestedProduct: string;
  ecoImprovement: number;
  costImpact: number;
  availableFrom: string[];
  sustainabilityFeatures: string[];
  customerRating: number;
  carbonReduction: number;
}

export default function ProductSuggestionEngine() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<EcoAlternative[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Enhanced mock data for product suggestions
  const ecoAlternatives: EcoAlternative[] = [
    {
      originalProduct: 'prod-1',
      suggestedProduct: 'prod-1-eco',
      ecoImprovement: 45,
      costImpact: 15,
      availableFrom: ['GreenTech Solutions', 'Sustainable Goods Co.'],
      sustainabilityFeatures: ['Biodegradable packaging', 'Plant-based formula', 'Zero-waste manufacturing'],
      customerRating: 4.7,
      carbonReduction: 2.8
    },
    {
      originalProduct: 'prod-2',
      suggestedProduct: 'prod-2-eco',
      ecoImprovement: 38,
      costImpact: -5,
      availableFrom: ['EcoFirst Manufacturing', 'GreenTech Solutions'],
      sustainabilityFeatures: ['Recycled materials', 'Compostable design', 'Local sourcing'],
      customerRating: 4.5,
      carbonReduction: 3.2
    },
    {
      originalProduct: 'prod-3',
      suggestedProduct: 'prod-3-eco',
      ecoImprovement: 52,
      costImpact: 22,
      availableFrom: ['Sustainable Goods Co.'],
      sustainabilityFeatures: ['Organic certification', 'Fair trade', 'Renewable energy production'],
      customerRating: 4.8,
      carbonReduction: 4.1
    },
    {
      originalProduct: 'prod-4',
      suggestedProduct: 'prod-4-eco',
      ecoImprovement: 41,
      costImpact: 8,
      availableFrom: ['GreenTech Solutions', 'EcoFirst Manufacturing'],
      sustainabilityFeatures: ['Energy efficient', 'Recyclable components', 'Extended warranty'],
      customerRating: 4.6,
      carbonReduction: 5.5
    },
    {
      originalProduct: 'prod-5',
      suggestedProduct: 'prod-5-eco',
      ecoImprovement: 33,
      costImpact: -12,
      availableFrom: ['Sustainable Goods Co.', 'EcoFirst Manufacturing'],
      sustainabilityFeatures: ['Bamboo construction', 'Plastic-free', 'Reusable design'],
      customerRating: 4.4,
      carbonReduction: 1.9
    },
    {
      originalProduct: 'prod-6',
      suggestedProduct: 'prod-6-eco',
      ecoImprovement: 48,
      costImpact: 18,
      availableFrom: ['GreenTech Solutions'],
      sustainabilityFeatures: ['Post-consumer recycled', 'Carbon neutral shipping', 'Minimal packaging'],
      customerRating: 4.7,
      carbonReduction: 2.3
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌍' },
    { id: 'cleaning', name: 'Cleaning Supplies', icon: '🧽' },
    { id: 'packaging', name: 'Packaging', icon: '📦' },
    { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
    { id: 'energy', name: 'Energy Equipment', icon: '⚡' },
    { id: 'kitchenware', name: 'Kitchenware', icon: '🍽️' },
    { id: 'office', name: 'Office Supplies', icon: '📝' }
  ];

  const handleSearch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = ecoAlternatives;
      
      if (searchTerm) {
        filtered = ecoAlternatives.filter(alt => 
          productNames[alt.originalProduct]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alt.sustainabilityFeatures.some(feature => 
            feature.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      
      setSuggestions(filtered);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setSuggestions(ecoAlternatives);
    }
  }, [searchTerm]);

  const totalEcoImpact = suggestions.reduce((sum, s) => sum + s.ecoImprovement, 0);
  const averageCostImpact = suggestions.length > 0 
    ? suggestions.reduce((sum, s) => sum + s.costImpact, 0) / suggestions.length 
    : 0;
  const totalCarbonReduction = suggestions.reduce((sum, s) => sum + s.carbonReduction, 0);

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Recycle className="h-6 w-6 mr-2 text-green-600" />
            Sustainable Product Suggestion Engine
          </CardTitle>
          <p className="text-gray-600">
            AI-powered recommendations for eco-friendlier product alternatives
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search products or sustainability features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Eco Improvement</p>
                  <p className="text-3xl font-bold text-green-600">
                    +{totalEcoImpact.toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-500">Across all suggestions</p>
                </div>
                <Leaf className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Cost Impact</p>
                  <p className={`text-3xl font-bold ${averageCostImpact > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {averageCostImpact > 0 ? '+' : ''}{averageCostImpact.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Price difference</p>
                </div>
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">$</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Carbon Reduction</p>
                  <p className="text-3xl font-bold text-purple-600">
                    -{totalCarbonReduction.toFixed(1)} kg
                  </p>
                  <p className="text-sm text-gray-500">CO₂ per unit</p>
                </div>
                <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Product Suggestions */}
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <Card key={`${suggestion.originalProduct}-${index}`} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">
                      {productNames[suggestion.originalProduct] || suggestion.originalProduct}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <h3 className="font-semibold text-lg text-green-600">
                      Eco Alternative
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <Badge className="bg-green-500">
                      +{suggestion.ecoImprovement}% Eco Score
                    </Badge>
                    <Badge variant={suggestion.costImpact > 0 ? "destructive" : "secondary"}>
                      {suggestion.costImpact > 0 ? '+' : ''}{suggestion.costImpact}% Cost
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{suggestion.customerRating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Carbon Reduction</p>
                  <p className="text-xl font-bold text-green-600">
                    -{suggestion.carbonReduction} kg CO₂
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Sustainability Features:</h4>
                  <div className="space-y-1">
                    {suggestion.sustainabilityFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Leaf className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Available From:</h4>
                  <div className="space-y-2">
                    {suggestion.availableFrom.map((supplier, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{supplier}</span>
                        <Badge variant="outline" className="text-xs">
                          {mockSuppliers.find(s => s.name === supplier)?.ecoScore || 'N/A'} Eco Score
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-green-800">AI Recommendation:</h5>
                    <p className="text-sm text-green-700">
                      This alternative offers significant environmental benefits with {
                        suggestion.costImpact > 10 
                          ? 'moderate cost increase' 
                          : suggestion.costImpact < -5 
                            ? 'cost savings' 
                            : 'minimal cost impact'
                      }. 
                      High customer satisfaction ({suggestion.customerRating}/5) and strong supplier availability make this a low-risk switch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Request Quote
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {suggestions.length === 0 && searchTerm && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions found</h3>
            <p className="text-gray-600">
              Try searching for different products or sustainability features.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
