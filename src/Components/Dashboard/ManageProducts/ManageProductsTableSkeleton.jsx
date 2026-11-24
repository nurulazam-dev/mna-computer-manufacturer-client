export default function ManageProductsTableSkeleton() {
  const ITEMS_PER_PAGE = 10;

  return (
    <>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-4 py-4">
            <div className="h-4 w-6 rounded bg-gray-200" />
          </td>
          <td className="px-4 py-4">
            <div className="h-10 w-10 rounded-xl bg-gray-200" />
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-40 rounded bg-gray-200" />
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-10 rounded bg-gray-200" />
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-10 rounded bg-gray-200" />
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-12 rounded bg-gray-200" />
          </td>
          <td className="px-4 py-4">
            <div className="mx-auto h-8 w-8 rounded bg-gray-200" />
          </td>
        </tr>
      ))}
    </>
  );
}
