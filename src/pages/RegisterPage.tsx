import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Mail, Lock, Eye, EyeOff, AlertCircle, ShoppingCart, Store, CheckCircle2 } from 'lucide-react';
import logoPanenku from '@/assets/logo_panenku.png';
import farmingBg from '@/assets/farming_bg.png';
import { authService } from '@/services/AuthService';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<'pembeli' | 'penjual'>('pembeli');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setError('Silakan masukkan nama lengkap Anda.');
      return;
    }
    if (!email.trim()) {
      setError('Silakan masukkan alamat email.');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi harus minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = authService.register({
        name,
        email,
        password,
        role,
      });

      setIsLoading(false);

      if (!res.success || !res.user) {
        setError(res.error || 'Terjadi kesalahan saat mendaftar.');
        return;
      }

      setSuccessMsg('Pendaftaran berhasil! Mengalihkan ke dasbor...');

      setTimeout(() => {
        if (res.user?.role === 'penjual') {
          navigate('/penjual/dasbor');
        } else {
          navigate('/pembeli/dasbor');
        }
      }, 700);
    }, 400);
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
              <span>Mulai Bertani &amp; Berdagang,&nbsp;</span>
              <br />
              <span>Bersama </span>
              <span className="font-serif italic font-normal text-[#c6f24d]">
                Ekosistem Panenku
              </span>
            </h1>
            <p className="mt-6 text-neutral-200 text-base xl:text-lg leading-relaxed max-w-lg font-normal drop-shadow">
              Daftar sekarang untuk membuka akses langsung ke ribuan pembeli,
              jaringan mentor ahli agronomi, dan pasar limbah organik sirkular.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="mt-8 space-y-3 max-w-md">
              <div className="flex items-center gap-3 text-sm text-neutral-200">
                <CheckCircle2 className="w-5 h-5 text-[#c6f24d] shrink-0" />
                <span>Tanpa biaya pendaftaran &amp; tanpa biaya langganan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-200">
                <CheckCircle2 className="w-5 h-5 text-[#c6f24d] shrink-0" />
                <span>Sistem pembayaran aman escrow terintegrasi</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-200">
                <CheckCircle2 className="w-5 h-5 text-[#c6f24d] shrink-0" />
                <span>Konsultasi gratis budidaya dan solusi hama</span>
              </div>
            </div>
          </div>

          {/* Right: Register Card Container */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] bg-white rounded-[2.5rem] p-7 sm:p-9 shadow-2xl border border-neutral-100 flex flex-col">
              {/* Logo */}
              <div className="flex justify-center mb-3">
                <img
                  src={logoPanenku}
                  alt="PANENKU Logo"
                  className="h-9 sm:h-10 w-auto max-h-[40px] object-contain"
                  style={{ maxHeight: '40px', width: 'auto' }}
                />
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-5">
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  Daftar Akun
                </h2>
                <p className="mt-1 text-neutral-500 text-xs sm:text-sm font-medium">
                  Lengkapi data untuk bergabung ke ekosistem kami!
                </p>
              </div>

              {/* Status Alert */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Role Switcher */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-2">
                    PILIH PERAN ANDA
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setRole('pembeli')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                        role === 'pembeli'
                          ? 'border-[#007a3d] bg-emerald-50/70 text-[#007a3d] ring-2 ring-[#007a3d]/20 shadow-sm'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Pembeli / Konsumen</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('penjual')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                        role === 'penjual'
                          ? 'border-[#007a3d] bg-emerald-50/70 text-[#007a3d] ring-2 ring-[#007a3d]/20 shadow-sm'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Penjual / Petani</span>
                    </button>
                  </div>
                </div>

                {/* Nama Lengkap */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                    NAMA LENGKAP
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tulis Nama Lengkap Anda"
                      required
                      className="w-full bg-[#f8f9fa] border border-[#e5e7eb] focus:border-[#007a3d] focus:bg-white focus:ring-2 focus:ring-[#007a3d]/20 text-neutral-900 text-sm rounded-2xl py-2.5 sm:py-3 pl-10 pr-4 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
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
                      className="w-full bg-[#f8f9fa] border border-[#e5e7eb] focus:border-[#007a3d] focus:bg-white focus:ring-2 focus:ring-[#007a3d]/20 text-neutral-900 text-sm rounded-2xl py-2.5 sm:py-3 pl-10 pr-4 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password in 2 Columns on desktop or stacked */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
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
                        placeholder="Min. 6 karakter"
                        required
                        className="w-full bg-[#f8f9fa] border border-[#e5e7eb] focus:border-[#007a3d] focus:bg-white focus:ring-2 focus:ring-[#007a3d]/20 text-neutral-900 text-sm rounded-2xl py-2.5 sm:py-3 pl-10 pr-9 transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                      KONFIRMASI SANDI
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi sandi"
                        required
                        className="w-full bg-[#f8f9fa] border border-[#e5e7eb] focus:border-[#007a3d] focus:bg-white focus:ring-2 focus:ring-[#007a3d]/20 text-neutral-900 text-sm rounded-2xl py-2.5 sm:py-3 pl-10 pr-4 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#007a3d] hover:bg-[#006834] active:scale-[0.98] disabled:opacity-70 text-white font-black text-sm uppercase tracking-wider py-3.5 rounded-full shadow-lg shadow-[#007a3d]/25 transition-all mt-3 cursor-pointer"
                >
                  {isLoading ? 'MENDAFTAR...' : 'DAFTAR SEKARANG'}
                </button>
              </form>

              {/* Footer Switch */}
              <div className="mt-5 text-center text-xs text-neutral-500 font-medium">
                <span>sudah punya akun? </span>
                <Link
                  to="/masuk"
                  className="text-[#007a3d] hover:text-[#005a2d] font-bold hover:underline transition"
                >
                  Masuk sekarang
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

export default RegisterPage;
