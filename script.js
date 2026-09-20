/* ==========================================================================
   1. DATA STRUCTURE (Separated for CMS expansion)
   ========================================================================== */

// Category List Definitions
const CATEGORIES = [
    { id: "Single Bouquet", name: "Single Bouquet", icon: "🌸", desc: "Satu tangkai cantik untuk senyuman manis" },
    { id: "Mini Bouquet", name: "Mini Bouquet", icon: "🌷", desc: "Ukuran imut cocok untuk kado sahabat" },
    { id: "Elegant Bouquet", name: "Elegant Bouquet", icon: "💐", desc: "Rangkaian anggun untuk wisuda & ultah" },
    { id: "Large Bouquet", name: "Large Bouquet", icon: "🌺", desc: "Buket mewah nan berkesan mendalam" },
    { id: "Pot Flower", name: "Pot Flower", icon: "🪴", desc: "Pajangan Bunga meja pot handmade" },
    { id: "Keychain", name: "Keychain", icon: "🎀", desc: "Gantungan kunci bunga gemas" },
    { id: "Gift / Custom", name: "Gift / Custom", icon: "🎁", desc: "Gift box & request bunga custom" }
];

// Initial Products Data Array
const INITIAL_PRODUCTS = [
    {
        id: "p1",
        name: "Pastel Rose Mini Bouquet",
        category: "Mini Bouquet",
        price: 35000,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        description: "Buket mini dengan kombinasi warna mawar pastel lembut. Sangat cocok untuk kado dadakan atau kelulusan teman.",
        badge: "Popular"
    },
    {
        id: "p2",
        name: "Sunflower Delight Pot",
        category: "Pot Flower",
        price: 48000,
        image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
        description: "Bunga matahari handmade dalam vas/pot mungil. Mempercantik meja belajar atau meja kerja tanpa takut layu.",
        badge: "Cute Item"
    },
    {
        id: "p3",
        name: "Tulip Romance Large Bouquet",
        category: "Large Bouquet",
        price: 125000,
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
        description: "Buket tulip rajut & pipe cleaner super rimbun. Warna romantis yang tahan lama selamanya.",
        badge: "Best Seller"
    },
    {
        id: "p4",
        name: "Single Lily Bloom Pink",
        category: "Single Bouquet",
        price: 20000,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        description: "Satu tangkai bunga lily pink dengan pita kain saten manis. Sederhana tapi sangat bermakna.",
        badge: "Sweet Gift"
    },
    {
        id: "p5",
        name: "Daisy Keychain Charm",
        category: "Keychain",
        price: 15000,
        image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80",
        description: "Gantungan kunci bunga daisy dengan gantungan emas anti karat. Gemas untuk tas atau kunci motor.",
        badge: "New"
    },
    {
        id: "p6",
        name: "Graduation Elegant Bouquet",
        category: "Elegant Bouquet",
        price: 85000,
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
        description: "Kombinasi mawar dan baby breath handmade lengkap dengan atribut topper wisuda.",
        badge: "Graduation"
    },
    {
        id: "p7",
        name: "Syafiora Special Gift Box Set",
        category: "Gift / Custom",
        price: 95000,
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
        description: "Paket lengkap buket bunga + keychain + kartu ucapan kustom dalam box eksklusif berpita.",
        badge: "Full Package"
    },
    {
        id: "p8",
        name: "Lavender Dreams Pot",
        category: "Pot Flower",
        price: 42000,
        image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80",
        description: "Rangkaian bunga lavender ungu menenangkan dalam vas berbahan kain flanel premium.",
        badge: "Relaxing"
    }
];

// Testimonials Data Array
const TESTIMONIALS = [
    {
        name: "Alya N.",
        item: "Tulip Romance Large",
        review: "Lucu banget bunganya! Warnanya sesuai request dan packaging-nya gemas ♡ Sampai tempat tujuan tetap rapi!",
        rating: 5,
        rotate: "-rotate-2"
    },
    {
        name: "Dinda R.",
        item: "Graduation Elegant",
        review: "Teman aku suka banget buat kado wisuda. Beda dari buket bunga hidup yang cepet layu. Ini awet selamanya!",
        rating: 5,
        rotate: "rotate-1"
    },
    {
        name: "Rania K.",
        item: "Daisy Keychain & Pot",
        review: "Pelayanannya ramah banget, pengerjaan cepet dan rapih poll. Pasti bakal order lagi buat ultah cowokku!",
        rating: 5,
        rotate: "-rotate-1"
    }
];

// Gallery Data Array
const GALLERY_ITEMS = [
    { title: "Graduation Order", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=500&q=80" },
    { title: "Custom Gift Box", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80" },
    { title: "Cute Pot Flowers", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=500&q=80" },
    { title: "Pastel Bouquet", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80" }
];

// State Store
let products = [];
let currentActiveModalProduct = null;

/* ==========================================================================
   2. INITIALIZATION & RENDER FUNCTIONS
   ========================================================================== */

window.onload = function() {
    // Load products from LocalStorage or Fallback
    const saved = localStorage.getItem('syafiora_products');
    if (saved) {
        try {
            products = JSON.parse(saved);
        } catch(e) {
            products = INITIAL_PRODUCTS;
        }
    } else {
        products = INITIAL_PRODUCTS;
    }

    renderCategories();
    renderProducts(products);
    renderTestimonials();
    renderGallery();
    renderAdminTable();
};

// Render Category Cards
function renderCategories() {
    const container = document.getElementById('category-cards-grid');
    container.innerHTML = CATEGORIES.map(cat => `
        <div onclick="filterByCategory('${cat.id}')" class="paper-card p-4 text-center cursor-pointer hover:border-pink-400 group">
            <div class="washi-tape-corner"></div>
            <div class="text-4xl mb-2 transform group-hover:scale-110 transition duration-300">${cat.icon}</div>
            <h3 class="font-display font-bold text-gray-800 text-base group-hover:text-pink-600">${cat.name}</h3>
            <p class="text-xs text-gray-500 mt-1 line-clamp-2">${cat.desc}</p>
            <span class="inline-block mt-3 text-xs font-bold text-pink-500 group-hover:underline">Lihat Produk →</span>
        </div>
    `).join('');
}

// Render Product Cards Grid
function renderProducts(items) {
    const container = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-catalog');

    if (!items || items.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = items.map(p => `
        <div class="paper-card overflow-hidden flex flex-col justify-between">
            <div>
                <!-- Image Container -->
                <div class="relative aspect-square overflow-hidden bg-pink-50">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transform hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/500x500/fce7f3/ec4899?text=Syafiora+Flower'">
                    
                    ${p.badge ? `
                        <span class="absolute top-3 left-3 bg-pink-400 text-white font-handwriting font-bold text-sm px-3 py-0.5 rounded-full shadow">
                            ✨ ${p.badge}
                        </span>
                    ` : ''}

                    <span class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-pink-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-pink-200">
                        ${p.category}
                    </span>
                </div>

                <!-- Info Content -->
                <div class="p-4 space-y-2">
                    <h3 class="font-display font-bold text-lg text-gray-800 line-clamp-1">${p.name}</h3>
                    <p class="text-xs text-gray-500 line-clamp-2">${p.description}</p>
                    <div class="font-display font-bold text-pink-600 text-lg">
                        Rp ${Number(p.price).toLocaleString('id-ID')}
                    </div>
                </div>
            </div>

            <!-- Card Actions -->
            <div class="p-4 pt-0 grid grid-cols-2 gap-2">
                <button onclick="openProductModal('${p.id}')" class="bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-display font-semibold py-2 rounded-xl transition">
                    View Details
                </button>
                <button onclick="directOrderWA('${p.id}')" class="bg-pink-400 hover:bg-pink-500 text-white text-xs font-display font-semibold py-2 rounded-xl shadow-sm transition flex items-center justify-center gap-1">
                    Order ♡
                </button>
            </div>
        </div>
    `).join('');
}

// Render Testimonial Cards
function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    container.innerHTML = TESTIMONIALS.map(t => `
        <div class="paper-card p-6 ${t.rotate} relative bg-white">
            <div class="washi-tape"></div>
            <div class="flex text-amber-400 text-sm mb-2">
                ${'★'.repeat(t.rating)}
            </div>
            <p class="text-gray-700 text-sm italic font-medium">"${t.review}"</p>
            <div class="mt-4 pt-3 border-t border-pink-100 flex justify-between items-center text-xs">
                <div>
                    <span class="font-bold text-gray-800 font-display block">${t.name}</span>
                    <span class="text-pink-500">${t.item}</span>
                </div>
                <span class="text-xl">🌸</span>
            </div>
        </div>
    `).join('');
}

// Render Gallery Items
function renderGallery() {
    const container = document.getElementById('gallery-grid');
    container.innerHTML = GALLERY_ITEMS.map((g, idx) => `
        <div class="relative group aspect-square rounded-2xl overflow-hidden border-2 border-pink-200 bg-pink-50 shadow-sm">
            <img src="${g.image}" alt="${g.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" onerror="this.src='https://placehold.co/400x400/fce7f3/ec4899?text=Syafiora'">
            <div class="absolute inset-0 bg-pink-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-2 text-center">
                <span class="text-white font-handwriting font-bold text-xl">${g.title}</span>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   3. FILTER & SEARCH LOGIC
   ========================================================================== */

function filterProducts() {
    const cat = document.getElementById('category-filter').value;
    const sort = document.getElementById('sort-filter').value;
    const searchVal = document.getElementById('quick-search-input').value.toLowerCase().trim();

    let result = [...products];

    // Category Filter
    if (cat !== 'ALL') {
        result = result.filter(p => p.category === cat);
    }

    // Search Query Filter
    if (searchVal) {
        result = result.filter(p => 
            p.name.toLowerCase().includes(searchVal) || 
            p.description.toLowerCase().includes(searchVal) ||
            p.category.toLowerCase().includes(searchVal)
        );
    }

    // Sorting
    if (sort === 'low-high') {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
        result.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-asc') {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(result);
}

function filterByCategory(catId) {
    document.getElementById('category-filter').value = catId;
    scrollToCatalog();
    filterProducts();
}

function handleQuickSearch(val) {
    filterProducts();
}

function resetFilters() {
    document.getElementById('category-filter').value = 'ALL';
    document.getElementById('sort-filter').value = 'default';
    document.getElementById('quick-search-input').value = '';
    filterProducts();
}

function scrollToCatalog() {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================================================
   4. MODAL & WHATSAPP ORDER LOGIC
   ========================================================================== */

function openProductModal(productId) {
    const p = products.find(item => item.id === productId);
    if (!p) return;

    currentActiveModalProduct = p;

    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-category').innerText = p.category;
    document.getElementById('modal-price').innerText = `Rp ${Number(p.price).toLocaleString('id-ID')}`;
    document.getElementById('modal-desc').innerText = p.description;

    // Reset modal inputs
    document.getElementById('modal-color-opt').value = '';
    document.getElementById('modal-qty').value = 1;
    document.getElementById('modal-note-opt').value = '';
    document.getElementById('modal-req-date').value = '';

    document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    currentActiveModalProduct = null;
}

// Direct Order WA for card click
function directOrderWA(productId) {
    const p = products.find(item => item.id === productId);
    if (!p) return;

    const text = 
`Halo Syafiora Florist! ♡

Saya tertarik untuk memesan:

Produk: ${p.name}
Kategori: ${p.category}
Harga: Rp ${Number(p.price).toLocaleString('id-ID')}
Jumlah: 1

Mohon informasi mengenai ketersediaan dan proses pemesanannya.

Terima kasih 🌷`;

    const waUrl = `https://wa.me/6289612868190?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
}

// Order WA from Detail Modal
function orderViaWhatsAppFromModal() {
    if (!currentActiveModalProduct) return;

    const p = currentActiveModalProduct;
    const color = document.getElementById('modal-color-opt').value || 'Standard/Sesuai Foto';
    const qty = document.getElementById('modal-qty').value || 1;
    const reqDate = document.getElementById('modal-req-date').value || 'Secepatnya';
    const note = document.getElementById('modal-note-opt').value || 'Tidak ada';

    const text = 
`Halo Syafiora Florist! ♡

Saya tertarik untuk memesan:

Produk: ${p.name}
Harga: Rp ${Number(p.price).toLocaleString('id-ID')}
Jumlah: ${qty}
Warna/Request: ${color}
Tanggal Dibutuhkan: ${reqDate}
Catatan Ucapan: ${note}

Mohon informasi mengenai ketersediaan dan proses pemesanannya.

Terima kasih 🌷`;

    const waUrl = `https://wa.me/6289612868190?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
}

// Custom Order Form Submission
function submitCustomOrder(event) {
    event.preventDefault();

    const name = document.getElementById('co-name').value;
    const wa = document.getElementById('co-wa').value;
    const type = document.getElementById('co-type').value;
    const budget = document.getElementById('co-budget').value || 'Menyesuaikan';
    const color = document.getElementById('co-color').value || 'Bebas / Rekomendasi Syafiora';
    const date = document.getElementById('co-date').value;
    const occasion = document.getElementById('co-occasion').value || '-';
    const notes = document.getElementById('co-notes').value || '-';

    const text = 
`Halo Syafiora Florist! ♡

Saya ingin mengajukan REQUEST CUSTOM ORDER:

Nama: ${name}
No. WA: ${wa}
Jenis Produk: ${type}
Budget: ${budget}
Request Warna: ${color}
Acara: ${occasion}
Tanggal Dibutuhkan: ${date}
Catatan Tambahan: ${notes}

Mohon bantuan untuk diskusi estimasi & desainnya. Terima kasih! 🌸`;

    const waUrl = `https://wa.me/6289612868190?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
}

/* ==========================================================================
   5. UI UTILITIES & FAQ ACCORDION
   ========================================================================== */

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);

function toggleFaq(id) {
    const ans = document.getElementById(`faq-ans-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    if (ans.classList.contains('hidden')) {
        ans.classList.remove('hidden');
        icon.innerText = '−';
    } else {
        ans.classList.add('hidden');
        icon.innerText = '+';
    }
}

/* ==========================================================================
   6. ADMIN / CMS PREVIEW FUNCTIONS
   ========================================================================== */

function toggleAdminModal() {
    const modal = document.getElementById('admin-modal');
    modal.classList.toggle('hidden');
}

function switchAdminTab(tabName) {
    if (tabName === 'products') {
        document.getElementById('admin-tab-products').classList.remove('hidden');
        document.getElementById('admin-tab-info').classList.add('hidden');
        document.getElementById('tab-btn-products').className = 'px-3 py-1.5 rounded-lg bg-pink-400 text-white font-bold';
        document.getElementById('tab-btn-info').className = 'px-3 py-1.5 rounded-lg bg-pink-100 text-pink-700';
    } else {
        document.getElementById('admin-tab-products').classList.add('hidden');
        document.getElementById('admin-tab-info').classList.remove('hidden');
        document.getElementById('tab-btn-products').className = 'px-3 py-1.5 rounded-lg bg-pink-100 text-pink-700';
        document.getElementById('tab-btn-info').className = 'px-3 py-1.5 rounded-lg bg-pink-400 text-white font-bold';
    }
}

function renderAdminTable() {
    const body = document.getElementById('admin-product-table-body');
    body.innerHTML = products.map((p, idx) => `
        <tr class="border-b border-pink-50 hover:bg-pink-50/50">
            <td class="p-2 font-medium text-gray-800">${p.name}</td>
            <td class="p-2">${p.category}</td>
            <td class="p-2">Rp ${Number(p.price).toLocaleString('id-ID')}</td>
            <td class="p-2 text-right">
                <button onclick="deleteProductFromAdmin('${p.id}')" class="text-xs text-red-500 hover:underline">Hapus</button>
            </td>
        </tr>
    `).join('');
}

function addNewProductFromAdmin() {
    const name = document.getElementById('new-p-name').value;
    const price = document.getElementById('new-p-price').value;
    const cat = document.getElementById('new-p-cat').value;
    const img = document.getElementById('new-p-img').value || 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80';
    const desc = document.getElementById('new-p-desc').value || 'Produk buket handmade istimewa Syafiora Florist.';

    if (!name || !price) {
        alert('Mohon isi nama produk dan harga!');
        return;
    }

    const newProduct = {
        id: 'p_' + Date.now(),
        name: name,
        category: cat,
        price: Number(price),
        image: img,
        description: desc,
        badge: 'Custom'
    };

    products.unshift(newProduct);
    saveAndSyncProducts();

    // Clear inputs
    document.getElementById('new-p-name').value = '';
    document.getElementById('new-p-price').value = '';
    document.getElementById('new-p-desc').value = '';
    
    alert('Produk berhasil ditambahkan ke katalog!');
}

function deleteProductFromAdmin(id) {
    if (confirm('Yakin ingin menghapus produk ini dari katalog?')) {
        products = products.filter(p => p.id !== id);
        saveAndSyncProducts();
    }
}

function saveAndSyncProducts() {
    localStorage.setItem('syafiora_products', JSON.stringify(products));
    renderProducts(products);
    renderAdminTable();
}
