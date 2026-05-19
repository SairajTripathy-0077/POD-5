type ProductCardProps = {
  image: string;
  name: string;
  price: string;
  location: string;
};

export default function ProductCard({
  image,
  name,
  price,
  location,
}: ProductCardProps) {
  return (
    <div className="w-[255px] overflow-hidden rounded-[24px] border border-[#DCDCDC] bg-[#F7F7F5]">

      <div className="h-[190px] bg-[#F2F2F2]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">

        <h3 className="text-[28px] font-medium leading-none">
          {name}
        </h3>

        <p className="mt-2 text-[18px] font-semibold text-[#4E7A1F]">
          {price}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          {location}
        </p>

      </div>

    </div>
  );
}