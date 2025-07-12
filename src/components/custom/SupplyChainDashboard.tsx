"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Leaf, Truck, Factory, MapPin, 
  AlertTriangle, CheckCircle, DollarSign, Zap, Recycle
} from 'lucide-react';
import { EcoOptimizationAI } from '@/lib/ai-optimization';
import { mockSuppliers, mockWarehouses, mockDeliveryRoutes, mockInventory, productNames } from '@/lib/mock-data';
import { Supplier, Warehouse, DeliveryRoute, AIInsight, EcoOptimizationResult } from '@/types/supply-chain';
import SupplierSwitchSimulator from './SupplierSwitchSimulator';
import RouteOptimizationMap from './RouteOptimizationMap';
import ProductSuggestionEngine from './ProductSuggestionEngine';
import ESGMetricsDashboard from './ESGMetricsDashboard';

const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6'];

export default function SupplyChainDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [optimizationResult, setOptimizationResult] = useState<EcoOptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // Generate AI insights on component mount
    const insights = EcoOptimizationAI.generateAIInsights(mockInventory, mockSuppliers, mockDeliveryRoutes);
    setAiInsights(insights);
  }, []);

  const handleOptimizeSupplyChain = async () => {
    setIsOptimizing(true);
    
    // Simulate AI optimization process
    setTimeout(() => {
      const optimizedRoutes = EcoOptimizationAI.optimizeDeliveryRoutes(mockDeliveryRoutes, []);
      const inventoryOptimization = EcoOptimizationAI.predictOptimalInventory(mockInventory, mockWarehouses, mockSuppliers);
      
      const result: EcoOptimizationResult = {
        originalCost: 125000,
        optimizedCost: 108500,
        originalCarbonFootprint: 2450,
        optimizedCarbonFootprint: 1820,
        ecoPointsGained: 1250,
        recommendations: [
          {
            id: 'rec-1',
            type: 'supplier-switch',
            title: 'Switch to Local Suppliers',
            description: 'Replace 3 traditional suppliers with local eco-certified alternatives',
            impact: { costSaving: 8500, carbonReduction: 380, ecoPointsGain: 450 },
            priority: 'high',
            implementationTime: '2-3 weeks'
          },
          {
            id: 'rec-2',
            type: 'route-optimization',
            title: 'Optimize Delivery Clusters',
            description: 'Implement AI-driven route clustering for 18% emission reduction',
            impact: { costSaving: 5200, carbonReduction: 180, ecoPointsGain: 320 },
            priority: 'high',
            implementationTime: '1 week'
          },
          {
            id: 'rec-3',
            type: 'inventory-reallocation',
            title: 'Smart Inventory Redistribution',
            description: 'Reallocate excess inventory to reduce emergency shipments',
            impact: { costSaving: 2800, carbonReduction: 70, ecoPointsGain: 180 },
            priority: 'medium',
            implementationTime: '3-5 days'
          }
        ],
        supplierChanges: [],
        routeOptimizations: []
      };
      
      setOptimizationResult(result);
      setIsOptimizing(false);
    }, 3000);
  };

  const supplierData = mockSuppliers.map(supplier => ({
    name: supplier.name,
    ecoScore: supplier.ecoScore,
    carbonFootprint: supplier.carbonFootprintPerKg,
    cost: Object.values(supplier.pricing).reduce((sum, price) => sum + price, 0) / Object.values(supplier.pricing).length
  }));

  const routeEfficiencyData = mockDeliveryRoutes.map(route => ({
    name: route.to,
    currentEmissions: route.carbonEmission,
    optimizedEmissions: route.carbonEmission * 0.75,
    cost: route.cost
  }));

  const warehouseEfficiencyData = mockWarehouses.map(warehouse => ({
    name: warehouse.name,
    efficiency: warehouse.energyEfficiency,
    solarPowered: warehouse.solarPowered ? 100 : 0,
    wasteManagement: warehouse.wasteManagement
  }));

  const inventoryByProduct = mockInventory.map(item => ({
    name: productNames[item.productId] || item.productId,
    currentStock: item.currentStock,
    demandForecast: item.demandForecast,
    ecoScore: item.ecoScore
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI-Powered Sustainable Supply Chain Optimizer
          </h1>
          <p className="text-lg text-gray-600">
            Optimize your retail supply chain for maximum sustainability and efficiency
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Carbon Saved</p>
                  <p className="text-3xl font-bold">630 kg</p>
                </div>
                <Leaf className="h-12 w-12 text-green-200" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-25% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Cost Savings</p>
                  <p className="text-3xl font-bold">$16.5K</p>
                </div>
                <DollarSign className="h-12 w-12 text-blue-200" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+13% efficiency</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Eco Points Gained</p>
                  <p className="text-3xl font-bold">2,840</p>
                </div>
                <Zap className="h-12 w-12 text-purple-200" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+18% increase</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Green Score</p>
                  <p className="text-3xl font-bold">8.7/10</p>
                </div>
                <Recycle className="h-12 w-12 text-orange-200" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Excellent rating</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Optimization Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={handleOptimizeSupplyChain}
            disabled={isOptimizing}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg"
          >
            {isOptimizing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                AI Optimizing Supply Chain...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Run AI Supply Chain Optimization
              </>
            )}
          </Button>
        </div>

        {/* Optimization Results */}
        {optimizationResult && (
          <Card className="mb-8 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                AI Optimization Complete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Cost Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${(optimizationResult.originalCost - optimizationResult.optimizedCost).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(((optimizationResult.originalCost - optimizationResult.optimizedCost) / optimizationResult.originalCost) * 100).toFixed(1)}% reduction
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Carbon Reduction</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {(optimizationResult.originalCarbonFootprint - optimizationResult.optimizedCarbonFootprint).toFixed(0)} kg CO₂
                  </p>
                  <p className="text-sm text-gray-500">
                    {(((optimizationResult.originalCarbonFootprint - optimizationResult.optimizedCarbonFootprint) / optimizationResult.originalCarbonFootprint) * 100).toFixed(1)}% reduction
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Eco Points Gained</p>
                  <p className="text-2xl font-bold text-purple-600">
                    +{optimizationResult.ecoPointsGained}
                  </p>
                  <p className="text-sm text-gray-500">Sustainability boost</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Top Recommendations:</h4>
                {optimizationResult.recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'}>
                      {rec.priority}
                    </Badge>
                    <div className="flex-1">
                      <h5 className="font-medium">{rec.title}</h5>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                      <div className="flex space-x-4 mt-2 text-sm">
                        <span className="text-green-600">Save: ${rec.impact.costSaving}</span>
                        <span className="text-blue-600">-{rec.impact.carbonReduction}kg CO₂</span>
                        <span className="text-purple-600">+{rec.impact.ecoPointsGain} eco points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="simulator">Simulator</TabsTrigger>
            <TabsTrigger value="route-map">Route Opt</TabsTrigger>
            <TabsTrigger value="product-engine">Products</TabsTrigger>
            <TabsTrigger value="esg">ESG</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Carbon Footprint</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={routeEfficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="currentEmissions" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="Current Emissions (kg CO₂)" />
                      <Area type="monotone" dataKey="optimizedEmissions" stackId="2" stroke="#10B981" fill="#D1FAE5" name="Optimized Emissions (kg CO₂)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supplier Sustainability Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={supplierData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ecoScore" fill="#10B981" name="Eco Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Factory className="h-5 w-5 mr-2" />
                  Supplier Eco-Ranking & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSuppliers.map((supplier) => (
                    <div key={supplier.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{supplier.name}</h3>
                          <p className="text-sm text-gray-600">{supplier.location.address}</p>
                        </div>
                        <Badge 
                          variant={supplier.ecoScore >= 90 ? 'default' : supplier.ecoScore >= 80 ? 'secondary' : 'destructive'}
                          className={supplier.ecoScore >= 90 ? 'bg-green-500' : ''}
                        >
                          Eco Score: {supplier.ecoScore}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Carbon Footprint</p>
                          <p className="font-medium">{supplier.carbonFootprintPerKg} kg/kg</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Renewable Energy</p>
                          <p className="font-medium">{supplier.sustainabilityMetrics.renewableEnergyUsage}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Local Sourcing</p>
                          <p className="font-medium">{supplier.sustainabilityMetrics.localSourcing}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Lead Time</p>
                          <p className="font-medium">{supplier.leadTime} days</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {supplier.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  AI-Driven Eco Route Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={routeEfficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="currentEmissions" fill="#EF4444" name="Current Emissions (kg CO₂)" />
                      <Bar dataKey="optimizedEmissions" fill="#10B981" name="Optimized Emissions (kg CO₂)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  {mockDeliveryRoutes.map((route) => (
                    <div key={route.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{route.from} → {route.to}</h3>
                          <p className="text-sm text-gray-600">{route.distance} km • {route.estimatedTime} minutes</p>
                        </div>
                        <Badge variant={route.ecoScore >= 75 ? 'default' : 'secondary'}>
                          Eco Score: {route.ecoScore}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Carbon Emission</p>
                          <p className="font-medium">{route.carbonEmission} kg CO₂</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Cost</p>
                          <p className="font-medium">${route.cost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Transport Mode</p>
                          <p className="font-medium capitalize">{route.transportMode.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Eco-Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={inventoryByProduct}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="currentStock" fill="#3B82F6" name="Current Stock" />
                      <Bar dataKey="demandForecast" fill="#10B981" name="Demand Forecast" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  {mockInventory.map((item) => (
                    <div key={`${item.productId}-${item.warehouseId}`} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{productNames[item.productId]}</h3>
                          <p className="text-sm text-gray-600">
                            Warehouse: {mockWarehouses.find(w => w.id === item.warehouseId)?.name}
                          </p>
                        </div>
                        <Badge variant={item.ecoScore >= 85 ? 'default' : 'secondary'}>
                          Eco Score: {item.ecoScore}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Current Stock</p>
                          <p className="font-medium">{item.currentStock} units</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Demand Forecast</p>
                          <p className="font-medium">{item.demandForecast} units</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Reorder Point</p>
                          <p className="font-medium">{item.reorderPoint} units</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="warehouses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Warehouse Sustainability Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={warehouseEfficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="efficiency" fill="#3B82F6" name="Energy Efficiency %" />
                      <Bar dataKey="wasteManagement" fill="#10B981" name="Waste Management %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  {mockWarehouses.map((warehouse) => (
                    <div key={warehouse.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{warehouse.name}</h3>
                          <p className="text-sm text-gray-600">{warehouse.location.address}</p>
                        </div>
                        <div className="flex space-x-2">
                          {warehouse.solarPowered && (
                            <Badge className="bg-yellow-500">Solar Powered</Badge>
                          )}
                          <Badge variant="outline">
                            Capacity: {warehouse.capacity.toLocaleString()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Energy Efficiency</p>
                          <p className="font-medium">{warehouse.energyEfficiency}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Waste Management</p>
                          <p className="font-medium">{warehouse.wasteManagement}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Stock</p>
                          <p className="font-medium">
                            {Object.values(warehouse.currentStock).reduce((sum, stock) => sum + stock, 0)} units
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  AI-Generated Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start space-x-3">
                          {insight.actionRequired ? (
                            <AlertTriangle className="h-5 w-5 text-orange-500 mt-1" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                          )}
                          <div>
                            <h3 className="font-semibold">{insight.title}</h3>
                            <p className="text-sm text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {(insight.confidence * 100).toFixed(0)}% confidence
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Environmental Impact</p>
                          <p className="font-medium text-green-600">+{insight.impact.environmental}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Financial Impact</p>
                          <p className={`font-medium ${insight.impact.financial > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${insight.impact.financial.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Operational Impact</p>
                          <p className="font-medium text-blue-600">+{insight.impact.operational}%</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Suggested Actions:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {insight.suggestedActions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <SupplierSwitchSimulator />
          </TabsContent>

          <TabsContent value="route-map" className="space-y-6">
            <RouteOptimizationMap />
          </TabsContent>

          <TabsContent value="product-engine" className="space-y-6">
            <ProductSuggestionEngine />
          </TabsContent>

          <TabsContent value="esg" className="space-y-6">
            <ESGMetricsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
