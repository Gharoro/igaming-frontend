import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-28 mb-12 w-full container mx-auto px-4">{children}</div>
  );
}
