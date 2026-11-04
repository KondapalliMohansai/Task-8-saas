import Logo from '../common/Logo';

// Login / Sign up: form on the left, illustration on the right (hidden on small screens)
export default function AuthLayout({ title, image, imageAlt, children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-[420px] lg:shrink-0 lg:px-[34px] xl:w-[31%] xl:min-w-[420px]">
        <div className="mx-auto w-full max-w-[380px]">
          <div className="mb-6 flex flex-col items-center gap-6">
            <Logo size={64} />
            <h1 className="text-2xl font-semibold text-ink">{title}</h1>
          </div>
          {children}
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center bg-page lg:flex">
        <img src={image} alt={imageAlt} className="max-h-[78vh] w-[78%] max-w-[900px] object-contain mix-blend-multiply" />
      </div>
    </div>
  );
}

// Recover / Confirm: single white card centred on a grey page
export function CenterCard({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F7F7] p-4">
      <div className="w-full max-w-[460px] rounded-2xl bg-white px-6 py-14 shadow-card sm:px-14 sm:py-16">{children}</div>
    </div>
  );
}
