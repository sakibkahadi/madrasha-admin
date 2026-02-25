// app/(dashboard)/dashboard/school-subscriptions/page.js
"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import SchoolSubscriptionsTable from "@/components/dashboard/SchoolSubscriptionsTable";

// Mock data for demonstration
const mockData = [
  {
    id: 1,
    madrasaName: "Oakridge International School",
    planName: "Premium",
    price: 1299,
    email: "admin@oakridge.edu",
    mobileNo: "+1 (555) 123-4567",
    dates: {
      startDate: "15 Jan 2025",
      expiryDate: "15 Jan 2026"
    },
    lastUpgrade: "15 Jan 2025",
    status: "Active"
  },
  {
    id: 2,
    madrasaName: "Springfield Elementary",
    planName: "Basic",
    price: 499,
    email: "principal@springfield.edu",
    mobileNo: "+1 (555) 765-4321",
    dates: {
      startDate: "02 Feb 2025",
      expiryDate: "02 Feb 2026"
    },
    lastUpgrade: "02 Feb 2025",
    status: "Active"
  },
  {
    id: 3,
    madrasaName: "St. Mary's High School",
    planName: "Standard",
    price: 799,
    email: "info@stmarys.edu",
    mobileNo: "+1 (555) 222-3333",
    dates: {
      startDate: "10 Dec 2024",
      expiryDate: "10 Dec 2025"
    },
    lastUpgrade: "10 Dec 2024",
    status: "Active"
  },
  {
    id: 4,
    madrasaName: "Westview Junior College",
    planName: "Premium",
    price: 1299,
    email: "admin@westview.edu",
    mobileNo: "+1 (555) 444-5555",
    dates: {
      startDate: "05 Jan 2025",
      expiryDate: "05 Jan 2026"
    },
    lastUpgrade: "05 Jan 2025",
    status: "Active"
  },
  {
    id: 5,
    madrasaName: "Riverdale Academy",
    planName: "Standard",
    price: 799,
    email: "office@riverdale.edu",
    mobileNo: "+1 (555) 666-7777",
    dates: {
      startDate: "20 Nov 2024",
      expiryDate: "20 Nov 2025"
    },
    lastUpgrade: "20 Nov 2024",
    status: "Expired"
  },
  {
    id: 6,
    madrasaName: "Greenwood Elementary",
    planName: "Basic",
    price: 499,
    email: "principal@greenwood.edu",
    mobileNo: "+1 (555) 888-9999",
    dates: {
      startDate: "15 Mar 2025",
      expiryDate: "15 Mar 2026"
    },
    lastUpgrade: "15 Mar 2025",
    status: "Pending"
  },
  {
    id: 7,
    madrasaName: "Lakeside International School",
    planName: "Premium",
    price: 1299,
    email: "admin@lakeside.edu",
    mobileNo: "+1 (555) 111-2222",
    dates: {
      startDate: "01 Feb 2025",
      expiryDate: "01 Feb 2026"
    },
    lastUpgrade: "01 Feb 2025",
    status: "Active"
  },
  {
    id: 8,
    madrasaName: "Sunnydale High",
    planName: "Standard",
    price: 799,
    email: "info@sunnydale.edu",
    mobileNo: "+1 (555) 333-4444",
    dates: {
      startDate: "10 Jan 2025",
      expiryDate: "10 Jan 2026"
    },
    lastUpgrade: "25 Feb 2025",
    status: "Active"
  },
  {
    id: 9,
    madrasaName: "Pinewood Montessori",
    planName: "Basic",
    price: 499,
    email: "admin@pinewood.edu",
    mobileNo: "+1 (555) 555-6666",
    dates: {
      startDate: "05 Dec 2024",
      expiryDate: "05 Dec 2025"
    },
    lastUpgrade: "05 Dec 2024",
    status: "Expired"
  },
  {
    id: 10,
    madrasaName: "Cambridge International School",
    planName: "Premium",
    price: 1299,
    email: "principal@cambridge.edu",
    mobileNo: "+1 (555) 777-8888",
    dates: {
      startDate: "22 Jan 2025",
      expiryDate: "22 Jan 2026"
    },
    lastUpgrade: "22 Jan 2025",
    status: "Active"
  }
];

export default function SchoolSubscriptionsPage() {
  const [loading, setLoading] = useState(true);
  const [subscriptionsData, setSubscriptionsData] = useState([]);

  // Simulate API call to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/subscriptions');
        // const data = await response.json();
        
        // Simulate network delay
        setTimeout(() => {
          setSubscriptionsData(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast.error("Failed to load subscription data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Madrasa Subscriptions</h1>
        <p className="text-muted-foreground mt-2">
          Manage all madrasa subscription plans and their details.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <SchoolSubscriptionsTable data={subscriptionsData} />
      )}
    </div>
  );
}