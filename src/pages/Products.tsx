import { useEffect, useState } from "react";
import ProductTable from "../components/product/ProductTable";
import PageHeader from "../components/web/PageHeader";

export interface Product {
  id: string | number;
  kode: string;
  name: string;
  price: number;
  qty: number;
}

const productsData: Product[] = [
  { id: 1, kode: "PRD0001", name: "Iphong 69 xxl", price: 225000000, qty: 5 },
  { id: 2, kode: "PRD0011", name: "Semsang s69", price: 215000000, qty: 15 },
  { id: 3, kode: "PRD0111", name: "Somay mi69", price: 125000000, qty: 25 },
];

export default function Products() {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="h-full">
      <PageHeader title="Products" />
      <ProductTable products={products} />
    </div>
  );
}
