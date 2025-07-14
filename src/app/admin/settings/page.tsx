"use client";

import { useState } from "react";
import { 
  Settings, 
  Save,
  Eye,
  EyeOff,
  Mail,
  Bell,
  Shield,
  Palette,
  Globe,
  Users,
  Package,
  Leaf
} from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [settings, setSettings] = useState({
        // General Settings
        siteName: 'EcoTrack360',
        siteDescription: 'AI-Powered Sustainability Platform',
        contactEmail: 'admin@ecotrack360.com',
        timezone: 'UTC-5',
        language: 'en',
        
        // Security Settings
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: true,
        sessionTimeout: '30',
        
        // Email Notifications
        orderNotifications: true,
        userRegistrations: true,
        systemAlerts: true,
        weeklyReports: true,
        
        // Sustainability Settings
        carbonTrackingEnabled: true,
        ecoScoreThreshold: 80,
        sustainabilityReports: true,
        greenBadgeRequirement: 85,
        
        // Display Settings
        theme: 'light',
        dashboardLayout: 'grid',
        itemsPerPage: 25,
        enableAnimations: true
    });

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        // Handle save logic
        console.log('Settings saved:', settings);
    };

    return (
        <>
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center px-6">
                    <SidebarTrigger className="mr-4" />
                    <div className="flex items-center space-x-4 flex-1">
                        <h1 className="text-2xl font-bold">System Settings</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-auto p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* General Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Globe className="w-5 h-5" />
                                <span>General Settings</span>
                            </CardTitle>
                            <CardDescription>
                                Basic platform configuration
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="siteName">Site Name</Label>
                                <Input
                                    id="siteName"
                                    value={settings.siteName}
                                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="siteDescription">Site Description</Label>
                                <Input
                                    id="siteDescription"
                                    value={settings.siteDescription}
                                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contactEmail">Contact Email</Label>
                                <Input
                                    id="contactEmail"
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                                            <SelectItem value="UTC-4">UTC-4 (EDT)</SelectItem>
                                            <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                                            <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select value={settings.language} onValueChange={(value) => handleInputChange('language', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Shield className="w-5 h-5" />
                                <span>Security Settings</span>
                            </CardTitle>
                            <CardDescription>
                                Password and security configuration
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={settings.currentPassword}
                                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={settings.newPassword}
                                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={settings.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="twoFactor"
                                        checked={settings.twoFactorEnabled}
                                        onCheckedChange={(checked) => handleInputChange('twoFactorEnabled', checked as boolean)}
                                    />
                                    <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                                    <Badge variant="secondary">Recommended</Badge>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                                    <Select value={settings.sessionTimeout} onValueChange={(value) => handleInputChange('sessionTimeout', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="15">15 minutes</SelectItem>
                                            <SelectItem value="30">30 minutes</SelectItem>
                                            <SelectItem value="60">1 hour</SelectItem>
                                            <SelectItem value="120">2 hours</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Bell className="w-5 h-5" />
                                <span>Notifications</span>
                            </CardTitle>
                            <CardDescription>
                                Configure email and system notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="orderNotifications"
                                    checked={settings.orderNotifications}
                                    onCheckedChange={(checked) => handleInputChange('orderNotifications', checked as boolean)}
                                />
                                <Label htmlFor="orderNotifications">Order Notifications</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="userRegistrations"
                                    checked={settings.userRegistrations}
                                    onCheckedChange={(checked) => handleInputChange('userRegistrations', checked as boolean)}
                                />
                                <Label htmlFor="userRegistrations">User Registrations</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="systemAlerts"
                                    checked={settings.systemAlerts}
                                    onCheckedChange={(checked) => handleInputChange('systemAlerts', checked as boolean)}
                                />
                                <Label htmlFor="systemAlerts">System Alerts</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="weeklyReports"
                                    checked={settings.weeklyReports}
                                    onCheckedChange={(checked) => handleInputChange('weeklyReports', checked as boolean)}
                                />
                                <Label htmlFor="weeklyReports">Weekly Reports</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sustainability Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Leaf className="w-5 h-5" />
                                <span>Sustainability</span>
                            </CardTitle>
                            <CardDescription>
                                Environmental tracking and scoring
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="carbonTracking"
                                    checked={settings.carbonTrackingEnabled}
                                    onCheckedChange={(checked) => handleInputChange('carbonTrackingEnabled', checked as boolean)}
                                />
                                <Label htmlFor="carbonTracking">Enable Carbon Tracking</Label>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ecoScoreThreshold">Minimum Eco Score for Featured Products</Label>
                                <Input
                                    id="ecoScoreThreshold"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={settings.ecoScoreThreshold}
                                    onChange={(e) => handleInputChange('ecoScoreThreshold', parseInt(e.target.value))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="greenBadgeRequirement">Green Badge Requirement</Label>
                                <Input
                                    id="greenBadgeRequirement"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={settings.greenBadgeRequirement}
                                    onChange={(e) => handleInputChange('greenBadgeRequirement', parseInt(e.target.value))}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="sustainabilityReports"
                                    checked={settings.sustainabilityReports}
                                    onCheckedChange={(checked) => handleInputChange('sustainabilityReports', checked as boolean)}
                                />
                                <Label htmlFor="sustainabilityReports">Generate Monthly Sustainability Reports</Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Display Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Palette className="w-5 h-5" />
                            <span>Display & Interface</span>
                        </CardTitle>
                        <CardDescription>
                            Customize the admin interface appearance
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Theme</Label>
                                <Select value={settings.theme} onValueChange={(value) => handleInputChange('theme', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="auto">Auto</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dashboardLayout">Dashboard Layout</Label>
                                <Select value={settings.dashboardLayout} onValueChange={(value) => handleInputChange('dashboardLayout', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="grid">Grid</SelectItem>
                                        <SelectItem value="list">List</SelectItem>
                                        <SelectItem value="compact">Compact</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="itemsPerPage">Items Per Page</Label>
                                <Select value={settings.itemsPerPage.toString()} onValueChange={(value) => handleInputChange('itemsPerPage', parseInt(value))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Animations</Label>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox
                                        id="enableAnimations"
                                        checked={settings.enableAnimations}
                                        onCheckedChange={(checked) => handleInputChange('enableAnimations', checked as boolean)}
                                    />
                                    <Label htmlFor="enableAnimations">Enable Animations</Label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end pt-6">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save All Settings
                    </Button>
                </div>
            </main>
        </>
    );
}
