// segmented control: List / Board / Timeline and Product / Customer
export default function Tabs({ tabs, value, onChange }) {
  return (
    <div role="tablist" className="inline-flex overflow-hidden rounded-xl bg-white shadow-card">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={value === tab}
          onClick={() => onChange(tab)}
          className={`h-11 px-5 text-sm font-semibold transition-colors sm:px-6 ${
            value === tab ? 'bg-primary text-white' : 'text-ink hover:bg-primary/5'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
