import { Link } from "react-router-dom";
import { Product } from "../../pages/Products";

interface Props {
  products: Product[] | [];
  deleteProduct: (id: string) => void;
}

export default function ProductTable({ products, deleteProduct }: Props) {
  let no = 1;
  return (
    <div className="px-5">
      <div className="flex justify-between">
        <p className="mb-2 font-bold text-lg">Products table</p>
        <Link to="/product/create">
          <button className="px-1 border">➕</button>
        </Link>
      </div>
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th>#</th>
            <th className="w-[15%]">Product ID</th>
            <th>Name</th>
            <th className="w-[15%]">Price</th>
            <th className="w-[5%]">Qty</th>
            <th className="w-[15%]"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr className="border-b" key={product.id}>
              <td className="font-bold text-center border-r">{no++}</td>
              <td className="font-bold text-center">{product.kode}</td>
              <td>{product.name}</td>
              <td className="text-right">{product.price}</td>
              <td className="text-right">{product.qty}</td>
              <td className="text-center">
                <Link to={"/product" + "/edit/" + product.id}>
                  <button className="border px-1 m-1">✏️</button>
                </Link>
                <button
                  className="border px-1"
                  onClick={() => deleteProduct(product.id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
