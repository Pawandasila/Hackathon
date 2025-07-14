"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  BarChart3
} from "lucide-react";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Product = {
    id: string;
    name: string;
    description: string;
    image?: string;
    createdAt: string;
    status: 'active' | 'inactive';
    category: string;
    price: number;
    sustainability_score: number;
};

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function ProductsPage() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            name: 'Eco-Friendly Water Bottle',
            description: 'Sustainable water bottle made from recycled materials with advanced filtration system.',
            createdAt: '2024-01-15',
            status: 'active',
            category: 'Drinkware',
            price: 29.99,
            sustainability_score: 95
        },
        {
            id: '2',
            name: 'Organic Cotton T-Shirt',
            description: 'Comfortable t-shirt made from 100% organic cotton, ethically sourced and produced.',
            createdAt: '2024-01-14',
            status: 'active',
            category: 'Clothing',
            price: 39.99,
            sustainability_score: 88
        },
        {
            id: '3',
            name: 'Solar Power Bank',
            description: 'Portable charger with solar panel technology for eco-friendly device charging.',
            createdAt: '2024-01-13',
            status: 'inactive',
            category: 'Electronics',
            price: 89.99,
            sustainability_score: 92
        },
        {
            id: '4',
            name: 'Bamboo Phone Case',
            description: 'Durable phone protection made from sustainable bamboo materials.',
            createdAt: '2024-01-12',
            status: 'active',
            category: 'Accessories',
            price: 24.99,
            sustainability_score: 85
        },
        {
            id: '5',
            name: 'Reusable Food Containers',
            description: 'Set of glass containers perfect for meal prep and food storage.',
            createdAt: '2024-01-11',
            status: 'active',
            category: 'Kitchen',
            price: 59.99,
            sustainability_score: 90
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleProductStatus = (id: string) => {
        setProducts(products.map(product => 
            product.id === id 
                ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
                : product
        ));
    };

    const deleteProduct = (id: string) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

    const stats = {
        totalProducts: products.length,
        activeProducts: products.filter(p => p.status === 'active').length,
        inactiveProducts: products.filter(p => p.status === 'inactive').length,
        avgSustainabilityScore: Math.round(products.reduce((acc, p) => acc + p.sustainability_score, 0) / products.length)
    };

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col h-full">
         

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                +2 from last month
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((stats.activeProducts / stats.totalProducts) * 100)}% of total
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inactive Products</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.inactiveProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                Needs attention
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Eco Score</CardTitle>
                            <BarChart3 className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.avgSustainabilityScore}</div>
                            <p className="text-xs text-muted-foreground">
                                +5% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Inventory</CardTitle>
                        <CardDescription>
                            Manage your sustainable product catalog
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Category: {selectedCategory}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {categories.map((category) => (
                                            <DropdownMenuItem
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                
                                <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Eco Score</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <Package className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{product.name}</div>
                                                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                            {product.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{product.category}</Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">${product.price}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-green-600 h-2 rounded-full" 
                                                            style={{ width: `${product.sustainability_score}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium">{product.sustainability_score}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant={product.status === 'active' ? 'default' : 'secondary'}
                                                    className={product.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                                >
                                                    {product.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(product.createdAt)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Product
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => toggleProductStatus(product.id)}
                                                        >
                                                            {product.status === 'active' ? (
                                                                <>
                                                                    <XCircle className="mr-2 h-4 w-4" />
                                                                    Deactivate
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                                    Activate
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => deleteProduct(product.id)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No products found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm || selectedCategory !== 'all' 
                                        ? 'Try adjusting your search or filter criteria.' 
                                        : 'Get started by adding your first product.'
                                    }
                                </p>
                                {!searchTerm && selectedCategory === 'all' && (
                                    <div className="mt-6">
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Product
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    );
}
