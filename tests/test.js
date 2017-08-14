const supertest = require('supertest');
const tape = require('tape');
const app = require('../src/app.js');

tape('GET /', (t) => {
  supertest(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});
