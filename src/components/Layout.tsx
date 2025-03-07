import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-20 w-full container mx-auto px-4 lg:px-0">
      {children}
    </div>
  );
}
