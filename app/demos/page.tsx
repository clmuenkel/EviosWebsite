import type { Metadata } from "next";
import { ProductShowcase } from "../components/ProductShowcase";

export const metadata: Metadata = {
  title: "Demos | Evios",
};

export default function DemosPage() {
  return (
    <div>
      <ProductShowcase />
    </div>
  );
}
