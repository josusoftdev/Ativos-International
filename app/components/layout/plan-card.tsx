type PlanCardProps = {
  name: string;
  price: number;
  description: string;
  benefits: string[];
  highlighted?: boolean;
  ctaText?: string;
};

export function PlanCard({
  name,
  price,
  description,
  benefits,
  highlighted = false,
  ctaText = 'Escolher Plano',
}: PlanCardProps) {
  return (
    <div
      className={`flex flex-col rounded-lg shadow-lg transition-transform hover:scale-105 ${
        highlighted
          ? 'border-2 border-indigo-500 bg-slate-800 ring-2 ring-indigo-500'
          : 'border border-slate-700 bg-slate-900'
      } p-8`}
    >
      {highlighted && (
        <div className="mb-4 inline-block w-fit rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
          Popular
        </div>
      )}

      <h3 className="text-2xl font-bold text-slate-100">{name}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>

      <div className="mt-6 flex items-baseline">
        <span className="text-4xl font-bold text-slate-100">R${price}</span>
        <span className="ml-2 text-slate-400">/mês</span>
      </div>

      <ul className="mt-8 space-y-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-slate-300">
            <svg
              className="mr-3 h-5 w-5 flex-shrink-0 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>

      <button className="mt-8 w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-500">
        {ctaText}
      </button>
    </div>
  );
}