// ============================================================
// app.js – Shared utility functions for all pages
// ============================================================

const API_BASE = '';

/**
 * Generic API GET request
 */
async function apiGet(endpoint) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + endpoint, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

/**
 * Generic API POST request
 */
async function apiPost(endpoint, body) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

/**
 * Format a number as Indian Rupees
 */
function formatPrice(price) {
  return '₹' + Number(price).toLocaleString('en-IN');
}

/**
 * Format a number with commas
 */
function formatKm(km) {
  return Number(km).toLocaleString('en-IN') + ' km';
}
