process.env.NODE_ENV = 'development';

// import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import User from '../api/resources/user/user.model';
import app from '../app';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let token;
let songId;

// Reset user model before each test
describe('Create Account, Login and Get Token', ()=> {
   beforeEach((done) => {
      User.deleteMany({}, (err) => {
         console.log(err);
         done();
      });
   }); 

  // POST create a new user test
  describe('POST register a new user test', () => {
     it('It should allow new users sign up', (done) => {
        // using chai-http plugin
        chai.request(app)
        .post('/api/users/signup/')
        .send({
            firstName: "tester",
            lastName: "tester",
            email: "tester@test.com",
            password: "tester",
            role: 2
        })
        .end((err, res) => {      
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.have.property('success');

          //attempt login with user credentials
          chai.request(app)
          .post('/api/users/login')
          .send({
              email: "tester@test.com",
              password: "tester"
           })
           .end((err, res) => {  
               res.should.have.status(200);
               res.body.should.have.property('token');
               res.body.should.be.a('Object');
               token = `Bearer ${res.body.token}`;
                    
                  // attempt to login using an incorrect endpoint
                  chai.request(app)
                      .post('/api/users/l')
                      .send({
                          email: "tester@test.com",
                          password: "tester"
                      })
                      .end((err, res) => {
                          res.should.have.status(404);
                          res.body.should.be.a('Object');                        
                         
                      })

                    // attempt to login using an incorrect credential
                    chai.request(app)
                        .post('/api/users/login')
                        .send({
                            email: "tester@testerer.com",
                            password: "tester"
                        })
                        .end((err, res) => {
                            res.should.have.status(404);
                            res.body.should.be.a('Object');
                            res.body.should.have.property('err');
                            done();
                        })
                   })
                })
            })         
        });        
     });



describe('GET', () => {
    it('All songs in the DB collection', (done)=> {
        chai.request(app)
        .get('/api/songs')
        .set('Authorization', token)
        .end((err, res) => {
          expect(err).to.be.null;
          res.body.should.be.a('object');
          res.body.should.have.property('docs');
          done();
        });
    });
});

describe('POST', () => {
    it('Create a new song', (done) => {
        chai.request(app)
            .post('/api/songs')
            .set('Authorization', token)
            .send({
                "title": "Love on the line",
                "url": "https://www.youtube.com/watch?v=9QvkPVNJtwg",
                "album": "Touch of Heaven",
                "rating": 5,
                "genre": "Gospel"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                 songId = res.body._id;
                
                done();
            });
    });
});




describe('GET', () => {
    it('It show get a song given an ID', (done) => {
        chai.request(app)
            .get(`/api/songs/${songId}`)
            .set('Authorization', token)           
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    });
});


describe('PUT', () => {
    it('It should be able to update a song', (done) => {
        chai.request(app)
            .put(`/api/songs/${songId}`)
            .set('Authorization', token)
            .send({
                "title": "So Will I",
                "url": "https://www.youtube.com/watch?v=9QvkPVNJtwg",
                "album": "Touch of Heaven",
                "rating": 2,
                "genre": "Gospel"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    });
});


describe('PUT', () => {
    it('It should throw 400 error', (done) => {
        chai.request(app)
            .put(`/api/songs/${songId}`)
            .set('Authorization', token)
            .send({
                "title": "",
                "url": "https://www.youtube.com/watch?v=9QvkPVNJtwg",
                "album": "Touch of Heaven",
                "rating": 2,
                "genre": "Gospel"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                done();
            });
    });
});

describe('PUT', () => {
    it('It should throw a 500 error', (done) => {
        chai.request(app)
            .put(`/api/songs/${songId}89834`)
            .set('Authorization', token)
            .send({
                "title": "So Will I",
                "url": "https://www.youtube.com/watch?v=9QvkPVNJtwg",
                "album": "Touch of Heaven",
                "rating": 2,
                "genre": "Gospel"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(500);
                done();
            });
    });
});

describe('PUT', () => {
    it('It should throw a 404 error', (done) => {
        chai.request(app)
            .put(`/api/songs/`)
            .set('Authorization', token)
            .send({
                "title": "So Will I",
                "url": "https://www.youtube.com/watch?v=9QvkPVNJtwg",
                "album": "Touch of Heaven",
                "rating": 2,
                "genre": "Gospel"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                done();
            });
    });
});

describe('PUT', () => {
    it('It should throw a 404 error', (done) => {
        chai.request(app)
            .put(`/api/songs/5be45392a3914b6ea4faccf6`)
            .set('Authorization', token)
            .send({
                "title": "So Will I",
                "url": "https://www.youtube.com/watch?v=9QvkPVNJtwg",
                "album": "Touch of Heaven",
                "rating": 2,
                "genre": "Gospel"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                done();
            });
    });
});



describe('DELETE', () => {
    it('It should be able to delete a song', (done) => {
        chai.request(app)
            .delete(`/api/songs/${songId}`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    });
});


describe('POST', () => {
    it('Create a new playlist', (done) => {
        chai.request(app)
            .post('/api/playlist')
            .set('Authorization', token)
            .send({
                "name": "Love on the line",
                "songs": ["5bd30a2adf3bb4160466fa13"]
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    });
});


describe('GET', () => {
    it('It should get All Playlist', (done) => {
        chai.request(app)
            .get('/api/playlist')
            .set('Authorization', token)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    });
});


let adminToken;

// Reset user model before each test
describe('Reset user Model', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            console.log(err);
            done();
        });
    });


    // POST register Admin test
    describe('POST register Admin test', () => {
        it('It should Admin sign up', (done) => {
            // using chai-http plugin
            chai.request(app)
                .post('/api/users/signup/')
                .send({
                    firstName: "Admin",
                    lastName: "Adminal",
                    email: "admin@test.com",
                    password: "admin",
                    role: 3
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    res.body.should.have.property('success');

                    //attempt login with user credentials
                    chai.request(app)
                        .post('/api/users/login')
                        .send({
                            email: "admin@test.com",
                            password: "admin"
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('token');
                            res.body.should.be.a('Object');
                            adminToken = `Bearer ${res.body.token}`;

                            // attempt to login using an incorrect endpoint
                            chai.request(app)
                                .post('/api/users/l')
                                .send({
                                    email: "tester@test.com",
                                    password: "tester"
                                })
                                .end((err, res) => {
                                    res.should.have.status(404);
                                    res.body.should.be.a('Object');

                                })

                            // attempt to login using an incorrect credential
                            chai.request(app)
                                .post('/api/users/login')
                                .send({
                                    email: "tester@testerer.com",
                                    password: "tester"
                                })
                                .end((err, res) => {
                                    res.should.have.status(404);
                                    res.body.should.be.a('Object');
                                    res.body.should.have.property('err');
                                    done();
                                })
                        })
                })
        });

    });
});


describe('GET all users',()=>{
    it('It should allow Admin see all users', (done) => {
        chai.request(app)
            .get('/api/users/all')
            .set('Authorization', adminToken)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    });
});
