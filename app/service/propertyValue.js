'use strict';

const { Service } = require('egg');

module.exports = class PropertyValueService extends Service {
  async select({
    codeOrCodeList,
    name,
    current = 1,
    pageSize = 10,
  }) {
    const offset = (current - 1) * pageSize;
    const options = {
      offset,
      limit: pageSize,
      attributes: [ 'code', 'name' ],
      where: {},
    };
    const { Op } = this.app.Sequelize;
    if (codeOrCodeList) { options.where.code = codeOrCodeList; }
    if (!codeOrCodeList && name) {
      options.where.name = {
        [Op.substring]: name,
      };
    }
    return await this.ctx.prodModel.PropertyValue.findAndCountAll(options);
  }
  async get(code) {
    const result = await this.app.prodModel.PropertyValue.findByPk(code);
    if (!result) { throw new Error(`code为${code}的属性值不存在！`); }
    return result;
  }
  async insert(inserttedItem) {
    // TODO:: 动态生成规则
    // const beginningCode = '500000000';
    // const options = {
    //   where: {
    //     code
    //   }
    // };
    // const lastestItem = await this.ctx.prodModel.PropertyValue.findOne(options);
    // const newPropertyValueItem = {
    //   ...inserttedItem,
    //   code: '210000178',
    // };
    // const { affectedRows, message } = await this.app.mysql.insert('property_value', newItem);
    // if (!Object.is(affectedRows, 1)) { return new Error(message); }
    return;
  }
  async update(code, item) {
    // const newItem = {
    //   ...item,
    //   update_time: this.app.mysql.literals.now,
    // };
    // const { affectedRows, message } = await this.app.mysql.update('property_vaue', newItem, { where: { code } });
    // if (!Object.is(affectedRows, 1)) { return new Error(message); }
    return code;
  }
  async delete(code) {
    const result = await this.app.prodModel.PropertyValue.findByPk(code);
    if (!result) { throw new Error(`code为${code}的属性值不存在！`); }
    const destoriedResult = await result.destory;
    console.log(destoriedResult);
    // return result.destory;
  }
};
