import { useState } from 'react'
import { Mail, Lock, User, Phone } from 'lucide-react'

function App() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setIsLoading(true)

    // Use relative paths for production (Nginx proxy) and development (Vite proxy)
    const endpoint = isRegistering ? '/api/register' : '/api/login'
    const body = isRegistering ? { nome, email, senha, telefone } : { email, senha }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        if (isRegistering) {
          setMessage('Cadastro realizado com sucesso! Faça login.')
          setIsRegistering(false)
          setNome('')
          setSenha('')
          setTelefone('')
        } else {
          setMessage(data.message || 'Login realizado com sucesso!')
        }
      } else {
        setError(data.message || (isRegistering ? 'Falha no cadastro' : 'Falha no login'))
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-bg-primary to-bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-bg-secondary/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-2">{isRegistering ? 'Crie sua conta' : 'Bem-vindo(a)'}</h2>
          <p className="text-text-secondary">{isRegistering ? 'Preencha os dados abaixo' : 'Faça login para continuar'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-text-secondary mb-2">
                Nome
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-text-primary placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition duration-300"
                  placeholder="Seu Nome"
                  required
                />
              </div>
            </div>
          )}

          {isRegistering && (
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-text-secondary mb-2">
                Telefone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  id="telefone"
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-text-primary placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition duration-300"
                  placeholder="Telefone"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-text-primary placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition duration-300"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-text-secondary mb-2">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-text-primary placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition duration-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`block w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-lg shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-secondary transition-all duration-300 hover:brightness-110 transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              isRegistering ? 'Cadastrar' : 'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering)
                setMessage('')
                setError('')
              }}
              className="ml-2 text-primary hover:text-cyan-400 font-medium focus:outline-none hover:underline transition-colors duration-200"
            >
              {isRegistering ? 'Faça login' : 'Cadastre-se'}
            </button>
          </p>
        </div>

        {message && (
          <div className="mt-6 p-4 bg-success/20 border border-success/50 rounded-lg">
            <p className="text-success text-center text-sm">{message}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-danger/20 border border-danger/50 rounded-lg">
            <p className="text-danger text-center text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
