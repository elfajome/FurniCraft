import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser, logoutUser } from '../store/slices/authSlice'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Account() {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await dispatch(loginUser({ email, password })).unwrap()
      } else {
        await dispatch(registerUser({ email, password, name: name || undefined })).unwrap()
      }
    } catch {
      // error in state
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if (user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <h1 className="text-2xl font-bold text-text mb-4">My Account</h1>
        <div className="p-6 bg-surface-alt rounded-xl border border-border">
          <p className="text-text">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          {user.name && (
            <p className="text-text mt-2">
              <span className="font-medium">Name:</span> {user.name}
            </p>
          )}
          <Button variant="outline" className="mt-4" onClick={handleLogout}>
            LogOut
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-2xl font-bold text-text mb-6">
        {isLogin ? 'LogIn' : 'SignUp'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="FullName"
          />
        )}
        <Input
          type="email"
          label=" Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Loading...' : isLogin ? 'Login' : 'SignUp'}
        </Button>
      </form>
      <button
        type="button"
        className="mt-4 text-primary font-medium hover:cursor-pointer hover:underline"
        onClick={() => {
          setIsLogin(!isLogin)
          setEmail('')
          setPassword('')
          setName('')
        }}
      >
        {isLogin ? 'Not Have Account please SignUp' : 'Already Have Account please LogIn'}
      </button>
    </div>
  )
}
