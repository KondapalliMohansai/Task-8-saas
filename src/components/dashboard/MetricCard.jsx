export default function MetricCard({ icon, tint, value, label }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card sm:px-6 sm:py-6">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: tint }}>
        {icon}
      </span>
      <div>
        <p className="text-2xl font-bold text-body">{value}</p>
        <p className="text-sm text-body">{label}</p>
      </div>
    </div>
  );
}
