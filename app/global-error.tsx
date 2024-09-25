"use client";
// import { InventoryError } from "@/components/atoms/inventory-error";
import Link from "next/link";
export default function ErrorPage() {
  return (
    <div>
      <h3 className="text-xl text-center mx-auto py-5 font-bold text-red-500">
        Failed to fetch!
      </h3>
      <Link href="/">Go back</Link>
    </div>
  );
}
