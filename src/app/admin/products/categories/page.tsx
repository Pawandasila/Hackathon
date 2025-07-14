"use client";

import { useState } from "react";
import { 
  Package, 
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter
} from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

type Category = {
    id: string;
    name: string;
    description: string;
    productCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
};

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: '1',
            name: 'Drinkware',
            description: 'Sustainable bottles, cups, and drinking accessories',
            productCount: 12,
            status: 'active',
            createdAt: '2024-01-10'
        },
        {
            id: '2',
            name: 'Clothing',
            description: 'Eco-friendly apparel and accessories',
            productCount: 8,
            status: 'active',
            createdAt: '2024-01-08'
        },
        {
            id: '3',
            name: 'Electronics',
            description: 'Green technology and electronic accessories',
            productCount: 5,
            status: 'active',
            createdAt: '2024-01-05'
        },
        {
            id: '4',
            name: 'Kitchen',
            description: 'Sustainable kitchen and dining products',
            productCount: 15,
            status: 'active',
            createdAt: '2024-01-03'
        },
        {
            id: '5',
            name: 'Personal Care',
            description: 'Natural and organic personal care items',
            productCount: 0,
            status: 'inactive',
            createdAt: '2024-01-01'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleCategoryStatus = (id: string) => {
        setCategories(categories.map(category => 
            category.id === id 
                ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' }
                : category
        ));
    };

    const deleteCategory = (id: string) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const stats = {
        totalCategories: categories.length,
        activeCategories: categories.filter(c => c.status === 'active').length,
        totalProducts: categories.reduce((acc, c) => acc + c.productCount, 0)
    };

    return (
        <>
            <main className="flex-1 overflow-auto p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCategories}</div>
                            <p className="text-xs text-muted-foreground">
                                Organizing your products
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
                            <Eye className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeCategories}</div>
                            <p className="text-xs text-muted-foreground">
                                Currently visible
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                Across all categories
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Categories Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>Category Management</CardTitle>
                        <CardDescription>
                            Organize your sustainable product catalog
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search categories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        {/* Categories Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Products</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <Package className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{category.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {category.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {category.productCount} products
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant={category.status === 'active' ? 'default' : 'secondary'}
                                                    className={category.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                                >
                                                    {category.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(category.createdAt)}
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
                                                            View Products
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Category
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => toggleCategoryStatus(category.id)}
                                                        >
                                                            {category.status === 'active' ? 'Deactivate' : 'Activate'}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => deleteCategory(category.id)}
                                                            className="text-red-600"
                                                            disabled={category.productCount > 0}
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

                        {filteredCategories.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No categories found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm 
                                        ? 'Try adjusting your search criteria.' 
                                        : 'Get started by creating your first category.'
                                    }
                                </p>
                                {!searchTerm && (
                                    <div className="mt-6">
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Category
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
