"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar
} from 'recharts';
import { 
  Leaf, Users, Shield, TrendingUp, Globe, Factory, 
  Award, CheckCircle, AlertTriangle 
} from 'lucide-react';

const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B'];

export default function ESGMetricsDashboard() {
  // Mock ESG data
  const esgData = {
    environmental: {
      carbonFootprint: 85, // Out of 100 (higher is better)
      renewableEnergyUsage: 78,
      wasteReduction: 92,
      waterConservation: 88
    },
    social: {
      localSourcingPercentage: 65,
      fairTradeCompliance: 89,
      communityImpact: 76
    },
    governance: {
      transparencyScore: 94,
      ethicalSourcing: 87,
      complianceRating: 96
    },
    overallScore: 85
  };

  const supplierESGComparison = [
    { name: 'GreenTech Solutions', environmental: 92, social: 88, governance: 94, overall: 91 },
    { name: 'Sustainable Goods Co.', environmental: 88, social: 85, governance: 89, overall: 87 },
    { name: 'EcoFirst Manufacturing', environmental: 85, social: 82, governance: 88, overall: 85 },
    { name: 'Traditional Supply Corp', environmental: 45, social: 52, governance: 68, overall: 55 }
  ];

  const monthlyProgress = [
    { month: 'Jan', environmental: 78, social: 72, governance: 85 },
    { month: 'Feb', environmental: 80, social: 74, governance: 87 },
    { month: 'Mar', environmental: 82, social: 76, governance: 89 },
    { month: 'Apr', environmental: 84, social: 78, governance: 91 },
    { month: 'May', environmental: 85, social: 80, governance: 94 },
    { month: 'Jun', environmental: 87, social: 82, governance: 96 }
  ];

  const certificationData = [
    { name: 'ISO 14001', value: 85, color: '#10B981' },
    { name: 'Fair Trade', value: 72, color: '#3B82F6' },
    { name: 'B-Corp', value: 68, color: '#8B5CF6' },
    { name: 'Carbon Neutral', value: 45, color: '#F59E0B' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: 'default' as const, text: 'Excellent', class: 'bg-green-500' };
    if (score >= 80) return { variant: 'secondary' as const, text: 'Good', class: 'bg-blue-500' };
    if (score >= 70) return { variant: 'secondary' as const, text: 'Fair', class: 'bg-yellow-500' };
    return { variant: 'destructive' as const, text: 'Needs Improvement', class: '' };
  };

  return (
    <div className="space-y-6">
      {/* ESG Score Overview */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Globe className="h-6 w-6 mr-2 text-green-600" />
              ESG Performance Overview
            </span>
            <Badge {...getScoreBadge(esgData.overallScore)} className={getScoreBadge(esgData.overallScore).class}>
              {getScoreBadge(esgData.overallScore).text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {esgData.overallScore}
            </div>
            <p className="text-gray-600">Overall ESG Score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Environmental */}
            <div className="text-center">
              <div className="mb-3">
                <Leaf className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <h3 className="font-semibold">Environmental</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carbon Footprint</span>
                    <span className={getScoreColor(esgData.environmental.carbonFootprint)}>
                      {esgData.environmental.carbonFootprint}%
                    </span>
                  </div>
                  <Progress value={esgData.environmental.carbonFootprint} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Renewable Energy</span>
                    <span className={getScoreColor(esgData.environmental.renewableEnergyUsage)}>
                      {esgData.environmental.renewableEnergyUsage}%
                    </span>
                  </div>
                  <Progress value={esgData.environmental.renewableEnergyUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Waste Reduction</span>
                    <span className={getScoreColor(esgData.environmental.wasteReduction)}>
                      {esgData.environmental.wasteReduction}%
                    </span>
                  </div>
                  <Progress value={esgData.environmental.wasteReduction} className="h-2" />
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="text-center">
              <div className="mb-3">
                <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <h3 className="font-semibold">Social</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Local Sourcing</span>
                    <span className={getScoreColor(esgData.social.localSourcingPercentage)}>
                      {esgData.social.localSourcingPercentage}%
                    </span>
                  </div>
                  <Progress value={esgData.social.localSourcingPercentage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fair Trade</span>
                    <span className={getScoreColor(esgData.social.fairTradeCompliance)}>
                      {esgData.social.fairTradeCompliance}%
                    </span>
                  </div>
                  <Progress value={esgData.social.fairTradeCompliance} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Community Impact</span>
                    <span className={getScoreColor(esgData.social.communityImpact)}>
                      {esgData.social.communityImpact}%
                    </span>
                  </div>
                  <Progress value={esgData.social.communityImpact} className="h-2" />
                </div>
              </div>
            </div>

            {/* Governance */}
            <div className="text-center">
              <div className="mb-3">
                <Shield className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <h3 className="font-semibold">Governance</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Transparency</span>
                    <span className={getScoreColor(esgData.governance.transparencyScore)}>
                      {esgData.governance.transparencyScore}%
                    </span>
                  </div>
                  <Progress value={esgData.governance.transparencyScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ethical Sourcing</span>
                    <span className={getScoreColor(esgData.governance.ethicalSourcing)}>
                      {esgData.governance.ethicalSourcing}%
                    </span>
                  </div>
                  <Progress value={esgData.governance.ethicalSourcing} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Compliance</span>
                    <span className={getScoreColor(esgData.governance.complianceRating)}>
                      {esgData.governance.complianceRating}%
                    </span>
                  </div>
                  <Progress value={esgData.governance.complianceRating} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier ESG Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Factory className="h-5 w-5 mr-2" />
              Supplier ESG Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplierESGComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="environmental" fill="#10B981" name="Environmental" />
                <Bar dataKey="social" fill="#3B82F6" name="Social" />
                <Bar dataKey="governance" fill="#8B5CF6" name="Governance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly ESG Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              ESG Progress Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="environmental" fill="#10B981" name="Environmental" />
                <Bar dataKey="social" fill="#3B82F6" name="Social" />
                <Bar dataKey="governance" fill="#8B5CF6" name="Governance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Certifications and Awards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Sustainability Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificationData.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: cert.color }}
                    ></div>
                    <span className="font-medium">{cert.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{cert.value}% compliance</span>
                    {cert.value >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={certificationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {certificationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Recent ESG Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Carbon Neutral Certification</h4>
                  <p className="text-sm text-green-600">
                    Achieved carbon neutral status for 85% of supply chain operations
                  </p>
                  <span className="text-xs text-green-500">Completed this month</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Fair Trade Expansion</h4>
                  <p className="text-sm text-blue-600">
                    Increased fair trade supplier partnerships by 35%
                  </p>
                  <span className="text-xs text-blue-500">Last month</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Transparency Initiative</h4>
                  <p className="text-sm text-purple-600">
                    Launched public sustainability dashboard with real-time metrics
                  </p>
                  <span className="text-xs text-purple-500">2 months ago</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Action Required</h4>
                  <p className="text-sm text-yellow-600">
                    Local sourcing percentage below target - need to increase by 15%
                  </p>
                  <span className="text-xs text-yellow-500">Priority: High</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
