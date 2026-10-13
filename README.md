# PANENKU - Agritech Marketplace Terintegrasi

Platform web yang menghubungkan petani langsung dengan pembeli dalam satu ekosistem digital yang berisi tiga layanan: konsultasi dengan petani mentor, marketplace hasil panen, dan marketplace limbah pertanian.

## 📋 Deskripsi Proyek

**PANENKU** adalah aplikasi marketplace agritech yang dirancang untuk mengatasi krisis regenerasi petani di Indonesia dengan menyediakan:
- Marketplace untuk hasil panen (Ready Stock & Pre-Order)
- Marketplace untuk limbah pertanian
- Konsultasi dengan petani mentor berpengalaman

### Target Pengguna
- **Petani/Mentor**: Sebagai penjual produk dan mentor
- **Pembeli**: Masyarakat umum atau pelaku bisnis

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (versi 20 atau lebih baru)
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone <repository-url>

# Masuk ke direktori proyek
cd panenku

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🏗️ Arsitektur & Teknologi

### Tech Stack
- **Framework**: React.js dengan Vite
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router
- **Form & Validasi**: React Hook Form + Zod
- **Grafik**: Recharts
- **Ikon**: lucide-react

### Struktur Folder

```
src/
├── components/
│   ├── ui/              # Komponen shadcn/ui
│   └── layout/          # Layout components
├── features/            # Fitur berdasarkan domain
│   ├── auth/
│   ├── marketplace/
│   ├── cart/
│   ├── konsultasi/
│   └── seller/
├── services/            # Service classes (OOP)
├── data/                # Mock data
├── types/               # TypeScript types & interfaces
├── routes/              # Route definitions
└── lib/                 # Utility functions
```

## 🎨 Design Patterns

### 1. Container-Presenter Pattern

Memisahkan logika bisnis dari presentasi UI.

**Container (Logic):**
```typescript
export function ProductListContainer() {
  const { products, filter, setFilter } = useProducts();
  return <ProductGrid products={products} filter={filter} onFilterChange={setFilter} />;
}
```

**Presenter (UI):**
```typescript
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl border p-4">
      <TypeBadge type={product.type} />
      <h3>{product.name}</h3>
      <p>Rp{product.pricePerUnit.toLocaleString('id-ID')} / {product.unit}</p>
    </div>
  );
}
```

### 2. Hooks Pattern

Custom hooks untuk reusable state logic:

```typescript
export function useCart() {
  const { items, dispatch } = useContext(CartContext);
  const total = items.reduce((sum, i) => sum + i.product.pricePerUnit * i.qty, 0);
  
  return {
    items,
    total,
    add: (p: Product, qty = 1) => dispatch({ type: 'ADD', product: p, qty }),
    remove: (id: string) => dispatch({ type: 'REMOVE', id }),
  };
}
```

### 3. Service Class Pattern (OOP)

Enkapsulasi logika data dalam classes:

```typescript
export class ProductService {
  constructor(private data: Product[]) {}

  getAll(type?: ProductType): Product[] {
    return type ? this.data.filter(p => p.type === type) : this.data;
  }

  getById(id: string): Product | undefined {
    return this.data.find(p => p.id === id);
  }
}
```

## 📍 Routes

### Public
- `/` - Landing page
- `/masuk` - Login
- `/daftar` - Register

### Pembeli
- `/pembeli/dasbor` - Dashboard pembeli
- `/pembeli/marketplace` - Marketplace (Browse produk)
- `/pembeli/produk/:id` - Detail produk
- `/pembeli/konsultasi` - Konsultasi mentor
- `/pembeli/keranjang` - Keranjang belanja
- `/pembeli/checkout` - Checkout

### Penjual
- `/penjual/dasbor` - Dashboard penjual
- `/penjual/produk` - Manajemen produk
- `/penjual/produk/tambah` - Tambah produk baru
- `/penjual/limbah` - Marketplace limbah
- `/penjual/pesanan` - Kelola pesanan
- `/penjual/analitik` - Analitik pendapatan

## 🐳 Docker

### Build Image

```bash
docker build -t <username>/panenku:v1-UTS .
```

### Run Container

```bash
docker run -p 8080:80 <username>/panenku:v1-UTS
```

Aplikasi akan berjalan di `http://localhost:8080`

### Push to Docker Hub

```bash
docker login
docker push <username>/panenku:v1-UTS
```

**Link Docker Hub**: (akan diisi setelah deployment)

## 👥 Tim Pengembang

**Praktikum POPL A - Tim 3 orang**

- Anggota 1: Fondasi, Publik & Transaksi
- Anggota 2: Domain Pembeli
- Anggota 3: Domain Penjual & Autentikasi

## 📝 Catatan Pengembangan

Proyek ini adalah bagian dari UTS POPL dengan fokus pada:
- **Front-end only**: Semua data menggunakan mock data lokal
- **No backend**: Autentikasi, pembayaran, dan chat adalah simulasi
- **Design patterns**: Implementasi Container-Presenter, Hooks, dan OOP
- **Docker**: Multi-stage build untuk deployment

## 🔄 Rencana Pengembangan

- Integrasi dengan backend REST API
- Autentikasi aman dengan JWT
- Integrasi payment gateway
- Real-time chat dengan WebSocket
- Prediksi harga berbasis AI
- Deployment ke GCP

## 📄 License

Proyek ini dibuat untuk keperluan akademik UTS POPL.
