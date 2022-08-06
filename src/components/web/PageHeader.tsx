import { Link } from "react-router-dom";

export default function PageHeader({
  backPath = "",
  title = "PageTitle",
}: any) {
  return (
    <div className="p-2">
      <div className="flex">
        {backPath && (
          <Link to={backPath}>
            <button className="border px-3 mr-2">&laquo;</button>
          </Link>
        )}
        <h2 className="font-semibold text-xl">{title}</h2>
      </div>
      <hr className="my-2" />
    </div>
  );
}
