'use strict';

const request = require('supertest');
const server = require('../../../../src/app');
const chai = require('chai');
const expect = chai.expect;
const Workout = require('../../../../src/models/workouts');
const sinon = require('sinon');
const mongoose = require('mongoose');


// Canary test
it('responds to /', function(done) {
  request(server)
    .get('/')
    .expect(200, done);
});

describe('/workout', function() {

  before(() => {

   const testWorkout = new Workout(
      {
        author: 'Dan Vogel',
        body: 'a workout',
        date: 'monday',
        title: 'a title'
      }
    );
    testWorkout.save(function(err) {
      if (err) {
        console.log('err posting test workout');
      }
    });
  });

  after(() => {
    Workout.remove({}, err => {
      if (err) {
        console.log('error clearing test db');
      }
    });
  });

  describe('GET /workout', () => {

    it('responds with 200 status and "application/json; charset=utf-8" content type', function(done) {
      request(server)
      .get('/workout')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
         expect(res.body).to.be.an('array');
         expect(res.body.length).to.be.above(0);
         expect(res.body[0]).to.be.an('object');
         expect(res.body[0]).to.contain.all.keys(['author', 'date', 'title', 'body']);
         expect(res.body[0].body).to.equal('a workout');
         expect(res.body[0].author).to.equal('Dan Vogel');
         // I don't like this, need a better way to check date type
         expect(res.body[0].date).to.equal('monday');
         expect(res.body[0].title).to.equal('a title');
         expect(mongoose.model.find).to.be.calledOnce;
         done();
      });
    });

  });

  describe('POST /workout', () => {

    it('responds with 201 status and success message', done => {
      request(server)
      .post('/workout')
      .send({ author: 'Dan Vogel', body: 'a body', date: 'a date', title: 'a title'})
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.equal('Success! Data written.');
        done();
      });
    });

    it('responds with 500 status and error message when fields not in req', done => {
      request(server)
      .post('/workout')
      .expect(500)
      .end(function(err, res) {
        expect(res.body).to.equal('Error writing data.');
        done();
      });
    });

  });

  describe('DELETE /workout', () => {

    it('responds with 201 status and success message', done => {
      request(server)
      .delete('/workout')
      .send({ author: 'Dan Vogel', body: 'a workout', date: 'monday', title: 'a title'})
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.equal('Success! Data removed.');
        done();
      });
    });

    it('responds with 500 status and error message when fields not in req', done => {
      request(server)
      .delete('/workout')
      .expect(500)
      .end(function(err, res) {
        expect(res.body).to.equal('Error removing data.');
        done();
      });
    });
  });

});
