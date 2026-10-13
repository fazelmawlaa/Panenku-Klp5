# 🌾 PANENKU — Agritech Marketplace Terintegrasi

> Platform web yang menghubungkan petani langsung dengan pembeli dalam satu ekosistem digital yang mencakup **marketplace hasil panen**, **marketplace limbah pertanian**, dan **konsultasi dengan petani mentor**.

---

## 📋 Deskripsi Proyek

**PANENKU** adalah aplikasi marketplace agritech front-end yang dirancang untuk mengatasi krisis regenerasi petani di Indonesia. Proyek ini dibuat sebagai bagian dari **UTS mata kuliah POPL (Principles of Programming Languages)** dengan penerapan design pattern yang terstruktur.

### ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🛒 Marketplace | Browse produk hasil panen (Ready Stock & Pre-Order) dan limbah pertanian |
| 🛍️ Keranjang Belanja | Tambah produk ke keranjang, reaktif & persisten via `localStorage` |
| 💳 Checkout | Proses pembelian dengan ringkasan pesanan |
| 📦 Histori Pesanan | Riwayat transaksi pembeli tersimpan otomatis setelah checkout |
| 👨‍🌾 Konsultasi Mentor | Hubungi petani mentor berpengalaman |
| 📊 Dashboard Pembeli | Statistik belanja, transaksi terbaru, dan ringkasan akun |
| 📊 Dashboard Penjual | Kelola produk, analitik penjualan, dan pesanan masuk |
| 🔐 Autentikasi | Halaman Login & Register (simulasi, tanpa backend) |

### 👤 Target Pengguna

- **Pembeli** — Masyarakat umum atau pelaku bisnis yang ingin membeli hasil panen langsung dari petani
- **Penjual/Mentor** — Petani yang ingin menjual produk, mengelola stok, dan berbagi ilmu

---

## 🚀 Cara Menjalankan

### Prerequisites

- **Node.js** versi 20 atau lebih baru
- **npm** (sudah termasuk dalam Node.js)

### Instalasi & Menjalankan Lokal

```bash
# 1. Clone repository
git clone <repository-url>
cd panenku

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di → **`http://localhost:5173`**

### Script yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan development server (Vite) |
| `npm run build` | Build untuk produksi (TypeScript compile + Vite bundle) |
| `npm run preview` | Preview hasil build produksi secara lokal |
| `npm run lint` | Jalankan linter (oxlint) |

---

## 🐳 Docker

Proyek menggunakan **multi-stage Docker build** — tahap pertama mem-build aplikasi React, tahap kedua melayani static file via **Nginx**.

### Build Image

```bash
docker build -t <username>/panenku:v1-UTS .
```

### Run Container

```bash
docker run -p 8080:80 <username>/panenku:v1-UTS
```

Aplikasi akan berjalan di → **`http://localhost:8080`**

### Push ke Docker Hub

```bash
docker login
docker push <username>/panenku:v1-UTS
```

> **Link Docker Hub:** _(isi setelah deployment)_

---

## 🏗️ Arsitektur & Teknologi

### Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | React 19 + Vite 8 |
| Bahasa | TypeScript 6 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Routing | React Router v7 |
| Form & Validasi | React Hook Form + Zod |
| Grafik | Recharts |
| Ikon | lucide-react |
| Linter | oxlint |
| State Persistence | `localStorage` (tanpa backend) |

### Struktur Folder

```
panenku/
├── public/
├── src/
│   ├── assets/             # Gambar & aset statis
│   ├── components/
│   │   ├── ui/             # Komponen shadcn/ui (Button, Card, dll.)
│   │   └── layout/         # Layout wrapper (BuyerLayout, dll.)
│   ├── data/               # Mock data (produk, mentor, transaksi)
│   ├── features/           # Fitur berdasarkan domain bisnis
│   │   ├── auth/           # Login & Register
│   │   ├── cart/           # Komponen keranjang
│   │   ├── dashboard/      # Dashboard pembeli & penjual
│   │   ├── konsultasi/     # Halaman konsultasi mentor
│   │   ├── marketplace/    # Browse & detail produk
│   │   └── seller/         # Fitur manajemen penjual
│   ├── lib/                # Utility (cn helper, dll.)
│   ├── pages/              # Halaman top-level
│   │   ├── buyer/          # Halaman khusus pembeli
│   │   └── seller/         # Halaman khusus penjual
│   ├── routes/             # Definisi routing React Router
│   ├── services/           # Service classes (OOP)
│   │   ├── AuthService.ts
│   │   ├── BuyerDashboardService.ts
│   │   ├── CartService.ts
│   │   ├── MentorService.ts
│   │   ├── OrderService.ts
│   │   └── ProductService.ts
│   └── types/              # TypeScript interfaces & types
├── Dockerfile
├── nginx.conf
└── package.json
```

---

## 🎨 Design Patterns

Proyek ini mengimplementasikan beberapa design pattern sebagai bagian dari materi POPL:

### 1. Service Class Pattern (OOP)

Logika data dienkapsulasi dalam class, memisahkan layer data dari layer UI.

```typescript
// services/CartService.ts
export class CartService {
  private readonly STORAGE_KEY = 'panenku_cart_items';

  getItems(): CartItem[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  addItem(product: Product, qty: number = 1): void {
    const items = this.getItems();
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ product, qty });
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
}

export const cartService = new CartService();
```

### 2. Observer / Custom Event Pattern

Komponen UI bereaksi terhadap perubahan state via `CustomEvent` pada `window`, sehingga keranjang dan dashboard selalu sinkron tanpa perlu prop drilling.

```typescript
// Dispatch event setelah data berubah
window.dispatchEvent(new CustomEvent('cart-updated'));

// Komponen mendengarkan event
useEffect(() => {
  const handler = () => setCount(cartService.getTotalItems());
  window.addEventListener('cart-updated', handler);
  return () => window.removeEventListener('cart-updated', handler);
}, []);
```

### 3. Container-Presenter Pattern

Memisahkan logika bisnis (container) dari tampilan (presenter).

```typescript
// Container — mengurus data & state
export function MarketplacePage() {
  const [products, setProducts] = useState(productService.getAll());
  return <ProductGrid products={products} />;
}

// Presenter — hanya menampilkan UI
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl border p-4">
      <h3>{product.name}</h3>
      <p>Rp{product.pricePerUnit.toLocaleString('id-ID')} / {product.unit}</p>
    </div>
  );
}
```

### 4. Singleton Pattern

Setiap service diinstansiasi sekali dan digunakan secara shared di seluruh aplikasi.

```typescript
// Satu instance digunakan di seluruh aplikasi
export const cartService = new CartService();
export const productService = new ProductService(mockProducts);
export const orderService = new OrderService();
```

---

## 📍 Routes

### Publik

| Route | Halaman |
|---|---|
| `/` | Landing Page |
| `/masuk` | Login |
| `/daftar` | Register |

### Pembeli (`/pembeli/...`)

| Route | Halaman |
|---|---|
| `/pembeli/dasbor` | Dashboard pembeli |
| `/pembeli/marketplace` | Browse produk |
| `/pembeli/produk/:id` | Detail produk |
| `/pembeli/konsultasi` | Konsultasi mentor |
| `/pembeli/keranjang` | Keranjang belanja |
| `/pembeli/checkout` | Proses checkout |
| `/pembeli/pesanan` | Histori pesanan |

### Penjual (`/penjual/...`)

| Route | Halaman |
|---|---|
| `/penjual/dasbor` | Dashboard penjual |
| `/penjual/produk` | Manajemen produk |
| `/penjual/produk/tambah` | Tambah produk baru |
| `/penjual/limbah` | Marketplace limbah |
| `/penjual/pesanan` | Kelola pesanan masuk |
| `/penjual/analitik` | Analitik pendapatan |

---

## 📝 Catatan Pengembangan

- **Front-end only** — Semua data menggunakan mock data lokal (`src/data/`)
- **Tanpa backend** — Autentikasi, pembayaran, dan chat adalah simulasi
- **Persistensi data** menggunakan `localStorage` browser
- **Reaktivitas** menggunakan `CustomEvent` pada `window` (bukan Context/Redux)
- **Docker** menggunakan multi-stage build (Node → Nginx)

---

## 👥 Tim Pengembang

**Praktikum POPL — Kelompok 5**

| Anggota | Tugas |
|---|---|
| Anggota 1 | Fondasi proyek, halaman publik, cart & checkout |
| Anggota 2 | Domain pembeli (marketplace, dashboard, pesanan) |
| Anggota 3 | Domain penjual & autentikasi |

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik **UTS POPL**. Tidak untuk digunakan secara komersial.
