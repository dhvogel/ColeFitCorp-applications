'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/testimonials', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/testimonials.html'));
});

router.get('/pricing', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/pricing.html'));
});

router.get('/workouts', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/workouts.html'));
});

router.get('/how-this-site-is-built', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/how-this-site-is-built.html'));
});

module.exports = router;
