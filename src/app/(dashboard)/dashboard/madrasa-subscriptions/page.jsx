// app/(dashboard)/dashboard/school-subscriptions/page.js
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import SchoolSubscriptionsTable from "@/components/dashboard/SchoolSubscriptionsTable";
import useMadrashaList from "@/hooks/public/madrasha/useMadrashaList";


export default function MadrasaSubscriptionsPage() {
  const {data,isLoading,} = useMadrashaList()



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Madrasa Subscriptions</h1>
        <p className="text-muted-foreground mt-2">
          Manage all madrasa subscription plans and their details.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <SchoolSubscriptionsTable data={data?.data} />
      )}
    </div>
  );
}