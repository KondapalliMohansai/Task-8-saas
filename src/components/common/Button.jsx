const variants = {
  primary: 'bg-primary text-white hover:bg-[#4f4ae6]',
  outline: 'border border-line bg-white text-primary hover:bg-primary/5',
  soft: 'bg-[#EEEDFB] text-body hover:bg-primary/15',
};

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
