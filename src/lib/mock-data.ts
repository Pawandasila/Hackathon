import { Supplier, Warehouse, DeliveryRoute, InventoryItem } from '@/types/supply-chain';

export const mockSuppliers: Supplier[] = [
  {
    id: 'supplier-1',
    name: 'GreenTech Solutions',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Eco Avenue, New York, NY',
      country: 'USA',
      region: 'Northeast'
    },
    ecoScore: 92,
    certifications: ['Organic', 'Fair Trade', 'Carbon Neutral', 'B-Corp'],
    carbonFootprintPerKg: 0.8,
    sustainabilityMetrics: {
      renewableEnergyUsage: 95,
      wasteReduction: 88,
      waterConservation: 90,
      localSourcing: 85
    },
    products: ['prod-1', 'prod-2', 'prod-3'],
    pricing: { 'prod-1': 25, 'prod-2': 30, 'prod-3': 45 },
    leadTime: 3,
    reliability: 96,
    minimumOrderQuantity: 100
  },
  {
    id: 'supplier-2',
    name: 'Sustainable Goods Co.',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '456 Green Street, Los Angeles, CA',
      country: 'USA',
      region: 'West Coast'
    },
    ecoScore: 88,
    certifications: ['Organic', 'LEED Certified', 'Rainforest Alliance'],
    carbonFootprintPerKg: 1.2,
    sustainabilityMetrics: {
      renewableEnergyUsage: 80,
      wasteReduction: 92,
      waterConservation: 85,
      localSourcing: 75
    },
    products: ['prod-1', 'prod-4', 'prod-5'],
    pricing: { 'prod-1': 22, 'prod-4': 35, 'prod-5': 40 },
    leadTime: 5,
    reliability: 94,
    minimumOrderQuantity: 200
  },
  {
    id: 'supplier-3',
    name: 'EcoFirst Manufacturing',
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      address: '789 Sustainability Blvd, Chicago, IL',
      country: 'USA',
      region: 'Midwest'
    },
    ecoScore: 85,
    certifications: ['ISO 14001', 'Energy Star', 'Cradle to Cradle'],
    carbonFootprintPerKg: 1.5,
    sustainabilityMetrics: {
      renewableEnergyUsage: 70,
      wasteReduction: 85,
      waterConservation: 80,
      localSourcing: 90
    },
    products: ['prod-2', 'prod-3', 'prod-6'],
    pricing: { 'prod-2': 28, 'prod-3': 42, 'prod-6': 50 },
    leadTime: 4,
    reliability: 92,
    minimumOrderQuantity: 150
  },
  {
    id: 'supplier-4',
    name: 'Traditional Supply Corp',
    location: {
      latitude: 29.7604,
      longitude: -95.3698,
      address: '321 Industrial Way, Houston, TX',
      country: 'USA',
      region: 'South'
    },
    ecoScore: 65,
    certifications: ['ISO 9001'],
    carbonFootprintPerKg: 2.8,
    sustainabilityMetrics: {
      renewableEnergyUsage: 25,
      wasteReduction: 45,
      waterConservation: 40,
      localSourcing: 30
    },
    products: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6'],
    pricing: { 'prod-1': 18, 'prod-2': 20, 'prod-3': 35, 'prod-4': 28, 'prod-5': 32, 'prod-6': 38 },
    leadTime: 7,
    reliability: 89,
    minimumOrderQuantity: 500
  }
];

export const mockWarehouses: Warehouse[] = [
  {
    id: 'warehouse-1',
    name: 'Northeast Distribution Center',
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: '100 Warehouse District, New York, NY'
    },
    capacity: 50000,
    currentStock: {
      'prod-1': 1200,
      'prod-2': 800,
      'prod-3': 600,
      'prod-4': 400,
      'prod-5': 300,
      'prod-6': 250
    },
    energyEfficiency: 85,
    solarPowered: true,
    wasteManagement: 90
  },
  {
    id: 'warehouse-2',
    name: 'West Coast Hub',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '200 Logistics Lane, Los Angeles, CA'
    },
    capacity: 60000,
    currentStock: {
      'prod-1': 1500,
      'prod-2': 1000,
      'prod-3': 800,
      'prod-4': 600,
      'prod-5': 500,
      'prod-6': 400
    },
    energyEfficiency: 92,
    solarPowered: true,
    wasteManagement: 88
  },
  {
    id: 'warehouse-3',
    name: 'Midwest Fulfillment',
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      address: '300 Supply Chain Ave, Chicago, IL'
    },
    capacity: 45000,
    currentStock: {
      'prod-1': 1000,
      'prod-2': 700,
      'prod-3': 500,
      'prod-4': 350,
      'prod-5': 250,
      'prod-6': 200
    },
    energyEfficiency: 78,
    solarPowered: false,
    wasteManagement: 82
  }
];

export const mockDeliveryRoutes: DeliveryRoute[] = [
  {
    id: 'route-1',
    from: 'warehouse-1',
    to: 'Northeast Stores',
    distance: 150,
    estimatedTime: 180,
    carbonEmission: 45.2,
    cost: 320,
    ecoScore: 75,
    transportMode: 'truck'
  },
  {
    id: 'route-2',
    from: 'warehouse-2',
    to: 'West Coast Stores',
    distance: 200,
    estimatedTime: 240,
    carbonEmission: 52.8,
    cost: 420,
    ecoScore: 72,
    transportMode: 'electric-vehicle'
  },
  {
    id: 'route-3',
    from: 'warehouse-3',
    to: 'Midwest Stores',
    distance: 120,
    estimatedTime: 150,
    carbonEmission: 38.4,
    cost: 280,
    ecoScore: 78,
    transportMode: 'truck'
  },
  {
    id: 'route-4',
    from: 'warehouse-1',
    to: 'Southeast Stores',
    distance: 800,
    estimatedTime: 1200,
    carbonEmission: 180.5,
    cost: 950,
    ecoScore: 45,
    transportMode: 'truck'
  },
  {
    id: 'route-5',
    from: 'warehouse-2',
    to: 'Mountain West Stores',
    distance: 600,
    estimatedTime: 900,
    carbonEmission: 120.3,
    cost: 750,
    ecoScore: 55,
    transportMode: 'train'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    productId: 'prod-1',
    warehouseId: 'warehouse-1',
    currentStock: 1200,
    demandForecast: 300,
    reorderPoint: 400,
    supplier: 'supplier-1',
    lastRestocked: new Date('2024-12-01'),
    ecoScore: 85
  },
  {
    productId: 'prod-2',
    warehouseId: 'warehouse-1',
    currentStock: 800,
    demandForecast: 250,
    reorderPoint: 300,
    supplier: 'supplier-3',
    lastRestocked: new Date('2024-11-28'),
    ecoScore: 78
  },
  {
    productId: 'prod-3',
    warehouseId: 'warehouse-2',
    currentStock: 800,
    demandForecast: 200,
    reorderPoint: 250,
    supplier: 'supplier-1',
    lastRestocked: new Date('2024-12-03'),
    ecoScore: 90
  },
  {
    productId: 'prod-4',
    warehouseId: 'warehouse-2',
    currentStock: 600,
    demandForecast: 180,
    reorderPoint: 200,
    supplier: 'supplier-2',
    lastRestocked: new Date('2024-11-30'),
    ecoScore: 82
  },
  {
    productId: 'prod-5',
    warehouseId: 'warehouse-3',
    currentStock: 250,
    demandForecast: 120,
    reorderPoint: 150,
    supplier: 'supplier-2',
    lastRestocked: new Date('2024-12-02'),
    ecoScore: 88
  },
  {
    productId: 'prod-6',
    warehouseId: 'warehouse-3',
    currentStock: 200,
    demandForecast: 100,
    reorderPoint: 120,
    supplier: 'supplier-3',
    lastRestocked: new Date('2024-11-29'),
    ecoScore: 75
  }
];

export const productNames: { [key: string]: string } = {
  'prod-1': 'Eco-Friendly Cleaning Supplies',
  'prod-2': 'Sustainable Packaging Materials',
  'prod-3': 'Organic Personal Care Products',
  'prod-4': 'Renewable Energy Equipment',
  'prod-5': 'Biodegradable Kitchenware',
  'prod-6': 'Recycled Office Supplies'
};
