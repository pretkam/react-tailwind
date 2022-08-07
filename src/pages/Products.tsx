import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductForm from "../components/product/ProductForm";
import ProductTable from "../components/product/ProductTable";
import PageHeader from "../components/web/PageHeader";

export interface Product {
  id: string;
  kode: string;
  name: string;
  price: number;
  qty: number;
}

const productsData: Product[] = [
  { id: "1", kode: "PRD0001", name: "Iphong 69 xxl", price: 225000000, qty: 5 },
  { id: "2", kode: "PRD0011", name: "Semsang s69", price: 215000000, qty: 15 },
  { id: "3", kode: "PRD0111", name: "Somay mi69", price: 125000000, qty: 25 },
];

enum Action {
  Table = "",
  Create = "create",
  Edit = "edit",
}

export default function Products() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [action, setAction] = useState<Action | string>(Action.Table);

  const { pathname } = useLocation();

  useEffect(() => {
    setProducts(productsData);
  }, []);

  useEffect(() => {
    const itemId = pathname.split("/")[3] || "";
    const action = pathname.split("/")[2] || "";
    setAction(action);
    if (itemId) setSelectedProductId(itemId);
  }, [pathname]);

  const addProduct = (newProduct: Product) =>
    setProducts((products) => [newProduct, ...products]);

  const updateProduct = (updatedProduct: Product) =>
    setProducts((prev) =>
      prev.map((product): Product => {
        if (product.id === updatedProduct.id) return updatedProduct;
        return product;
      })
    );

  const deleteProduct = (id: string) =>
    setProducts((prev) => prev.filter((product) => product.id !== id));

  return (
    <div className="h-full">
      <PageHeader
        title="Products"
        backPath={action !== Action.Table && "/product"}
      />
      {action === Action.Table && (
        <ProductTable products={products} deleteProduct={deleteProduct} />
      )}
      {action === Action.Create && <ProductForm addProduct={addProduct} />}
      {action === Action.Edit && (
        <ProductForm
          updateProduct={updateProduct}
          product={products.find((product) => product.id === selectedProductId)}
        />
      )}
    </div>
  );
}
