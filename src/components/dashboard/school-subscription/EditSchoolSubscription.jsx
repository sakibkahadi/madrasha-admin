// app/dashboard/madrasa-subscriptions/edit/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format, parse } from "date-fns";
import { toast } from "sonner";

export default function EditmadrasaSubscription() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    madrasaName: "",
    planName: "",
    price: "",
    email: "",
    mobileNo: "",
    startDate: null,
    expiryDate: null,
    status: "",
  });

  // Mock function to fetch subscription data
  // In a real application, this would be an API call
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in a real app, this would come from an API
        const mockData = {
          id: id,
          madrasaName: "Springfield Elementary madrasa",
          planName: "Premium",
          price: "1299.99",
          email: "principal@springfield.edu",
          mobileNo: "+1 (555) 987-6543",
          status: "Active",
          dates: {
            startDate: "01/15/2025",
            expiryDate: "01/14/2026",
          },
          lastUpgrade: "12/20/2024",
        };
        
        // Parse string dates into Date objects
        const startDate = parse(mockData.dates.startDate, "MM/dd/yyyy", new Date());
        const expiryDate = parse(mockData.dates.expiryDate, "MM/dd/yyyy", new Date());
        
        setFormData({
          madrasaName: mockData.madrasaName,
          planName: mockData.planName,
          price: mockData.price,
          email: mockData.email,
          mobileNo: mockData.mobileNo,
          startDate,
          expiryDate,
          status: mockData.status,
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscription:", error);
        toast.error("Failed to load subscription data");
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.madrasaName || !formData.planName || !formData.price || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Process form data - in a real app this would update via an API
    toast.success("madrasa subscription updated successfully!");
    console.log("Updated form data:", formData);
    
    // Navigate back to subscriptions list
    router.push("/dashboard/madrasa-subscriptions");
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading subscription data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Madrasa Subscription</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* madrasa Name */}
              <div className="space-y-2">
                <Label htmlFor="madrasaName">Madrasa Name *</Label>
                <Input
                  id="madrasaName"
                  name="madrasaName"
                  value={formData.madrasaName}
                  onChange={handleChange}
                  placeholder="Enter madrasa name"
                  required
                />
              </div>
              
              {/* Plan Name */}
              <div className="space-y-2">
                <Label htmlFor="planName">Plan Name *</Label>
                <Select
                  value={formData.planName}
                  onValueChange={(value) => handleSelectChange("planName", value)}
                >
                  <SelectTrigger id="planName">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="madrasa@example.com"
                  required
                />
              </div>
              
              {/* Mobile No */}
              <div className="space-y-2">
                <Label htmlFor="mobileNo">Mobile Number</Label>
                <Input
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleDateChange("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.expiryDate ? (
                        format(formData.expiryDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.expiryDate}
                      onSelect={(date) => handleDateChange("expiryDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 pt-4">
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Update Subscription</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}