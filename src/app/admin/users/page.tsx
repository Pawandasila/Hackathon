"use client";

import { useState } from "react";
import { 
  Users, 
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Mail,
  Calendar,
  UserCheck,
  UserX
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

type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'manager';
    status: 'active' | 'inactive' | 'suspended';
    joinedAt: string;
    lastActive: string;
    orders: number;
    ecoPoints: number;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@example.com',
            role: 'customer',
            status: 'active',
            joinedAt: '2024-01-15',
            lastActive: '2024-01-20',
            orders: 5,
            ecoPoints: 250
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            role: 'customer',
            status: 'active',
            joinedAt: '2024-01-10',
            lastActive: '2024-01-19',
            orders: 12,
            ecoPoints: 480
        },
        {
            id: '3',
            name: 'Mike Chen',
            email: 'mike.chen@example.com',
            role: 'manager',
            status: 'active',
            joinedAt: '2023-12-20',
            lastActive: '2024-01-20',
            orders: 0,
            ecoPoints: 0
        },
        {
            id: '4',
            name: 'Emma Wilson',
            email: 'emma.w@example.com',
            role: 'customer',
            status: 'suspended',
            joinedAt: '2024-01-05',
            lastActive: '2024-01-18',
            orders: 3,
            ecoPoints: 120
        },
        {
            id: '5',
            name: 'Admin User',
            email: 'admin@ecotrack360.com',
            role: 'admin',
            status: 'active',
            joinedAt: '2023-12-01',
            lastActive: '2024-01-20',
            orders: 0,
            ecoPoints: 0
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const toggleUserStatus = (id: string) => {
        setUsers(users.map(user => 
            user.id === id 
                ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
                : user
        ));
    };

    const deleteUser = (id: string) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'manager': return 'bg-blue-100 text-blue-800';
            case 'customer': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        customers: users.filter(u => u.role === 'customer').length,
        totalOrders: users.reduce((acc, u) => acc + u.orders, 0)
    };

    const roles = ['all', 'admin', 'manager', 'customer'];

    return (
        <>
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center px-6">
                    <SidebarTrigger className="mr-4" />
                    <div className="flex items-center space-x-4 flex-1">
                        <h1 className="text-2xl font-bold">User Management</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </Button>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-auto p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalUsers}</div>
                            <p className="text-xs text-muted-foreground">
                                Registered users
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <UserCheck className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeUsers}</div>
                            <p className="text-xs text-muted-foreground">
                                Currently active
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Customers</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.customers}</div>
                            <p className="text-xs text-muted-foreground">
                                Customer accounts
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <Calendar className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOrders}</div>
                            <p className="text-xs text-muted-foreground">
                                Orders placed
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Users Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Directory</CardTitle>
                        <CardDescription>
                            Manage user accounts and permissions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search users..."
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
                                            Role: {selectedRole}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {roles.map((role) => (
                                            <DropdownMenuItem
                                                key={role}
                                                onClick={() => setSelectedRole(role)}
                                            >
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Orders</TableHead>
                                        <TableHead>Eco Points</TableHead>
                                        <TableHead>Last Active</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <span className="text-sm font-medium">
                                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getRoleColor(user.role)}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(user.status)}>
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {user.orders}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {user.ecoPoints}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(user.lastActive)}
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
                                                            View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit User
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Mail className="mr-2 h-4 w-4" />
                                                            Send Email
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => toggleUserStatus(user.id)}
                                                        >
                                                            {user.status === 'active' ? (
                                                                <>
                                                                    <UserX className="mr-2 h-4 w-4" />
                                                                    Suspend
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <UserCheck className="mr-2 h-4 w-4" />
                                                                    Activate
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => deleteUser(user.id)}
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

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12">
                                <Users className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No users found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm || selectedRole !== 'all'
                                        ? 'Try adjusting your search or filter criteria.' 
                                        : 'Get started by adding your first user.'
                                    }
                                </p>
                                {!searchTerm && selectedRole === 'all' && (
                                    <div className="mt-6">
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add User
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
