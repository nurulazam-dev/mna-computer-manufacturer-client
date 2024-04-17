import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const ManageProducts = () => {
  const { data: products, isLoading } = useQuery("products", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/products").then(
      (res) => res.json()
    )
  );
  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to Delete this product");
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
          console.log(data);
          // const remaining = products.filter(product => product._id !== id);
          // setProducts(remaining)
        });
    }
  };

  return (
    <section className="border border-green-600 rounded mx-4">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          Manage Products
        </h2>
      </div>
      <h2 className="text-center text-xl mt-3">
        Total Products: {products?.length}
      </h2>

      <div className="overflow-x-auto p-4">
        <table className="table w-full border rounded">
          <thead>
            <tr className="text-[17px] text-white">
              <th>S. No</th>
              <th>Avatar</th>
              <th>Product / Part</th>
              <th>Min Order</th>
              <th>Available</th>
              <th>
                Price <span className="text-sm">/per</span>
              </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <>
                <tr className="text-[16px]">
                  <th className="bg-white">{index + 1}</th>
                  <td className="avatar bg-white w-20">
                    <img src={product.img} alt="" />
                  </td>
                  <td className="bg-white">{product.name.slice(0, 20)}</td>
                  <td className="bg-white">{product.minOrderQuantity}</td>
                  <td className="bg-white">{product.availQuantity}</td>
                  <td className="bg-white">{product.price}</td>
                  <td className="bg-white">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn bg-red-600 border-0 h-5"
                    >
                      <FontAwesomeIcon
                        className="text-white"
                        icon={faTrashAlt}
                      ></FontAwesomeIcon>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageProducts;
