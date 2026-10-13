import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import logoPanenku from '@/assets/logo_panenku.png';
import farmingBg from '@/assets/farming_bg.png';
import { authService } from '@/services/AuthService';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Silakan masukkan email Anda');
      return;
    }
    if (!password) {
      setError('Silakan masukkan kata sandi Anda');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = authService.login(email, password);
      setIsLoading(false);

      if (!res.success || !res.user) {
        setError(res.error || 'Email atau kata sandi tidak valid');
        return;
      }

      // Redirect according to user role
      if (res.user.role === 'penjual') {
        navigate('/penjual/dasbor');
      } else {
        navigate('/pembeli/dasbor');
      }
    }, 400);
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError(null);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {/* Full-screen Background Image with Cinematic Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={farmingBg}
          alt="Indonesian Farm Landscape"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft darken & blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/75 backdrop-blur-[2px]" />
      </div>

      {/* Top Bar with "← BERANDA" */}
      <header className="relative z-10 w-full px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-emerald-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-x-0.5 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BERANDA</span>
        </Link>
      </header>

      {/* Main Container on top of background */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text / Slogan from Reference */}
          <div className="hidden lg:flex lg:col-span-6 flex-col text-white pr-4">
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.18] drop-shadow-md">
              <span>Belajar, Bertani, Panen,&nbsp;</span>
              <br />
              <span>dan </span>
              <span className="font-serif italic font-normal text-[#c6f24d]">
                Berkembang Bersama
              </span>
            </h1>
            <p className="mt-6 text-neutral-200 text-base xl:text-lg leading-relaxed max-w-lg font-normal drop-shadow">
              Bergabunglah bersama ribuan petani mandiri dan pelaku usaha sukses
              dalam ekosistem digital PANENKU.
            </p>

            {/* Quick Demo Credentials Box */}
            <div className="mt-8 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 max-w-md">
              <span className="text-[11px] font-bold text-[#c6f24d] uppercase tracking-wider block mb-2">
                ⚡ Akun Demo Instan (Klik untuk Mengisi):
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('budi@example.com')}
                  className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
                >
                  👤 Pembeli (budi@example.com)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('ani@example.com')}
                  className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
                >
                  🌾 Penjual (ani@example.com)
                </button>
              </div>
            </div>
          </div>

          {/* Right: Login Card Container (matching reference) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] bg-white rounded-[2.5rem] p-7 sm:p-10 shadow-2xl border border-neutral-100 flex flex-col">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src={logoPanenku}
                  alt="PANENKU Logo"
                  className="h-10 sm:h-11 w-auto max-h-[44px] object-contain"
                  style={{ maxHeight: '44px', width: 'auto' }}
                />
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  Masuk
                </h2>
                <p className="mt-1 text-neutral-500 text-xs sm:text-sm font-medium">
                  Selamat datang kembali di ekosistem tani kami!
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                    EMAIL
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Tulis Email Anda"
                      required
                      className="w-full bg-[#f8f9fa] border border-[#e5e7eb] focus:border-[#007a3d] focus:bg-white focus:ring-2 focus:ring-[#007a3d]/20 text-neutral-900 text-sm rounded-2xl py-3 pl-10 pr-4 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                    KATA SANDI
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tulis Kata sandi Anda"
                      required
                      className="w-full bg-[#f8f9fa] border border-[#e5e7eb] focus:border-[#007a3d] focus:bg-white focus:ring-2 focus:ring-[#007a3d]/20 text-neutral-900 text-sm rounded-2xl py-3 pl-10 pr-11 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 transition"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#007a3d] hover:bg-[#006834] active:scale-[0.98] disabled:opacity-70 text-white font-black text-sm uppercase tracking-wider py-3.5 rounded-full shadow-lg shadow-[#007a3d]/25 transition-all mt-2 cursor-pointer"
                >
                  {isLoading ? 'MEMPROSES...' : 'MASUK'}
                </button>
              </form>

              {/* Mobile Quick Demo Helper */}
              <div className="lg:hidden mt-4 pt-3 border-t border-neutral-100 text-center">
                <span className="text-[11px] text-neutral-400 block mb-1">
                  Akun Uji Coba:
                </span>
                <div className="flex justify-center gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('budi@example.com')}
                    className="text-[#007a3d] font-semibold underline"
                  >
                    Budi (Pembeli)
                  </button>
                  <span className="text-neutral-300">•</span>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('ani@example.com')}
                    className="text-[#007a3d] font-semibold underline"
                  >
                    Ani (Penjual)
                  </button>
                </div>
              </div>

              {/* Footer Switch */}
              <div className="mt-6 text-center text-xs text-neutral-500 font-medium">
                <span>belum punya akun? </span>
                <Link
                  to="/daftar"
                  className="text-[#007a3d] hover:text-[#005a2d] font-bold hover:underline transition"
                >
                  Daftar sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle bottom note */}
      <footer className="relative z-10 w-full text-center py-4 text-xs text-white/60">
        © {new Date().getFullYear()} PANENKU — Ekosistem Pertanian Digital
      </footer>
    </div>
  );
};

export default LoginPage;
