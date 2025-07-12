"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, TrendingUp, TrendingDown, Leaf, DollarSign } from 'lucide-react';
import { EcoOptimizationAI } from '@/lib/ai-optimization';
import { mockSuppliers, productNames } from '@/lib/mock-data';
import { Supplier } from '@/types/supply-chain';

export default function SupplierSwitchSimulator() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [currentSupplier, setCurrentSupplier] = useState<string>('');
  const [newSupplier, setNewSupplier] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const productIds = Object.keys(productNames);
  const availableSuppliers = selectedProduct 
    ? mockSuppliers.filter(s => s.products.includes(selectedProduct))
    : [];

  const handleSimulate = () => {
    if (!currentSupplier || !newSupplier || !selectedProduct) return;

    const currentSup = mockSuppliers.find(s => s.id === currentSupplier);
    const newSup = mockSuppliers.find(s => s.id === newSupplier);

    if (currentSup && newSup) {
      const result = EcoOptimizationAI.simulateSupplierSwitch(currentSup, newSup, quantity);
      setSimulationResult(result);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Leaf className="h-6 w-6 mr-2 text-green-600" />
          Supplier Switch Impact Simulator
        </CardTitle>
        <p className="text-gray-600">
          Simulate the environmental and cost impact of switching suppliers
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product</label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {productIds.map(id => (
                  <SelectItem key={id} value={id}>
                    {productNames[id]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Supplier</label>
            <Select value={currentSupplier} onValueChange={setCurrentSupplier}>
              <SelectTrigger>
                <SelectValue placeholder="Select current supplier" />
              </SelectTrigger>
              <SelectContent>
                {availableSuppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">New Supplier</label>
            <Select value={newSupplier} onValueChange={setNewSupplier}>
              <SelectTrigger>
                <SelectValue placeholder="Select new supplier" />
              </SelectTrigger>
              <SelectContent>
                {availableSuppliers.filter(s => s.id !== currentSupplier).map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="1"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleSimulate}
            disabled={!currentSupplier || !newSupplier || !selectedProduct}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Simulate Impact
          </Button>
        </div>

        {/* Simulation Results */}
        {simulationResult && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Simulation Results</h3>
            
            {/* Overall Impact Badge */}
            <div className="flex justify-center">
              <Badge 
                variant={simulationResult.overallImpact === 'positive' ? 'default' : 
                        simulationResult.overallImpact === 'negative' ? 'destructive' : 'secondary'}
                className={`text-lg px-4 py-2 ${
                  simulationResult.overallImpact === 'positive' ? 'bg-green-500' : ''
                }`}
              >
                Overall Impact: {simulationResult.overallImpact.toUpperCase()}
              </Badge>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Carbon Impact</p>
                      <p className="text-2xl font-bold flex items-center">
                        {simulationResult.carbonReduction > 0 ? (
                          <>
                            <TrendingDown className="h-5 w-5 text-green-500 mr-1" />
                            -{Math.abs(simulationResult.carbonReduction).toFixed(1)} kg CO₂
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-5 w-5 text-red-500 mr-1" />
                            +{Math.abs(simulationResult.carbonReduction).toFixed(1)} kg CO₂
                          </>
                        )}
                      </p>
                    </div>
                    <Leaf className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Cost Impact</p>
                      <p className="text-2xl font-bold flex items-center">
                        {simulationResult.costDifference < 0 ? (
                          <>
                            <TrendingDown className="h-5 w-5 text-green-500 mr-1" />
                            -${Math.abs(simulationResult.costDifference).toFixed(0)}
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-5 w-5 text-red-500 mr-1" />
                            +${Math.abs(simulationResult.costDifference).toFixed(0)}
                          </>
                        )}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Eco Points</p>
                      <p className="text-2xl font-bold flex items-center">
                        {simulationResult.ecoPointsGain > 0 ? (
                          <>
                            <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                            +{simulationResult.ecoPointsGain.toFixed(1)}
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-5 w-5 text-red-500 mr-1" />
                            {simulationResult.ecoPointsGain.toFixed(1)}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      E
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supplier Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Supplier</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentSupplier && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">
                        {mockSuppliers.find(s => s.id === currentSupplier)?.name}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Eco Score:</span>
                          <span className="font-medium">
                            {mockSuppliers.find(s => s.id === currentSupplier)?.ecoScore}/100
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbon Footprint:</span>
                          <span className="font-medium">
                            {mockSuppliers.find(s => s.id === currentSupplier)?.carbonFootprintPerKg} kg/kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Renewable Energy:</span>
                          <span className="font-medium">
                            {mockSuppliers.find(s => s.id === currentSupplier)?.sustainabilityMetrics.renewableEnergyUsage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    New Supplier
                    <ArrowRight className="h-5 w-5 mx-2 text-blue-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {newSupplier && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">
                        {mockSuppliers.find(s => s.id === newSupplier)?.name}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Eco Score:</span>
                          <span className="font-medium">
                            {mockSuppliers.find(s => s.id === newSupplier)?.ecoScore}/100
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbon Footprint:</span>
                          <span className="font-medium">
                            {mockSuppliers.find(s => s.id === newSupplier)?.carbonFootprintPerKg} kg/kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Renewable Energy:</span>
                          <span className="font-medium">
                            {mockSuppliers.find(s => s.id === newSupplier)?.sustainabilityMetrics.renewableEnergyUsage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
