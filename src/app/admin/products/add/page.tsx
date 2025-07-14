"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, ImageIcon, Save, Sparkles, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function CategoriesPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    sustainabilityScore: "",
    status: "active",
    tags: "",
    specifications: "",
    materials: "",
    certifications: "",
  });

  const [hasImage, setHasImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGeneratingScore, setIsGeneratingScore] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const categories = [
    "Drinkware",
    "Clothing",
    "Electronics",
    "Accessories",
    "Kitchen",
    "Home & Garden",
    "Office Supplies",
    "Personal Care",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Simulate AI score generation
  const generateSustainabilityScore = () => {
    if (!formData.materials || !formData.certifications || !hasImage) return;

    setIsGeneratingScore(true);

    setTimeout(() => {
      let score = 60;

      if (formData.materials.toLowerCase().includes("organic")) score += 15;
      if (formData.materials.toLowerCase().includes("recycled")) score += 12;
      if (formData.materials.toLowerCase().includes("bamboo")) score += 10;
      if (formData.materials.toLowerCase().includes("sustainable")) score += 8;

      if (formData.certifications.toLowerCase().includes("usda organic"))
        score += 10;
      if (formData.certifications.toLowerCase().includes("fair trade"))
        score += 8;
      if (formData.certifications.toLowerCase().includes("greenguard"))
        score += 7;

      score += Math.floor(Math.random() * 11) - 5;
      score = Math.max(1, Math.min(100, score));

      setFormData((prev) => ({
        ...prev,
        sustainabilityScore: score.toString(),
      }));

      setIsGeneratingScore(false);
      setShowScore(true);
    }, 2000);
  };

  useEffect(() => {
    if (
      formData.materials &&
      formData.certifications &&
      hasImage &&
      !showScore
    ) {
      generateSustainabilityScore();
    }
  }, [formData.materials, formData.certifications, hasImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setHasImage(true);
    }
  };

  const removeImage = () => {
    setHasImage(false);
    setImagePreview(null);
    setSelectedFile(null);
    setShowScore(false); // Reset score when image is removed
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.description || !formData.category || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.materials || !formData.certifications) {
      alert("Please fill in materials and certifications for AI score generation");
      return;
    }

    if (!hasImage) {
      alert("Please upload a product image");
      return;
    }

    try {
      // Here you would typically upload the image and save the product data
      console.log("Product data:", {
        ...formData,
        image: selectedFile,
        imagePreview
      });
      
      // Simulate API call
      alert("Product created successfully!");
      
      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        sustainabilityScore: "",
        status: "active",
        tags: "",
        specifications: "",
        materials: "",
        certifications: "",
      });
      removeImage();
      setShowScore(false);
      
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Essential details about your sustainable product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex md:flex-row flex-col">
                  <div className="md:w-1/2 flex gap-2 flex-col">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:w-1/2 flex gap-2 flex-col">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your sustainable product..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2"></div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="eco-friendly, organic, recycled (comma separated)"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Upload high-quality images of your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  {hasImage && imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative mx-auto w-32 h-32 rounded-lg overflow-hidden border-2 border-green-200">
                        <img 
                          src={imagePreview} 
                          alt="Product preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                      <p className="text-sm text-green-600 font-medium">
                        Image uploaded successfully!
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={removeImage}
                          type="button"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Change Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('image-upload')?.click()}
                          type="button"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Images
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Details</CardTitle>
              <CardDescription>
                Information about environmental impact and certifications
                (Required for AI score generation)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materials">Materials Used *</Label>
                  <Input
                    id="materials"
                    placeholder="e.g., 100% organic cotton, recycled plastic..."
                    value={formData.materials}
                    onChange={(e) =>
                      handleInputChange("materials", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications *</Label>
                  <Input
                    id="certifications"
                    placeholder="e.g., USDA Organic, Fair Trade, GREENGUARD..."
                    value={formData.certifications}
                    onChange={(e) =>
                      handleInputChange("certifications", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specifications">Environmental Impact</Label>
                <Input
                  id="specifications"
                  placeholder="Describe the environmental benefits..."
                  value={formData.specifications}
                  onChange={(e) =>
                    handleInputChange("specifications", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>AI-Generated Sustainability Score</span>
              </CardTitle>
              <CardDescription>
                Our AI analyzes your product details to generate an accurate
                sustainability score
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!hasImage || !formData.materials || !formData.certifications ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <Sparkles className="mx-auto h-8 w-8 text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Complete the image upload, materials, and certifications to
                    generate AI score
                  </p>
                </div>
              ) : isGeneratingScore ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                    <span className="text-lg font-medium">
                      AI is analyzing your product...
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Evaluating materials, certifications, and environmental
                    impact
                  </p>
                </div>
              ) : showScore ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4 py-6 bg-green-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {formData.sustainabilityScore}
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {parseInt(formData.sustainabilityScore) >= 80
                          ? "Excellent"
                          : parseInt(formData.sustainabilityScore) >= 70
                          ? "Good"
                          : parseInt(formData.sustainabilityScore) >= 60
                          ? "Fair"
                          : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sustainabilityScore">
                      Sustainability Score (1-100)
                    </Label>
                    <Input
                      id="sustainabilityScore"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.sustainabilityScore}
                      onChange={(e) =>
                        handleInputChange("sustainabilityScore", e.target.value)
                      }
                      className="bg-green-50 border-green-200"
                      readOnly
                    />
                    <p className="text-xs text-gray-500">
                      ✨ Generated by AI based on your product details
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateSustainabilityScore}
                    className="w-full"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Score
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Status & Visibility</CardTitle>
            <CardDescription>
              Control how this product appears in your store
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => handleInputChange("status", value)}
                defaultValue="active"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="featured" />
              <Label htmlFor="featured">Feature this product on homepage</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">Include in newsletter</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 pt-6 pb-8">
            <Button variant="outline" type="button">Cancel</Button>
            <Button variant="outline" type="button">Save as Draft</Button>
            <Button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={!formData.name || !formData.category || !formData.price || !hasImage}
            >
              <Save className="w-4 h-4 mr-2" />
              Create Product
            </Button>
          </div>
      </div>
    </div>
  );
}
