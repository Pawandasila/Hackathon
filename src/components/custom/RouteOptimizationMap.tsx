"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Truck, Leaf, TrendingDown, Zap } from 'lucide-react';
import { mockDeliveryRoutes, mockWarehouses } from '@/lib/mock-data';
import { EcoOptimizationAI } from '@/lib/ai-optimization';

export default function RouteOptimizationMap() {
  const [optimizedRoutes, setOptimizedRoutes] = useState<any[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimizeRoutes = () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      const destinations = mockWarehouses.map(w => ({
        lat: w.location.latitude,
        lng: w.location.longitude
      }));
      
      const optimized = EcoOptimizationAI.optimizeDeliveryRoutes(mockDeliveryRoutes, destinations);
      setOptimizedRoutes(optimized);
      setIsOptimizing(false);
    }, 2000);
  };

  const calculateTotalSavings = () => {
    if (optimizedRoutes.length === 0) return { carbon: 0, cost: 0 };
    
    const carbonSaved = mockDeliveryRoutes.reduce((sum, route, index) => {
      const optimized = optimizedRoutes[index];
      return sum + (route.carbonEmission - optimized.carbonEmission);
    }, 0);
    
    const costSaved = mockDeliveryRoutes.reduce((sum, route, index) => {
      const optimized = optimizedRoutes[index];
      return sum + (route.cost - optimized.cost);
    }, 0);
    
    return { carbon: carbonSaved, cost: costSaved };
  };

  const savings = calculateTotalSavings();

  return (
    <div className="space-y-6">
      {/* Header with Optimization Button */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-blue-600" />
              AI-Driven Eco Route Optimization
            </span>
            <Button 
              onClick={handleOptimizeRoutes}
              disabled={isOptimizing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isOptimizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Optimize Routes
                </>
              )}
            </Button>
          </CardTitle>
          <p className="text-gray-600">
            Optimize delivery routes for minimum carbon emissions and maximum efficiency
          </p>
        </CardHeader>
      </Card>

      {/* Savings Summary */}
      {optimizedRoutes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Carbon Saved</p>
                  <p className="text-3xl font-bold text-green-600 flex items-center">
                    <TrendingDown className="h-6 w-6 mr-1" />
                    {savings.carbon.toFixed(1)} kg CO₂
                  </p>
                  <p className="text-sm text-gray-500">
                    {((savings.carbon / mockDeliveryRoutes.reduce((sum, r) => sum + r.carbonEmission, 0)) * 100).toFixed(1)}% reduction
                  </p>
                </div>
                <Leaf className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cost Saved</p>
                  <p className="text-3xl font-bold text-blue-600 flex items-center">
                    <TrendingDown className="h-6 w-6 mr-1" />
                    ${savings.cost.toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {((savings.cost / mockDeliveryRoutes.reduce((sum, r) => sum + r.cost, 0)) * 100).toFixed(1)}% reduction
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Route Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Route Analysis & Optimization Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDeliveryRoutes.map((route, index) => {
              const optimized = optimizedRoutes[index];
              const carbonSaved = optimized ? route.carbonEmission - optimized.carbonEmission : 0;
              const costSaved = optimized ? route.cost - optimized.cost : 0;
              
              return (
                <div key={route.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        {route.from} → {route.to}
                      </h3>
                      <p className="text-sm text-gray-600">{route.distance} km • {route.estimatedTime} min</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {route.transportMode.replace('-', ' ')}
                      </Badge>
                      {optimized && (
                        <Badge className="bg-green-500">
                          Optimized
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Current Emissions</p>
                      <p className="font-medium">{route.carbonEmission} kg CO₂</p>
                      {optimized && (
                        <p className="text-green-600 text-sm">
                          → {optimized.carbonEmission.toFixed(1)} kg CO₂
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Cost</p>
                      <p className="font-medium">${route.cost}</p>
                      {optimized && (
                        <p className="text-blue-600 text-sm">
                          → ${optimized.cost.toFixed(0)}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Eco Score</p>
                      <p className="font-medium">{route.ecoScore}/100</p>
                      {optimized && (
                        <p className="text-green-600 text-sm">
                          → {optimized.ecoScore.toFixed(0)}/100
                        </p>
                      )}
                    </div>
                    {optimized && (
                      <div>
                        <p className="text-xs text-gray-500">Improvement</p>
                        <p className="font-medium text-green-600">
                          -{carbonSaved.toFixed(1)} kg CO₂
                        </p>
                        <p className="text-blue-600 text-sm">
                          -${costSaved.toFixed(0)}
                        </p>
                      </div>
                    )}
                  </div>

                  {optimized && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">AI Optimization Suggestions:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Cluster deliveries to reduce total distance by {((route.distance - (route.distance * 0.85)) / route.distance * 100).toFixed(0)}%</li>
                        <li>• Optimize load consolidation for better fuel efficiency</li>
                        {route.transportMode === 'truck' && (
                          <li>• Consider electric vehicle for routes under 300km</li>
                        )}
                        <li>• Schedule deliveries during off-peak hours to reduce traffic delays</li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Route Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">Interactive route map would be displayed here</p>
              <p className="text-sm text-gray-500">Showing optimized vs. current routes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
