import { avatars } from '../../data/images';

// Shows the Figma photo when we have one, otherwise the person's initials
export default function Avatar({ name = '', src, size = 40, className = '' }) {
  const url = src && (avatars[src] || (src.includes('/') || src.startsWith('blob:') ? src : null));
  const style = { width: size, height: size };

  if (!url) {
    const initials = name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
    return (
      <span
        style={{ ...style, fontSize: size * 0.38 }}
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#E6E5FF] font-bold text-primary ${className}`}
      >
        {initials || '?'}
      </span>
    );
  }

  return <img src={url} alt={name} style={style} className={`shrink-0 rounded-full object-cover ${className}`} />;
}

// overlapped faces with the cyan "+" button, used on the task board + timeline
export function AvatarStack({ names = [], size = 30 }) {
  return (
    <div className="flex items-center">
      {names.slice(0, 4).map((n, i) => (
        <Avatar key={n + i} src={n} name={n} size={size} className="-mr-2 border-2 border-white" />
      ))}
      <span
        style={{ width: size + 2, height: size + 2 }}
        className="relative z-10 flex items-center justify-center rounded-full bg-brand-cyan text-lg leading-none text-white"
      >
        +
      </span>
    </div>
  );
}
