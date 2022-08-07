import { memo, useEffect, useState } from "react";
import { Product } from "../../pages/Products";
import { v4 } from "uuid";

interface Props {
  addProduct?: (product: Product) => void;
  updateProduct?: (product: Product) => void;
  product?: Product;
}

const ProductForm = ({ addProduct, updateProduct, product }: Props) => {
  const [id, setId] = useState<string>(product?.id || "");
  const [name, setName] = useState<string>(product?.name || "");
  const [kode, setKode] = useState<string>(product?.kode || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [qty, setQty] = useState<number>(product?.qty || 0);
  const [msg, setMsg] = useState<string>("");

  const createProduct = () => {
    if (!name.trim() && !kode.trim() && !price && !qty) return false;
    const newProduct: Product = { id: v4(), name, kode, price, qty };
    if (addProduct) addProduct(newProduct);
    setMsg(`Product ${kode} - ${name} created succesfully`);
    setName("");
    setKode("");
    setPrice(0);
    setQty(0);
  };

  const setProduct = () => {
    if (!name.trim() && !kode.trim() && !price && !qty) return false;
    const updatedProduct: Product = { id, name, kode, price, qty };
    if (updateProduct && product) updateProduct(updatedProduct);
    setMsg(`Product updated succesfully`);
  };

  useEffect(() => console.log("loaded"), []);

  return (
    <div className="px-5">
      <p className="mb-2 font-bold text-lg">
        {product?.id ? "Update product" : "Create Product"}
      </p>
      {msg && (
        <>
          <p className="text-blue-600 mb-2 inline-block">{msg}</p>
          <button className="border px-2 ml-1" onClick={() => setMsg("")}>
            x
          </button>
        </>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!product?.id) return createProduct();
          setProduct();
        }}
      >
        <div className="mb-2 flex flex-col">
          <label htmlFor="kode" className="font-semibold text-lg">
            Product ID
          </label>
          <input
            type="text"
            name="kode"
            className="w-full md:w-[8em] px-2 py-1"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            required
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="name" className="font-semibold text-lg">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full md:w-[25em] px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="price" className="font-semibold text-lg">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="w-full md:w-[10em]  px-2 py-1"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            required
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="qty" className="font-semibold text-lg">
            Qty
          </label>
          <input
            type="number"
            name="qty"
            className="w-full md:w-[5em]  px-2 py-1"
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <button className="px-2 py-1 border font-bold">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
