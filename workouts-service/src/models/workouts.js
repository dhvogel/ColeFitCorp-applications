'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: String,
  body: String,
  date: String
}, { collection: 'workouts' });

module.exports = mongoose.model('workout', workoutSchema);
