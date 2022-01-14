'use strict';

const Controller = require('egg').Controller;

module.exports = class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
};
