const MakeAdminPanelTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <tr key={index}>
          <th className="bg-white py-3">
            <div className="skeleton h-4 w-8 mx-auto"></div>
          </th>

          <td className="bg-white py-3">
            <div className="skeleton h-4 w-32"></div>
          </td>

          <td className="bg-white py-3">
            <div className="skeleton h-4 w-40"></div>
          </td>

          <td className="bg-white py-3">
            <div className="skeleton h-8 w-24 mx-auto"></div>
          </td>

          <td className="bg-white py-3">
            <div className="skeleton h-8 w-10 mx-auto"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default MakeAdminPanelTableSkeleton;
