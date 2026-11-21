
import { useState, type FormEvent } from 'react'
import { LockKeyhole, ArrowRight, ShieldCheck } from 'lucide-react'
import './LoginPage.css'

type LoginPageProps = {
  onLogin: (username: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Demonstration only: no credential validation.
    // Do not store or transmit the entered password.
    onLogin(username.trim() || 'Demo User')
  }

  return (
    <main className="login-page">
      <div className="login-background-glow" />

      <div className="login-container">
        <div className="login-brand">
          <span className="login-brand-symbol">▰▰</span>

          <div className="login-brand-name">
            <strong>CARNEIRO</strong>
            <span>AUTOMOTIVE</span>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel-icon">
            <LockKeyhole size={25} strokeWidth={1.6} />
          </div>

          <span className="login-eyebrow">
            AUTOMOTIVE INTELLIGENCE PLATFORM
          </span>

          <h1>Welcome back</h1>

          <p className="login-description">
            Sign in to access the battery compliance
            and traceability platform.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="login-username">
                Email or username
              </label>

              <input
                id="login-username"
                type="text"
                placeholder="Enter your email or username"
                value={username}
                onChange={event =>
                  setUsername(event.target.value)
                }
                autoComplete="off"
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={event =>
                  setPassword(event.target.value)
                }
                autoComplete="off"
              />
            </div>

            <button type="submit" className="login-submit">
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-demo-notice">
            <ShieldCheck size={16} />
            <span>
              Demonstration mode — enter any credentials
              to continue. Do not use real passwords.
            </span>
          </div>
        </div>

        <div className="login-footer">
          <span>© 2026 Carneiro Automotive</span>
          <span>Platform Demo v0.9.0</span>
        </div>
      </div>
    </main>
  )
}
