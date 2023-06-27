//const request = require('supertest');
const app = require('../server'); // Assurez-vous que le chemin vers votre fichier principal d'application est correct
import { request } from 'supertest';
describe('POST /signup', function () {
  it('responds with json', function (done) {
    request(app)
      .post('/signup')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        // Vous pouvez ajouter d'autres assertions ici pour vérifier la réponse JSON retournée
        done();
      });
  });
});
