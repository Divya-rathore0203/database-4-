const request = require('supertest');
const express = require('express');
const app = require('C:/Users/dvedr/OneDrive/Desktop/Assignments/SIT725/newprac6.2-725/server/app.js'); 
const chai = require('chai');
const expect = chai.expect;

describe('POST /generate-caption', () => {
    it('should return a caption', (done) => {
        request(app)
            .post('/generate-caption')
            .attach('image', 'C:/Users/dvedr/OneDrive/Desktop/Assignments/SIT725/newprac6.2-725/server/test/download.jpg')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('caption');
                done();
            });
    });
});
