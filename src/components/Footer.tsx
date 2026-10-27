import { PERSON } from '../config'

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__in">
        <span>© 2026 {PERSON.name}</span>
        <a href={PERSON.telegramUrl} target="_blank" rel="noreferrer">@{PERSON.telegram}</a>
      </div>
    </footer>
  )
}
