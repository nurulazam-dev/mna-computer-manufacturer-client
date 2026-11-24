const ProductSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* Product Image */}
      <div className="h-40 md:h-48 bg-gray-200" />

      <div className="p-3 space-y-3">
        {/* Product Title */}
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />

        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/3 mt-3" />

        {/* Button */}
        <div className="h-9 bg-gray-200 rounded w-full mt-4" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
