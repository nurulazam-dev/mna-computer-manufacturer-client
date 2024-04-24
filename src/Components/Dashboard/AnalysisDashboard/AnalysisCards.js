import {
  faClipboardUser,
  faComments,
  faComputer,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading";

const AnalysisCards = () => {
  // products
  const { data: products, isLoading } = useQuery("products", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/products").then(
      (res) => res.json()
    )
  );
  //   order
  const { data: orders } = useQuery("orders", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/orders", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  //   review
  const { data: reviews } = useQuery("reviews", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/reviews").then(
      (res) => res.json()
    )
  );

  //   user
  const { data: users } = useQuery("users", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/users", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="mb-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* card-1 */}
        <div className="border rounded bg-blue-700 text-white px-3 py-4">
          <div className="flex justify-between mb-5 text-[22px]">
            <h4 className="text-[20px]">Total Products</h4>
            <FontAwesomeIcon icon={faComputer} />
          </div>
          <h3 className="font-bold text-[24px]">{products?.length} +</h3>
        </div>
        {/* card-2 */}
        <div className="border rounded bg-orange-600 text-white px-3 py-4">
          <div className="flex justify-between mb-5 text-[22px]">
            <h4 className="text-[20px]">Registered Users</h4>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <h3 className="font-bold text-[24px]">{users?.length} +</h3>
        </div>
        {/* card-3 */}
        <div className="border rounded bg-violet-600 text-white px-3 py-4">
          <div className="flex justify-between mb-5 text-[22px]">
            <h4 className="text-[20px]">Total Orders</h4>
            <FontAwesomeIcon icon={faClipboardUser} />
          </div>
          <h3 className="font-bold text-[24px]">{orders?.length} +</h3>
        </div>
        {/* card-4 */}
        <div className="border rounded bg-sky-700 text-white px-3 py-4">
          <div className="flex justify-between mb-5 text-[22px]">
            <h4 className="text-[20px]">Total Reviews</h4>
            <FontAwesomeIcon icon={faComments} />
          </div>
          <h3 className="font-bold text-[24px]">{reviews?.length} +</h3>
        </div>
      </div>
    </section>
  );
};

export default AnalysisCards;
