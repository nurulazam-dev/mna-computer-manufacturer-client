import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/products").then(
      (res) => res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to Delete this product?");
    if (proceed) {
      const url = `https://mna-computer-manufacturer.onrender.com/products/${id}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("Product deleted successfully");
            refetch();
          } else {
            toast.error("Failed to delete product");
          }
        });
    }
  };

  return (
    <section className="border border-green-600 rounded mx-4 bg-white shadow-lg">
      <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-t">
        <h2 className="text-white text-center p-3 text-2xl font-bold tracking-wide">
          Manage Products
        </h2>
      </div>
      <h2 className="text-center text-xl mt-4 mb-2 font-semibold text-green-700">
        Total Products: {products?.length}
      </h2>

      <div className="overflow-x-auto px-4">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow">
          <thead className="bg-green-600">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                S. No
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Product / Part
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Min Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Available
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Price <span className="text-sm">/per</span>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-green-50 transition">
                <td className="px-4">{index + 1}</td>
                <td className="px-4">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-xl border border-green-200 shadow">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 text-gray-800 truncate max-w-xs">
                  {product.name.slice(0, 30)}
                </td>
                <td className="px-4">{product.minOrderQuantity}</td>
                <td className="px-4">{product.availQuantity}</td>
                <td className="px-4">${product.price}</td>
                <td className="px-4 text-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded shadow transition"
                    title="Delete Product"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageProducts;
