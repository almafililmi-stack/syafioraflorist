/* ==========================================================================
   SYAFIORA FLORIST — SUPABASE CMS
   ========================================================================== */

const SUPABASE_URL = 'https://mdafjkmatguztjbgjgzl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5BZFHzT_HdOhgOMCZEbhaA_coWPjkhn';
const STORAGE_BUCKET = 'syafiora-images';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CATEGORIES = [
    { id: "Single Bouquet", name: "Single Bouquet", icon: "🌸", desc: "Satu tangkai cantik untuk senyuman manis" },
    { id: "Mini Bouquet", name: "Mini Bouquet", icon: "🌷", desc: "Ukuran imut cocok untuk kado sahabat" },
    { id: "Elegant Bouquet", name: "Elegant Bouquet", icon: "💐", desc: "Rangkaian anggun untuk wisuda & ultah" },
    { id: "Large Bouquet", name: "Large Bouquet", icon: "🌺", desc: "Buket mewah nan berkesan mendalam" },
    { id: "Pot Flower", name: "Pot Flower", icon: "🪴", desc: "Pajangan Bunga meja pot handmade" },
    { id: "Keychain", name: "Keychain", icon: "🎀", desc: "Gantungan kunci bunga gemas" },
    { id: "Gift / Custom", name: "Gift / Custom", icon: "🎁", desc: "Gift box & request bunga custom" }
];

const FALLBACK_PRODUCTS = [
    {
        id:"p1",
        name:"Pastel Rose Mini Bouquet",
        category:"Mini Bouquet",
        price:35000,
        image:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        description:"Buket mini dengan kombinasi warna mawar pastel lembut. Sangat cocok untuk kado dadakan atau kelulusan teman.",
        badge:"Popular"
    },
    {
        id:"p2",
        name:"Sunflower Delight Pot",
        category:"Pot Flower",
        price:48000,
        image:"https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
        description:"Bunga matahari handmade dalam vas/pot mungil. Mempercantik meja belajar atau meja kerja tanpa takut layu.",
        badge:"Cute Item"
    },
    {
        id:"p3",
        name:"Tulip Romance Large Bouquet",
        category:"Large Bouquet",
        price:125000,
        image:"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
        description:"Buket tulip rajut & pipe cleaner super rimbun. Warna romantis yang tahan lama selamanya.",
        badge:"Best Seller"
    },
    {
        id:"p4",
        name:"Single Lily Bloom Pink",
        category:"Single Bouquet",
        price:20000,
        image:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        description:"Satu tangkai bunga lily pink dengan pita kain saten manis. Sederhana tapi sangat bermakna.",
        badge:"Sweet Gift"
    },
    {
        id:"p5",
        name:"Daisy Keychain Charm",
        category:"Keychain",
        price:15000,
        image:"https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80",
        description:"Gantungan kunci bunga daisy dengan gantungan emas anti karat. Gemas untuk tas atau kunci motor.",
        badge:"New"
    },
    {
        id:"p6",
        name:"Graduation Elegant Bouquet",
        category:"Elegant Bouquet",
        price:85000,
        image:"https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
        description:"Kombinasi mawar dan baby breath handmade lengkap dengan atribut topper wisuda.",
        badge:"Graduation"
    },
    {
        id:"p7",
        name:"Syafiora Special Gift Box Set",
        category:"Gift / Custom",
        price:95000,
        image:"https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
        description:"Paket lengkap buket bunga + keychain + kartu ucapan kustom dalam box eksklusif berpita.",
        badge:"Full Package"
    },
    {
        id:"p8",
        name:"Lavender Dreams Pot",
        category:"Pot Flower",
        price:42000,
        image:"https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80",
        description:"Rangkaian bunga lavender ungu menenangkan dalam vas berbahan kain flanel premium.",
        badge:"Relaxing"
    }
];

let products = [];
let currentActiveModalProduct = null;
let currentUser = null;

window.onload = async function() {
    renderCategories();
    await loadPublicData();
    await restoreAdminSession();

    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
    }
};

async function loadPublicData() {
    try {
        const [
            { data: productData, error: productError },
            { data: testimonialData, error: testimonialError },
            { data: galleryData, error: galleryError },
            { data: siteData, error: siteError }
        ] = await Promise.all([
            sb.from('products')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending:false }),

            sb.from('testimonials')
                .select('*')
                .eq('status', 'approved')
                .order('created_at', { ascending:false }),

            sb.from('gallery')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending:false }),

            sb.from('site_media')
                .select('*')
        ]);

        if (productError) throw productError;

        products = productData || [];

        renderProducts(products);
        renderTestimonials(testimonialData || []);
        renderGallery(galleryData || []);
        applySiteMedia(siteData || []);

    } catch (error) {
        console.error(error);

        products = FALLBACK_PRODUCTS;

        renderProducts(products);
        renderTestimonials([]);
        renderGallery([]);

        showConfigNotice();
    }
}

function showConfigNotice() {
    if (!SUPABASE_URL.includes('PASTE_')) return;

    const el = document.getElementById('admin-status');

    if (el) {
        el.innerText =
            'Supabase belum dikonfigurasi. Isi SUPABASE_URL dan SUPABASE_ANON_KEY di script.js.';
    }
}

function renderCategories() {
    const container = document.getElementById('category-cards-grid');

    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
        <div
            onclick="filterByCategory('${cat.id}')"
            class="paper-card p-4 text-center cursor-pointer hover:border-pink-400 group"
        >
            <div class="washi-tape-corner"></div>

            <div class="text-4xl mb-2 transform group-hover:scale-110 transition duration-300">
                ${cat.icon}
            </div>

            <h3 class="font-display font-bold text-gray-800 text-base group-hover:text-pink-600">
                ${cat.name}
            </h3>

            <p class="text-xs text-gray-500 mt-1 line-clamp-2">
                ${cat.desc}
            </p>

            <span class="inline-block mt-3 text-xs font-bold text-pink-500 group-hover:underline">
                Lihat Produk →
            </span>
        </div>
    `).join('');
}

function renderProducts(items) {
    const container = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-catalog');

    if (!container) return;

    if (!items || !items.length) {
        container.innerHTML = '';

        if (emptyState) {
            emptyState.classList.remove('hidden');
        }

        return;
    }

    if (emptyState) {
        emptyState.classList.add('hidden');
    }

    container.innerHTML = items.map(p => `
        <div class="paper-card overflow-hidden flex flex-col justify-between">

            <div>

                <div class="relative aspect-square overflow-hidden bg-pink-50">

                    <img
                        src="${escapeHtml(p.image || '')}"
                        alt="${escapeHtml(p.name)}"
                        class="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                        onerror="this.src='https://placehold.co/500x500/fce7f3/ec4899?text=Syafiora+Flower'"
                    >

                    ${
                        p.badge
                        ? `
                            <span class="absolute top-3 left-3 bg-pink-400 text-white font-handwriting font-bold text-sm px-3 py-0.5 rounded-full shadow">
                                ✨ ${escapeHtml(p.badge)}
                            </span>
                        `
                        : ''
                    }

                    <span class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-pink-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-pink-200">
                        ${escapeHtml(p.category)}
                    </span>

                </div>

                <div class="p-4 space-y-2">

                    <h3 class="font-display font-bold text-lg text-gray-800 line-clamp-1">
                        ${escapeHtml(p.name)}
                    </h3>

                    <p class="text-xs text-gray-500 line-clamp-2">
                        ${escapeHtml(p.description || '')}
                    </p>

                    <div class="font-display font-bold text-pink-600 text-lg">
                        Rp ${Number(p.price).toLocaleString('id-ID')}
                    </div>

                </div>

            </div>

            <div class="p-4 pt-0 grid grid-cols-2 gap-2">

                <button
                    onclick="openProductModal('${p.id}')"
                    class="bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-display font-semibold py-2 rounded-xl"
                >
                    View Details
                </button>

                <button
                    onclick="directOrderWA('${p.id}')"
                    class="bg-pink-400 hover:bg-pink-500 text-white text-xs font-display font-semibold py-2 rounded-xl"
                >
                    Order ♡
                </button>

            </div>

        </div>
    `).join('');
}

function renderTestimonials(items) {
    const container = document.getElementById('testimonials-grid');

    if (!container) return;

    if (!items.length) {
        container.innerHTML = `
            <div class="col-span-full text-center text-sm text-gray-400 py-8">
                Belum ada testimoni yang dipublikasikan.
            </div>
        `;

        return;
    }

    const rotations = [
        '-rotate-2',
        'rotate-1',
        '-rotate-1',
        'rotate-2'
    ];

    container.innerHTML = items.map((t, idx) => `
        <div class="paper-card p-6 ${rotations[idx % rotations.length]} relative bg-white">

            <div class="washi-tape"></div>

            <div class="flex text-amber-400 text-sm mb-2">
                ${'★'.repeat(Number(t.rating || 5))}
                ${'☆'.repeat(5 - Number(t.rating || 5))}
            </div>

            <p class="text-gray-700 text-sm italic font-medium">
                "${escapeHtml(t.review)}"
            </p>

            <div class="mt-4 pt-3 border-t border-pink-100 flex justify-between items-center text-xs">

                <div>

                    <span class="font-bold text-gray-800 font-display block">
                        ${escapeHtml(t.name)}
                    </span>

                    <span class="text-pink-500">
                        ${escapeHtml(t.item || 'Customer Syafiora')}
                    </span>

                </div>

                <span class="text-xl">🌸</span>

            </div>

        </div>
    `).join('');
}

function renderGallery(items) {
    const container = document.getElementById('gallery-grid');

    if (!container) return;

    if (!items.length) {
        container.innerHTML = `
            <div class="col-span-full text-center text-sm text-gray-400 py-8">
                Belum ada foto gallery.
            </div>
        `;

        return;
    }

    container.innerHTML = items.map(g => `
        <div class="relative group aspect-square rounded-2xl overflow-hidden border-2 border-pink-200 bg-pink-50 shadow-sm">

            <img
                src="${escapeHtml(g.image_url)}"
                alt="${escapeHtml(g.title || 'Syafiora')}"
                class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                onerror="this.src='https://placehold.co/400x400/fce7f3/ec4899?text=Syafiora'"
            >

            <div class="absolute inset-0 bg-pink-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-2 text-center">

                <span class="text-white font-handwriting font-bold text-xl">
                    ${escapeHtml(g.title || '')}
                </span>

            </div>

        </div>
    `).join('');
}

function applySiteMedia(items) {
    const map = Object.fromEntries(
        items.map(x => [x.key, x.image_url])
    );

    const heroImage = document.getElementById('site-hero-image');
    const aboutImage = document.getElementById('site-about-image');

    if (map.hero && heroImage) {
        heroImage.src = map.hero;
    }

    if (map.about && aboutImage) {
        aboutImage.src = map.about;
    }

    const heroPreview = document.getElementById('admin-preview-hero');
    const aboutPreview = document.getElementById('admin-preview-about');

    if (heroPreview && heroImage) {
        heroPreview.src = map.hero || heroImage.src;
    }

    if (aboutPreview && aboutImage) {
        aboutPreview.src = map.about || aboutImage.src;
    }
}

function filterProducts() {
    const cat = document.getElementById('category-filter').value;
    const sort = document.getElementById('sort-filter').value;
    const searchVal =
        document.getElementById('quick-search-input').value
        .toLowerCase()
        .trim();

    let result = [...products];

    if (cat !== 'ALL') {
        result = result.filter(
            p => p.category === cat
        );
    }

    if (searchVal) {
        result = result.filter(p =>
            (p.name || '').toLowerCase().includes(searchVal) ||
            (p.description || '').toLowerCase().includes(searchVal) ||
            (p.category || '').toLowerCase().includes(searchVal)
        );
    }

    if (sort === 'low-high') {
        result.sort((a,b) => a.price - b.price);

    } else if (sort === 'high-low') {
        result.sort((a,b) => b.price - a.price);

    } else if (sort === 'name-asc') {
        result.sort((a,b) =>
            a.name.localeCompare(b.name)
        );
    }

    renderProducts(result);
}

function filterByCategory(catId) {
    document.getElementById('category-filter').value = catId;

    scrollToCatalog();

    filterProducts();
}

function handleQuickSearch() {
    filterProducts();
}

function resetFilters() {
    document.getElementById('category-filter').value = 'ALL';

    document.getElementById('sort-filter').value = 'default';

    document.getElementById('quick-search-input').value = '';

    filterProducts();
}

function scrollToCatalog() {
    document
        .getElementById('catalog')
        .scrollIntoView({
            behavior:'smooth'
        });
}

function openProductModal(productId) {

    const p = products.find(
        item => String(item.id) === String(productId)
    );

    if (!p) return;

    currentActiveModalProduct = p;

    document.getElementById('modal-img').src = p.image;

    document.getElementById('modal-title').innerText = p.name;

    document.getElementById('modal-category').innerText =
        p.category;

    document.getElementById('modal-price').innerText =
        `Rp ${Number(p.price).toLocaleString('id-ID')}`;

    document.getElementById('modal-desc').innerText =
        p.description || '';

    document.getElementById('modal-color-opt').value = '';

    document.getElementById('modal-qty').value = 1;

    document.getElementById('modal-note-opt').value = '';

    document.getElementById('modal-req-date').value = '';

    document
        .getElementById('product-modal')
        .classList
        .remove('hidden');
}

function closeProductModal() {

    document
        .getElementById('product-modal')
        .classList
        .add('hidden');

    currentActiveModalProduct = null;
}

function directOrderWA(productId) {

    const p = products.find(
        item => String(item.id) === String(productId)
    );

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

    window.open(
        `https://wa.me/6289612868190?text=${encodeURIComponent(text)}`,
        '_blank'
    );
}

function orderViaWhatsAppFromModal() {

    if (!currentActiveModalProduct) return;

    const p = currentActiveModalProduct;

    const color =
        document.getElementById('modal-color-opt').value ||
        'Standard/Sesuai Foto';

    const qty =
        document.getElementById('modal-qty').value ||
        1;

    const reqDate =
        document.getElementById('modal-req-date').value ||
        'Secepatnya';

    const note =
        document.getElementById('modal-note-opt').value ||
        'Tidak ada';

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

    window.open(
        `https://wa.me/6289612868190?text=${encodeURIComponent(text)}`,
        '_blank'
    );
}

function submitCustomOrder(event) {

    event.preventDefault();

    const ids = [
        'co-name',
        'co-wa',
        'co-type',
        'co-budget',
        'co-color',
        'co-date',
        'co-occasion',
        'co-notes'
    ];

    const [
        name,
        wa,
        type,
        budget,
        color,
        date,
        occasion,
        notes
    ] = ids.map(
        id => document.getElementById(id)?.value || '-'
    );

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

    window.open(
        `https://wa.me/6289612868190?text=${encodeURIComponent(text)}`,
        '_blank'
    );
}

function toggleMobileMenu() {

    document
        .getElementById('mobile-menu')
        .classList
        .toggle('hidden');
}

function toggleFaq(id) {

    const ans =
        document.getElementById(`faq-ans-${id}`);

    const icon =
        document.getElementById(`faq-icon-${id}`);

    ans.classList.toggle('hidden');

    icon.innerText =
        ans.classList.contains('hidden')
            ? '+'
            : '−';
}

function toggleAdminModal() {

    document
        .getElementById('admin-modal')
        .classList
        .toggle('hidden');

    if (
        !document
            .getElementById('admin-modal')
            .classList
            .contains('hidden')
    ) {
        refreshAdminUI();
    }
}

function switchAdminTab(tabName) {

    [
        'products',
        'testimonials',
        'gallery',
        'site'
    ].forEach(name => {

        document
            .getElementById(`admin-tab-${name}`)
            .classList
            .toggle(
                'hidden',
                name !== tabName
            );

        document
            .getElementById(`tab-btn-${name}`)
            .className =
            name === tabName

                ? 'px-3 py-2 rounded-lg bg-pink-400 text-white font-bold'

                : 'px-3 py-2 rounded-lg bg-pink-100 text-pink-700';
    });

    refreshAdminUI();
}

async function restoreAdminSession() {

    const {
        data: { session }
    } = await sb.auth.getSession();

    currentUser = session?.user || null;

    refreshAdminUI();

    sb.auth.onAuthStateChange(
        (_event, session) => {

            currentUser =
                session?.user || null;

            refreshAdminUI();
        }
    );
}

function refreshAdminUI() {

    const logged = !!currentUser;

    document
        .getElementById('admin-login-panel')
        .classList
        .toggle('hidden', logged);

    document
        .getElementById('admin-cms-panel')
        .classList
        .toggle('hidden', !logged);

    document
        .getElementById('admin-status')
        .innerText =
        logged
            ? `Login: ${currentUser.email}`
            : 'Login untuk mengelola website.';

    if (logged) {

        renderAdminProducts();

        renderAdminTestimonials();

        renderAdminGallery();

        loadSitePreviews();
    }
}

async function adminLogin(event) {

    event.preventDefault();

    const email =
        document
            .getElementById('admin-email')
            .value
            .trim();

    const password =
        document
            .getElementById('admin-password')
            .value;

    const { error } =
        await sb.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        alert('Login gagal: ' + error.message);
    }
}

async function adminLogout() {

    await sb.auth.signOut();
}

async function uploadImage(file, folder) {

    if (!file) {
        throw new Error(
            'Pilih file foto terlebih dahulu.'
        );
    }

    if (file.size > 5 * 1024 * 1024) {
        throw new Error(
            'Ukuran foto maksimal 5 MB.'
        );
    }

    if (!file.type.startsWith('image/')) {
        throw new Error(
            'File harus berupa gambar.'
        );
    }

    const ext =
        (
            file.name
                .split('.')
                .pop() || 'jpg'
        ).toLowerCase();

    const path =
        `${folder}/${crypto.randomUUID()}.${ext}`;

    const {
        error
    } =
        await sb.storage
            .from(STORAGE_BUCKET)
            .upload(
                path,
                file,
                {
                    upsert:false,
                    contentType:file.type
                }
            );

    if (error) {
        throw error;
    }

    const {
        data
    } =
        sb.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(path);

    return data.publicUrl;
}

async function addNewProductFromAdmin() {

    try {

        const name =
            document
                .getElementById('new-p-name')
                .value
                .trim();

        const price =
            Number(
                document
                    .getElementById('new-p-price')
                    .value
            );

        const category =
            document
                .getElementById('new-p-cat')
                .value;

        const badge =
            document
                .getElementById('new-p-badge')
                .value
                .trim();

        const description =
            document
                .getElementById('new-p-desc')
                .value
                .trim();

        const file =
            document
                .getElementById('new-p-file')
                .files[0];

        const url =
            document
                .getElementById('new-p-img-url')
                .value
                .trim();

        if (!name || !price) {
            throw new Error(
                'Nama produk dan harga wajib diisi.'
            );
        }

        let image = url;

        if (file) {
            image =
                await uploadImage(
                    file,
                    'products'
                );
        }

        if (!image) {
            throw new Error(
                'Pilih foto produk atau masukkan URL foto.'
            );
        }

        const {
            error
        } =
            await sb
                .from('products')
                .insert({
                    name,
                    category,
                    price,
                    image,
                    description,
                    badge,
                    is_active:true
                });

        if (error) {
            throw error;
        }

        document.getElementById('new-p-name').value = '';

        document.getElementById('new-p-price').value = '';

        document.getElementById('new-p-badge').value = '';

        document.getElementById('new-p-desc').value = '';

        document.getElementById('new-p-file').value = '';

        document.getElementById('new-p-img-url').value = '';

        await loadPublicData();

        await renderAdminProducts();

        alert(
            'Produk berhasil ditambahkan. Sekarang semua pengunjung bisa melihatnya.'
        );

    } catch (e) {

        alert(
            'Gagal menambah produk: ' +
            e.message
        );
    }
}

async function renderAdminProducts() {

    const {
        data,
        error
    } =
        await sb
            .from('products')
            .select('*')
            .order(
                'created_at',
                {
                    ascending:false
                }
            );

    const body =
        document.getElementById(
            'admin-product-table-body'
        );

    if (error) {

        body.innerHTML = `
            <tr>
                <td colspan="5"
                    class="p-3 text-red-500">
                    ${escapeHtml(error.message)}
                </td>
            </tr>
        `;

        return;
    }

    body.innerHTML =
        (data || [])
            .map(p => `

                <tr class="border-b border-pink-50">

                    <td class="p-2">
                        <img
                            src="${escapeHtml(p.image)}"
                            class="w-10 h-10 object-cover rounded-lg"
                        >
                    </td>

                    <td class="p-2 font-medium">
                        ${escapeHtml(p.name)}
                    </td>

                    <td class="p-2">
                        ${escapeHtml(p.category)}
                    </td>

                    <td class="p-2">
                        Rp ${Number(p.price).toLocaleString('id-ID')}
                    </td>

                    <td class="p-2 text-right">

                        <button
                            onclick="deleteProduct('${p.id}')"
                            class="text-red-500 hover:underline"
                        >
                            Hapus
                        </button>

                    </td>

                </tr>

            `)
            .join('');
}

async function deleteProduct(id) {

    if (
        !confirm(
            'Hapus produk ini dari katalog?'
        )
    ) {
        return;
    }

    const {
        error
    } =
        await sb
            .from('products')
            .delete()
            .eq('id', id);

    if (error) {

        return alert(
            'Gagal menghapus: ' +
            error.message
        );
    }

    await loadPublicData();

    renderAdminProducts();
}

async function submitTestimonial(event) {

    event.preventDefault();

    try {

        const payload = {

            name:
                document
                    .getElementById('review-name')
                    .value
                    .trim(),

            item:
                document
                    .getElementById('review-item')
                    .value
                    .trim(),

            review:
                document
                    .getElementById('review-text')
                    .value
                    .trim(),

            rating:
                Number(
                    document
                        .getElementById('review-rating')
                        .value
                ),

            status:'pending'
        };

        const {
            error
        } =
            await sb
                .from('testimonials')
                .insert(payload);

        if (error) {
            throw error;
        }

        event.target.reset();

        alert(
            'Terima kasih! Testimonimu sudah dikirim dan akan ditinjau admin.'
        );

    } catch (e) {

        alert(
            'Testimoni belum terkirim: ' +
            e.message
        );
    }
}

async function renderAdminTestimonials() {

    const {
        data,
        error
    } =
        await sb
            .from('testimonials')
            .select('*')
            .order(
                'created_at',
                {
                    ascending:false
                }
            );

    const body =
        document.getElementById(
            'admin-testimonial-table-body'
        );

    if (error) {

        body.innerHTML = `
            <tr>
                <td colspan="6"
                    class="p-3 text-red-500">
                    ${escapeHtml(error.message)}
                </td>
            </tr>
        `;

        return;
    }

    body.innerHTML =
        (data || [])
            .map(t => `

                <tr class="border-b border-pink-50 align-top">

                    <td class="p-2 font-medium">
                        ${escapeHtml(t.name)}
                    </td>

                    <td class="p-2">
                        ${escapeHtml(t.item || '-')}
                    </td>

                    <td class="p-2">
                        ${'★'.repeat(t.rating)}
                    </td>

                    <td class="p-2 max-w-xs">
                        ${escapeHtml(t.review)}
                    </td>

                    <td class="p-2">
                        ${escapeHtml(t.status)}
                    </td>

                    <td class="p-2 text-right whitespace-nowrap">

                        ${
                            t.status !== 'approved'
                            ?
                            `
                                <button
                                    onclick="approveTestimonial('${t.id}')"
                                    class="text-green-600 mr-2"
                                >
                                    Setujui
                                </button>
                            `
                            :
                            ''
                        }

                        <button
                            onclick="deleteTestimonial('${t.id}')"
                            class="text-red-500"
                        >
                            Hapus
                        </button>

                    </td>

                </tr>

            `)
            .join('');
}

async function approveTestimonial(id) {

    const {
        error
    } =
        await sb
            .from('testimonials')
            .update({
                status:'approved'
            })
            .eq('id', id);

    if (error) {
        return alert(error.message);
    }

    await loadPublicData();

    renderAdminTestimonials();
}

async function deleteTestimonial(id) {

    if (
        !confirm(
            'Hapus testimoni ini?'
        )
    ) {
        return;
    }

    const {
        error
    } =
        await sb
            .from('testimonials')
            .delete()
            .eq('id', id);

    if (error) {
        return alert(error.message);
    }

    await loadPublicData();

    renderAdminTestimonials();
}

async function addGalleryItem() {

    try {

        const title =
            document
                .getElementById('gallery-title')
                .value
                .trim();

        const file =
            document
                .getElementById('gallery-file')
                .files[0];

        const url =
            document
                .getElementById('gallery-url')
                .value
                .trim();

        if (!title) {
            throw new Error(
                'Judul foto wajib diisi.'
            );
        }

        let image_url = url;

        if (file) {
            image_url =
                await uploadImage(
                    file,
                    'gallery'
                );
        }

        if (!image_url) {
            throw new Error(
                'Pilih foto atau masukkan URL.'
            );
        }

        const {
            error
        } =
            await sb
                .from('gallery')
                .insert({
                    title,
                    image_url,
                    is_active:true
                });

        if (error) {
            throw error;
        }

        document.getElementById(
            'gallery-title'
        ).value = '';

        document.getElementById(
            'gallery-file'
        ).value = '';

        document.getElementById(
            'gallery-url'
        ).value = '';

        await loadPublicData();

        await renderAdminGallery();

    } catch (e) {

        alert(
            'Gagal menambah foto: ' +
            e.message
        );
    }
}

async function renderAdminGallery() {

    const {
        data,
        error
    } =
        await sb
            .from('gallery')
            .select('*')
            .order(
                'created_at',
                {
                    ascending:false
                }
            );

    const box =
        document.getElementById(
            'admin-gallery-list'
        );

    if (error) {

        box.innerHTML = `
            <p class="text-red-500 text-xs">
                ${escapeHtml(error.message)}
            </p>
        `;

        return;
    }

    box.innerHTML =
        (data || [])
            .map(g => `

                <div class="paper-card p-2">

                    <img
                        src="${escapeHtml(g.image_url)}"
                        class="w-full aspect-square object-cover rounded-xl"
                    >

                    <p class="text-xs font-bold mt-2 line-clamp-1">
                        ${escapeHtml(g.title || '')}
                    </p>

                    <button
                        onclick="deleteGallery('${g.id}')"
                        class="text-xs text-red-500 mt-1"
                    >
                        Hapus
                    </button>

                </div>

            `)
            .join('');
}

async function deleteGallery(id) {

    if (
        !confirm(
            'Hapus foto gallery ini?'
        )
    ) {
        return;
    }

    const {
        error
    } =
        await sb
            .from('gallery')
            .delete()
            .eq('id', id);

    if (error) {
        return alert(error.message);
    }

    await loadPublicData();

    renderAdminGallery();
}

async function saveSiteImage(
    key,
    fileInputId
) {

    try {

        const file =
            document
                .getElementById(fileInputId)
                .files[0];

        if (!file) {
            throw new Error(
                'Pilih foto terlebih dahulu.'
            );
        }

        const image_url =
            await uploadImage(
                file,
                'site'
            );

        const {
            error
        } =
            await sb
                .from('site_media')
                .upsert(
                    {
                        key,
                        image_url
                    },
                    {
                        onConflict:'key'
                    }
                );

        if (error) {
            throw error;
        }

        await loadPublicData();

        loadSitePreviews();

        alert(
            'Foto website berhasil diganti.'
        );

    } catch (e) {

        alert(
            'Gagal mengganti foto: ' +
            e.message
        );
    }
}

async function loadSitePreviews() {

    const {
        data
    } =
        await sb
            .from('site_media')
            .select('*');

    applySiteMedia(
        data || []
    );
}

function escapeHtml(value) {

    return String(value ?? '')
        .replace(
            /[&<>"']/g,
            c => ({
                '&':'&amp;',
                '<':'&lt;',
                '>':'&gt;',
                '"':'&quot;',
                "'":'&#039;'
            }[c])
        );
}
