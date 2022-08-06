import { Link } from "react-router-dom";
import { Product } from "../../pages/Products";

export default function ProductTable({
  products,
}: {
  products: Product[] | [];
}) {
  let no = 1;
  return (
    <div className="px-5">
      <p className="text-center mb-2 font-bold text-lg">Products table</p>
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
              <td className="font-bold text-center">{no++}</td>
              <td className="font-bold text-center">{product.kode}</td>
              <td>{product.name}</td>
              <td className="text-right">{product.price}</td>
              <td className="text-right">{product.qty}</td>
              <td className="text-center">
                <Link to={"/product/" + product.id + "/edit"}>
                  <button className="border px-1 m-1">✏️</button>
                </Link>
                <button className="border px-1">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
