export interface Supplier {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    country: string;
    region: string;
  };
  ecoScore: number;
  certifications: string[];
  carbonFootprintPerKg: number;
  sustainabilityMetrics: {
    renewableEnergyUsage: number;
    wasteReduction: number;
    waterConservation: number;
    localSourcing: number;
  };
  products: string[];
  pricing: { [productId: string]: number };
  leadTime: number;
  reliability: number;
  minimumOrderQuantity: number;
}

export interface Warehouse {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  capacity: number;
  currentStock: { [productId: string]: number };
  energyEfficiency: number;
  solarPowered: boolean;
  wasteManagement: number;
}

export interface DeliveryRoute {
  id: string;
  from: string;
  to: string;
  distance: number;
  estimatedTime: number;
  carbonEmission: number;
  cost: number;
  ecoScore: number;
  transportMode: 'truck' | 'train' | 'ship' | 'plane' | 'electric-vehicle';
}

export interface EcoOptimizationResult {
  originalCost: number;
  optimizedCost: number;
  originalCarbonFootprint: number;
  optimizedCarbonFootprint: number;
  ecoPointsGained: number;
  recommendations: Recommendation[];
  supplierChanges: SupplierChange[];
  routeOptimizations: RouteOptimization[];
}

export interface Recommendation {
  id: string;
  type: 'supplier-switch' | 'route-optimization' | 'inventory-reallocation' | 'product-substitution';
  title: string;
  description: string;
  impact: {
    costSaving: number;
    carbonReduction: number;
    ecoPointsGain: number;
  };
  priority: 'high' | 'medium' | 'low';
  implementationTime: string;
}

export interface SupplierChange {
  productId: string;
  currentSupplier: string;
  suggestedSupplier: string;
  costDifference: number;
  carbonReduction: number;
  ecoScoreImprovement: number;
}

export interface RouteOptimization {
  routeId: string;
  currentRoute: DeliveryRoute;
  optimizedRoute: DeliveryRoute;
  carbonSaved: number;
  costSaved: number;
}

export interface InventoryItem {
  productId: string;
  warehouseId: string;
  currentStock: number;
  demandForecast: number;
  reorderPoint: number;
  supplier: string;
  lastRestocked: Date;
  expiryDate?: Date;
  ecoScore: number;
}

export interface AIInsight {
  id: string;
  type: 'demand-prediction' | 'supplier-optimization' | 'route-efficiency' | 'sustainability-alert';
  title: string;
  description: string;
  confidence: number;
  actionRequired: boolean;
  suggestedActions: string[];
  impact: {
    environmental: number;
    financial: number;
    operational: number;
  };
  timestamp: Date;
}

export interface ESGMetrics {
  environmental: {
    carbonFootprint: number;
    renewableEnergyUsage: number;
    wasteReduction: number;
    waterConservation: number;
  };
  social: {
    localSourcingPercentage: number;
    fairTradeCompliance: number;
    communityImpact: number;
  };
  governance: {
    transparencyScore: number;
    ethicalSourcing: number;
    complianceRating: number;
  };
  overallScore: number;
}
