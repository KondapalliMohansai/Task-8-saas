const btn = 'flex h-14 flex-1 items-center justify-center gap-3 rounded-xl bg-field text-base font-semibold text-body transition-colors hover:bg-primary/10';

export default function SocialButtons() {
  return (
    <div className="flex gap-4">
      <button type="button" className={btn}>
        <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
          <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 019.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 000 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" />
          <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
        </svg>
        Google
      </button>
      <button type="button" className={btn}>
        <svg width="12" height="22" viewBox="0 0 12 22" aria-hidden="true">
          <path fill="#3B5998" d="M8 22V12h3.3l.5-4H8V5.600c0-1.100.3-1.900 1.900-1.900H12V.2C11.600.1 10.400 0 9 0 6 0 4 1.800 4 5.100V8H.7v4H4v10h4z" />
        </svg>
        Facebook
      </button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="my-6 flex items-center gap-4 text-base text-ink">
      <span className="h-px flex-1 bg-line" />
      Or
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
