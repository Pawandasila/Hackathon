import { Supplier, Warehouse, DeliveryRoute, EcoOptimizationResult, AIInsight, InventoryItem } from '@/types/supply-chain';

export class EcoOptimizationAI {
  // AI-driven Eco Route Optimization
  static optimizeDeliveryRoutes(routes: DeliveryRoute[], destinations: Array<{lat: number, lng: number}>): DeliveryRoute[] {
    return routes.map(route => {
      // Simulate AI optimization
      const carbonReduction = Math.random() * 0.3 + 0.1; // 10-40% reduction
      const optimizedRoute: DeliveryRoute = {
        ...route,
        carbonEmission: route.carbonEmission * (1 - carbonReduction),
        ecoScore: Math.min(100, route.ecoScore + (carbonReduction * 100)),
        cost: route.cost * (1 - carbonReduction * 0.5) // Cost savings from efficiency
      };
      return optimizedRoute;
    });
  }

  // Calculate eco-points for delivery routes
  static calculateRouteEcoPoints(route: DeliveryRoute): number {
    const basePoints = 100;
    const carbonPenalty = route.carbonEmission * 0.1;
    const transportModeBonus = this.getTransportModeBonus(route.transportMode);
    return Math.max(0, basePoints - carbonPenalty + transportModeBonus);
  }

  private static getTransportModeBonus(mode: string): number {
    const bonuses = {
      'electric-vehicle': 30,
      'train': 20,
      'ship': 15,
      'truck': 5,
      'plane': -10
    };
    return bonuses[mode as keyof typeof bonuses] || 0;
  }

  // Predictive Eco-Inventory Management
  static predictOptimalInventory(
    currentInventory: InventoryItem[],
    warehouses: Warehouse[],
    suppliers: Supplier[]
  ): {
    recommendations: Array<{
      action: string;
      product: string;
      from: string;
      to: string;
      quantity: number;
      ecoImpact: number;
      costImpact: number;
    }>;
    totalCarbonReduction: number;
  } {
    const recommendations: Array<{
      action: string;
      product: string;
      from: string;
      to: string;
      quantity: number;
      ecoImpact: number;
      costImpact: number;
    }> = [];

    let totalCarbonReduction = 0;

    // Simulate AI predictions for inventory optimization
    currentInventory.forEach(item => {
      const localSuppliers = suppliers.filter(s => 
        s.products.includes(item.productId) && 
        this.calculateDistance(s.location, warehouses.find(w => w.id === item.warehouseId)?.location!) < 500
      );

      if (localSuppliers.length > 0) {
        const bestLocalSupplier = localSuppliers.reduce((best, current) => 
          current.ecoScore > best.ecoScore ? current : best
        );

        const carbonReduction = Math.random() * 20 + 10; // 10-30kg CO2 reduction
        totalCarbonReduction += carbonReduction;

        recommendations.push({
          action: 'Switch to local supplier',
          product: item.productId,
          from: 'Current supplier',
          to: bestLocalSupplier.name,
          quantity: item.demandForecast,
          ecoImpact: carbonReduction,
          costImpact: Math.random() * 1000 - 500 // Random cost impact
        });
      }

      // Stock reallocation recommendations
      const otherWarehouses = warehouses.filter(w => w.id !== item.warehouseId);
      otherWarehouses.forEach(warehouse => {
        if (warehouse.currentStock[item.productId] > item.demandForecast * 1.5) {
          const transferQuantity = Math.floor(warehouse.currentStock[item.productId] * 0.3);
          const distance = this.calculateDistance(
            warehouses.find(w => w.id === item.warehouseId)?.location!,
            warehouse.location
          );
          
          if (distance < 200) { // Only recommend short-distance transfers
            recommendations.push({
              action: 'Reallocate stock',
              product: item.productId,
              from: warehouse.name,
              to: warehouses.find(w => w.id === item.warehouseId)?.name || '',
              quantity: transferQuantity,
              ecoImpact: distance * 0.1, // Reduced emissions from shorter supply chain
              costImpact: -distance * 2 // Cost savings from reduced transportation
            });
          }
        }
      });
    });

    return { recommendations, totalCarbonReduction };
  }

  // Supplier Eco-Ranking
  static rankSuppliersBySustainability(suppliers: Supplier[], productId: string): Supplier[] {
    return suppliers
      .filter(supplier => supplier.products.includes(productId))
      .sort((a, b) => {
        // Composite eco-score calculation
        const aScore = this.calculateCompositeEcoScore(a);
        const bScore = this.calculateCompositeEcoScore(b);
        return bScore - aScore;
      });
  }

  private static calculateCompositeEcoScore(supplier: Supplier): number {
    const weights = {
      ecoScore: 0.4,
      carbonFootprint: 0.3,
      renewableEnergy: 0.15,
      localSourcing: 0.15
    };

    return (
      supplier.ecoScore * weights.ecoScore +
      (100 - supplier.carbonFootprintPerKg) * weights.carbonFootprint +
      supplier.sustainabilityMetrics.renewableEnergyUsage * weights.renewableEnergy +
      supplier.sustainabilityMetrics.localSourcing * weights.localSourcing
    );
  }

  // Simulate supplier switching impact
  static simulateSupplierSwitch(
    currentSupplier: Supplier,
    newSupplier: Supplier,
    quantity: number
  ): {
    costDifference: number;
    carbonReduction: number;
    ecoPointsGain: number;
    overallImpact: 'positive' | 'negative' | 'neutral';
  } {
    const costDifference = (newSupplier.pricing['default'] || 0) - (currentSupplier.pricing['default'] || 0);
    const carbonReduction = (currentSupplier.carbonFootprintPerKg - newSupplier.carbonFootprintPerKg) * quantity;
    const ecoPointsGain = (newSupplier.ecoScore - currentSupplier.ecoScore) * 0.1;

    let overallImpact: 'positive' | 'negative' | 'neutral' = 'neutral';
    
    if (carbonReduction > 5 && ecoPointsGain > 0) {
      overallImpact = 'positive';
    } else if (carbonReduction < -5 || ecoPointsGain < -1) {
      overallImpact = 'negative';
    }

    return {
      costDifference: costDifference * quantity,
      carbonReduction,
      ecoPointsGain,
      overallImpact
    };
  }

  // Sustainable Product Suggestion Engine
  static suggestEcoAlternatives(productId: string, suppliers: Supplier[]): Array<{
    originalProduct: string;
    suggestedProduct: string;
    ecoImprovement: number;
    costImpact: number;
    availableFrom: string[];
  }> {
    // Simulate AI-powered product alternatives
    const alternatives = [
      {
        originalProduct: productId,
        suggestedProduct: `${productId}-eco`,
        ecoImprovement: Math.random() * 30 + 20, // 20-50% improvement
        costImpact: Math.random() * 200 - 100, // -100 to +100 cost difference
        availableFrom: suppliers.slice(0, 3).map(s => s.name)
      }
    ];

    return alternatives;
  }

  // Generate AI insights
  static generateAIInsights(
    inventory: InventoryItem[],
    suppliers: Supplier[],
    routes: DeliveryRoute[]
  ): AIInsight[] {
    const insights: AIInsight[] = [];

    // Demand prediction insight
    insights.push({
      id: 'demand-1',
      type: 'demand-prediction',
      title: 'Seasonal Demand Spike Predicted',
      description: 'AI models predict 25% increase in eco-friendly products demand next month',
      confidence: 0.87,
      actionRequired: true,
      suggestedActions: [
        'Increase inventory of sustainable products',
        'Contact eco-certified suppliers for bulk orders',
        'Optimize delivery routes for expected volume'
      ],
      impact: {
        environmental: 15,
        financial: 12000,
        operational: 8
      },
      timestamp: new Date()
    });

    // Route efficiency insight
    insights.push({
      id: 'route-1',
      type: 'route-efficiency',
      title: 'Route Optimization Opportunity Detected',
      description: 'AI found potential 18% reduction in carbon emissions by optimizing delivery clusters',
      confidence: 0.92,
      actionRequired: true,
      suggestedActions: [
        'Implement cluster-based delivery routing',
        'Consider electric vehicles for short-distance routes',
        'Consolidate shipments to reduce trip frequency'
      ],
      impact: {
        environmental: 22,
        financial: 8500,
        operational: 12
      },
      timestamp: new Date()
    });

    // Supplier optimization insight
    insights.push({
      id: 'supplier-1',
      type: 'supplier-optimization',
      title: 'High-Impact Supplier Switch Recommended',
      description: 'Switching to local supplier for 3 product categories could reduce carbon footprint by 30%',
      confidence: 0.79,
      actionRequired: false,
      suggestedActions: [
        'Evaluate local supplier capacity',
        'Negotiate pricing with sustainable suppliers',
        'Pilot program with recommended suppliers'
      ],
      impact: {
        environmental: 30,
        financial: -2500, // Slight cost increase but better sustainability
        operational: 5
      },
      timestamp: new Date()
    });

    return insights;
  }

  private static calculateDistance(point1: {latitude: number, longitude: number}, point2: {latitude: number, longitude: number}): number {
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}
