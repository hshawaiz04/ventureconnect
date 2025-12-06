// src/app/dashboard/create-business/page.tsx
import React from "react";
import CreateBusinessForm from "@/components/CreateBusinessForm";

export const metadata = { title: "Create Business Profile" };

export default function CreateBusinessPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Business Profile</h1>
      <CreateBusinessForm />
    </main>
  );
}
