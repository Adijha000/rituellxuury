export function LogoMark({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 90" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 4C50 4 62 22 62 36C62 45 56.6 51 50 51C43.4 51 38 45 38 36C38 22 50 4 50 4Z"
        fill="currentColor"
      />
      <path
        d="M50 38C50 38 34 34 24 40C17 44 14 51 14 51C14 51 24 55 34 51C43 47.4 50 38 50 38Z"
        fill="currentColor"
      />
      <path
        d="M50 38C50 38 66 34 76 40C83 44 86 51 86 51C86 51 76 55 66 51C57 47.4 50 38 50 38Z"
        fill="currentColor"
      />
      <path d="M50 40V70" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M50 55C50 55 44 60 43 70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M50 55C50 55 56 60 57 70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif tracking-[0.35em] ${className}`}>
      RITUEL
    </span>
  );
}

export function LogoLockup({ className = "", markClassName = "h-10 w-10", textClassName = "text-2xl" }: { className?: string; markClassName?: string; textClassName?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <LogoMark className={markClassName} />
      <Wordmark className={textClassName} />
    </div>
  );
}
