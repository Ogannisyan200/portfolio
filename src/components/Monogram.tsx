export type LogoVariant = 'ring' | 'ligature' | 'orbit'

type Props = { variant: LogoVariant; size?: number }

/** Монограмма «ОР» в трёх вариантах. Цвет берётся из currentColor. */
export default function Monogram({ variant, size = 36 }: Props) {
  const common = { width: size, height: size, viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': true } as const

  if (variant === 'ligature') {
    // «О» и «Р» делят одну вертикаль
    return (
      <svg {...common} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="15" cy="20" r="9" />
        <path d="M24 11v18M24 11h5a4.5 4.5 0 0 1 0 9h-5" />
      </svg>
    )
  }

  if (variant === 'orbit') {
    // буквы внутри наклонной орбиты, как кольцо на экране с дроном
    return (
      <svg {...common}>
        <ellipse cx="20" cy="20" rx="18.5" ry="7.5" transform="rotate(-24 20 20)" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="34.6" cy="13.4" r="1.9" fill="currentColor" />
        <text x="20" y="25.2" textAnchor="middle" fontFamily="Onest, system-ui, sans-serif" fontSize="14.5" fontWeight="500" fill="currentColor" letterSpacing="-0.3">
          ОР
        </text>
      </svg>
    )
  }

  // ring: буквы в тонком круге
  return (
    <svg {...common}>
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.3" />
      <text x="20" y="25.2" textAnchor="middle" fontFamily="Onest, system-ui, sans-serif" fontSize="14.5" fontWeight="500" fill="currentColor" letterSpacing="-0.3">
        ОР
      </text>
    </svg>
  )
}
