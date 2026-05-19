import ProductCard from "../components/ProcuctCard";

export default function ProductPage() {
  const products = [
    {
      image:
        "https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779210406/tomato1_uywsm0.png",

      name: "Heirloom tomato",

      price: "$5.99 / lb",

      location:
        "Grown in San Juan Capistrano, CA",
    },

    {
      image:
        "https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779210406/ginger_ed0d5t.png",

      name: "Organic ginger",

      price: "$12.99 / lb",

      location:
        "Grown in Huntington Beach, CA",
    },
  ];

  return (
    <main className="px-12 py-8">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-6">

        <div className="flex items-end gap-4">

          <h1 className="font-serif text-[64px]">
            Produce
          </h1>

          <div className="flex items-center gap-2 text-sm">

            <span className="font-medium">
              Fresh
            </span>

            <span>—</span>

            <span className="text-gray-500">
              August 21, 2023
            </span>

          </div>

        </div>

        <div className="flex gap-3">

          <button className="rounded-full bg-[#4D771E] px-5 py-2 text-sm text-white">
            Default
          </button>

          <button className="rounded-full border border-gray-300 px-5 py-2 text-sm">
            A-Z
          </button>

          <button className="rounded-full border border-gray-300 px-5 py-2 text-sm">
            List view
          </button>

        </div>

      </div>

      {/* Products */}

      <div className="mt-8 flex flex-wrap gap-6">

        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            name={product.name}
            price={product.price}
            location={product.location}
          />
        ))}

      </div>

    </main>
  );
}