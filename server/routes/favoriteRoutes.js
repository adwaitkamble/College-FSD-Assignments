const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, deleteFavorite } = require('../controllers/favoriteController');

// GET /api/favorites
router.get('/', getFavorites);

// POST /api/favorites
router.post('/', addFavorite);

// DELETE /api/favorites/:id
router.delete('/:id', deleteFavorite);

module.exports = router;
