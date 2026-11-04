export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="#605BFF" />
      <path d="M1 21.5l13 6.5 11-9 22 10.5" fill="none" stroke="#fff" strokeWidth="2.4" />
      <circle cx="14" cy="28" r="4.6" fill="#fff" />
      <circle cx="29" cy="16.5" r="4.6" fill="#fff" />
    </svg>
  );
}
