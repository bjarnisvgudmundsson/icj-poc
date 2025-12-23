interface ICJEmblemProps {
  size?: number;
  className?: string;
}

export function ICJEmblem({ size = 48, className = '' }: ICJEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" stroke="#5B92E5" strokeWidth="2" fill="white" />

      {/* Inner decorative circle */}
      <circle cx="50" cy="50" r="42" stroke="#5B92E5" strokeWidth="0.5" fill="none" />

      {/* Scales of Justice - Left pan */}
      <path
        d="M 30 45 L 35 50 L 25 50 Z"
        fill="#5B92E5"
      />
      <line x1="30" y1="45" x2="30" y2="35" stroke="#5B92E5" strokeWidth="1.5" />

      {/* Scales of Justice - Right pan */}
      <path
        d="M 70 45 L 75 50 L 65 50 Z"
        fill="#5B92E5"
      />
      <line x1="70" y1="45" x2="70" y2="35" stroke="#5B92E5" strokeWidth="1.5" />

      {/* Scales of Justice - Beam */}
      <line x1="30" y1="35" x2="70" y2="35" stroke="#5B92E5" strokeWidth="1.5" />

      {/* Scales of Justice - Center post */}
      <line x1="50" y1="35" x2="50" y2="65" stroke="#5B92E5" strokeWidth="2" />

      {/* Base */}
      <rect x="40" y="65" width="20" height="3" fill="#5B92E5" />

      {/* Globe representation - horizontal lines */}
      <ellipse cx="50" cy="50" rx="15" ry="15" stroke="#5B92E5" strokeWidth="0.5" fill="none" />
      <ellipse cx="50" cy="50" rx="15" ry="8" stroke="#5B92E5" strokeWidth="0.3" fill="none" />
      <ellipse cx="50" cy="50" rx="15" ry="4" stroke="#5B92E5" strokeWidth="0.3" fill="none" />

      {/* Globe representation - vertical line */}
      <line x1="50" y1="35" x2="50" y2="65" stroke="#5B92E5" strokeWidth="0.3" />

      {/* Olive branches - left */}
      <path
        d="M 20 55 Q 15 60 20 65"
        stroke="#5B92E5"
        strokeWidth="1"
        fill="none"
      />
      <ellipse cx="18" cy="58" rx="2" ry="1" fill="#5B92E5" />
      <ellipse cx="17" cy="62" rx="2" ry="1" fill="#5B92E5" />

      {/* Olive branches - right */}
      <path
        d="M 80 55 Q 85 60 80 65"
        stroke="#5B92E5"
        strokeWidth="1"
        fill="none"
      />
      <ellipse cx="82" cy="58" rx="2" ry="1" fill="#5B92E5" />
      <ellipse cx="83" cy="62" rx="2" ry="1" fill="#5B92E5" />
    </svg>
  );
}
