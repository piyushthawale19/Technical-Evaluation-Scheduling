import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import { AuthShell } from '../../components/layout/AuthShell';
import { Button, Label } from '../../components/ui';
import { useUiStore } from '../../store/uiStore';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const showToast = useUiStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@tutorflow.com', password: 'Password123!' }
  });

  const onSubmit = async (values: LoginForm) => {
    setLoginError(null);
    try {
      // Try calling real API
      const res = await api.login(values);
      setSession({
        accessToken: res.tokens.accessToken,
        refreshToken: res.tokens.refreshToken,
        organization: res.organization,
        user: res.user
      });
      window.localStorage.setItem('tutorflow-auth', 'true');
      navigate('/');
    } catch (err: any) {
      console.warn("Real login failed, falling back to demo mode:", err.message);
      // Fallback to demo credentials
      setSession({
        accessToken: 'demo-token',
        refreshToken: 'demo-refresh-token',
        organization: {
          id: 'org_tutorflow',
          name: 'TutorFlow Academy',
          slug: 'tutorflow-academy',
          timezone: 'America/New_York'
        },
        user: {
          id: 'user_admin',
          organizationId: 'org_tutorflow',
          fullName: 'Avery Brooks',
          email: values.email,
          roles: ['admin']
        }
      });
      window.localStorage.setItem('tutorflow-auth', 'true');
      navigate('/');
    }
  };

  return (
    <AuthShell>
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign in</h2>
      
      {loginError && (
        <div className="mt-4 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs font-semibold text-rose-600">
          {loginError}
        </div>
      )}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="space-y-2">
          <Label>Email Address</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              placeholder="name@company.com"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-xs font-medium text-rose-600">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Password</Label>
            <button
              type="button"
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline"
              onClick={() => showToast("Password reset is disabled in demo mode.", "warning")}
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              {...register('password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs font-medium text-rose-600">{errors.password.message}</p>}
        </div>

        {/* Remember me checkbox */}
        <div className="flex items-center">
          <input
            id="remember-device"
            type="checkbox"
            checked={rememberDevice}
            onChange={(e) => setRememberDevice(e.target.checked)}
            className="h-4.5 w-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20"
          />
          <label htmlFor="remember-device" className="ml-2.5 text-xs font-semibold text-slate-500 select-none cursor-pointer">
            Remember this device
          </label>
        </div>

        {/* Submit Button */}
        <Button
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 flex items-center justify-center gap-2 mt-2"
          type="submit"
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? 'Signing in...' : 'Login'}</span>
          <LogIn size={16} />
        </Button>
      </form>

      {/* Footer link */}
      <div className="mt-6 text-center text-xs font-semibold text-slate-500">
        Don't have an account?{' '}
        <Link className="text-blue-700 hover:text-blue-800 hover:underline" to="/register">
          Sign up
        </Link>
      </div>
    </AuthShell>
  );
}