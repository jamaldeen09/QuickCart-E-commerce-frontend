"use client"

const EmptyCartIcon = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-70"
  >
    {/* Cart body */}
    <path
      d="M70 70H150L142.5 120H77.5L70 70Z"
      stroke="#9CA3AF"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Cart wheel 1 */}
    <circle
      cx="80"
      cy="145"
      r="5"
      fill="#D1D5DB"
      stroke="#9CA3AF"
      strokeWidth="2"
    />

    {/* Cart wheel 2 */}
    <circle
      cx="140"
      cy="145"
      r="5"
      fill="#D1D5DB"
      stroke="#9CA3AF"
      strokeWidth="2"
    />

    {/* Cart handle */}
    <path
      d="M55 85L45 65"
      stroke="#9CA3AF"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Sad face */}
    <circle
      cx="110"
      cy="95"
      r="3"
      fill="#9CA3AF"
    />
    <circle
      cx="130"
      cy="95"
      r="3"
      fill="#9CA3AF"
    />
    <path
      d="M115 105C115 105 120 110 125 108"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);


const EmptyCartState = () => {

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Empty Cart SVG Icon */}
      <div className="mb-8">
        <EmptyCartIcon />
      </div>

      {/* Text Content */}
      <h2 className="text-2xl font-medium text-gray-600 mb-4">Your cart feels lonely</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Your shopping cart is empty. Start filling it with products you love!
      </p>

    </div>
  );
};

export default EmptyCartState;