import 'mocha'
import express from 'express'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it } from 'node:test'
import * as app from '../../src/app'
chai.use(chaiHttp)

let server: express.Application
const expect = chai.expect

const USER = {
    _id: '5a4e0bc20de70d51abff9cc6',
    email: 'user@example.xyz',
    roles: ['user']
}

const ADMIN = {
    _id: '5a4e0bc20de70d51abff9cc7',
    email: 'admin@example.xyz',
    roles: ['user', 'admin']
}

describe('e2e测试初始化', function() {
  this.timeout(240000)  
  this.beforeAll(function(done) {
    app.launchApp({ testing: true }, (_server: express.Application) => {
        server = _server
        done()
    })
  }),
  this.afterAll(function(done) {
    setTimeout(() => {
        app.endApp(done)
    }, 3000)
  })
})

describe('测试示例', function() {
    it('【测试】获取版本号', function(done) {
        chai.request(server)
            .get('/VERSION')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
    })
})