const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'favorites.json');

const ensureStore = async () => {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, '[]', 'utf8');
  }
};

const readFavorites = async () => {
  await ensureStore();
  const raw = await fs.readFile(dataFile, 'utf8');

  try {
    const favorites = JSON.parse(raw);
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
};

const writeFavorites = async (favorites) => {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(favorites, null, 2), 'utf8');
};

const normalizeCity = (city) => city.trim().toLowerCase();

const getAllFavorites = async () => {
  const favorites = await readFavorites();

  return favorites.sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
};

const findFavoriteByCity = async (city) => {
  const favorites = await readFavorites();
  const normalizedCity = normalizeCity(city);

  return (
    favorites.find((favorite) => normalizeCity(favorite.city) === normalizedCity) || null
  );
};

const addFavorite = async ({ city, country, lat, lon }) => {
  const favorites = await readFavorites();
  const timestamp = new Date().toISOString();

  const newFavorite = {
    _id: randomUUID(),
    city: city.trim(),
    country: country || '',
    lat,
    lon,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  favorites.unshift(newFavorite);
  await writeFavorites(favorites);

  return newFavorite;
};

const deleteFavorite = async (id) => {
  const favorites = await readFavorites();
  const favorite = favorites.find((entry) => entry._id === id);

  if (!favorite) {
    return null;
  }

  const updatedFavorites = favorites.filter((entry) => entry._id !== id);
  await writeFavorites(updatedFavorites);

  return favorite;
};

module.exports = {
  addFavorite,
  deleteFavorite,
  findFavoriteByCity,
  getAllFavorites,
};
