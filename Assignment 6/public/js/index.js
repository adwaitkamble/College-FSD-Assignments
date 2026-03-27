// ============================================================
// index.js – Home page logic: listings, search, filters, auth
// ============================================================

let currentPage = 1;
let currentFilters = {};

// ── Auth Nav Bar Setup ──────────────────────────────────────
function setupNav() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');
  const navAuth = document.getElementById('navAuth');
  const navUser = document.getElementById('navUser');
  const dashLink = document.getElementById('dashLink');

  if (user && token) {
    navAuth && (navAuth.style.display = 'none');
    navUser && (navUser.style.display = 'flex');
    document.getElementById('userGreeting') && (document.getElementById('userGreeting').textContent = `Hi, ${user.name}`);
    dashLink && (dashLink.style.display = 'inline-flex');
  }

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });
}

// ── Render Listing Cards ────────────────────────────────────
function renderListings(listings) {
  const grid = document.getElementById('listingsGrid');
  if (!listings || listings.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🚗</div>
        <h3>No listings found</h3>
        <p>Try changing the filters or search terms.</p>
      </div>`;
    return;
  }

  grid.innerHTML = listings.map(l => `
    <div class="listing-card" onclick="window.location.href='/listing.html?id=${l._id}'">
      <div class="listing-img-wrap">
        ${l.images?.length
          ? `<img src="${l.images[0]}" alt="${l.title}" class="listing-img" loading="lazy" />`
          : `<div class="listing-img-placeholder">📷</div>`}
        <span class="listing-badge badge-available">${l.category}</span>
      </div>
      <div class="listing-body">
        <div class="listing-category">${l.fuel_type} • ${l.transmission}</div>
        <h3 class="listing-title">${l.title}</h3>
        <div class="listing-meta">
          <span>📅 ${l.year}</span>
          <span>🛣️ ${formatKm(l.km_driven)}</span>
          <span>📍 ${l.location}</span>
        </div>
        <div class="listing-footer">
          <span class="listing-price">${formatPrice(l.price)}</span>
          <span class="listing-badge badge-category">${l.condition}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Render Pagination ───────────────────────────────────────
function renderPagination(totalPages, current) {
  const container = document.getElementById('pagination');
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="${i === current ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }
  container.innerHTML = html;
}

// ── Fetch Listings ──────────────────────────────────────────
async function fetchListings(page = 1, filters = {}) {
  const grid = document.getElementById('listingsGrid');
  const countEl = document.getElementById('listingCount');
  grid.innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>Loading listings...</p></div>`;

  const params = new URLSearchParams({ page, limit: 12, ...filters });
  // Remove empty params
  for (const [key, val] of [...params]) { if (!val) params.delete(key); }

  try {
    const data = await apiGet(`/api/listings?${params.toString()}`);
    renderListings(data.listings);
    renderPagination(data.totalPages, data.page);
    countEl.textContent = `${data.total} vehicle${data.total !== 1 ? 's' : ''}`;

    // Update hero stat
    const statEl = document.getElementById('statTotal');
    if (statEl) statEl.textContent = data.total;
  } catch (err) {
    grid.innerHTML = `<p class="error-text">Failed to load listings. Make sure the server is running.</p>`;
  }
}

// ── Pagination ──────────────────────────────────────────────
function goToPage(page) {
  currentPage = page;
  fetchListings(page, currentFilters);
  window.scrollTo({ top: 400, behavior: 'smooth' });
}

// ── Search & Filter Events ──────────────────────────────────
document.getElementById('searchBtn')?.addEventListener('click', () => {
  const search = document.getElementById('searchInput').value.trim();
  currentFilters = { ...currentFilters, search };
  currentPage = 1;
  fetchListings(1, currentFilters);
});

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('searchBtn').click();
});

document.getElementById('applyFilters')?.addEventListener('click', () => {
  currentFilters = {
    search: document.getElementById('searchInput').value.trim(),
    category: document.getElementById('filterCategory').value,
    fuel_type: document.getElementById('filterFuel').value,
    transmission: document.getElementById('filterTransmission').value,
    minPrice: document.getElementById('filterMinPrice').value,
    maxPrice: document.getElementById('filterMaxPrice').value,
  };
  currentPage = 1;
  fetchListings(1, currentFilters);
});

document.getElementById('clearFilters')?.addEventListener('click', () => {
  document.getElementById('filterCategory').value = '';
  document.getElementById('filterFuel').value = '';
  document.getElementById('filterTransmission').value = '';
  document.getElementById('filterMinPrice').value = '';
  document.getElementById('filterMaxPrice').value = '';
  document.getElementById('searchInput').value = '';
  currentFilters = {};
  currentPage = 1;
  fetchListings(1, {});
});

// ── Init ────────────────────────────────────────────────────
setupNav();
fetchListings(1, {});
