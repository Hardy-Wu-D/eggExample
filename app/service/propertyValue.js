'use strict';

const { Service } = require('egg');

module.exports = class PropertyValueService extends Service {
  async select(option) {
    const { escape } = this.app.mysql;
    const { code, name, page, pageSize } = option;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    let where = '';
    let orderBy = '';
    if (code) {
      where += `para_value_code = ${escape(code)}`;
    } else {
      where += (name ? `INSTR(para_value_name,${escape(name)})>0` : '');
      orderBy += (name ? 'LENGTH(para_value_name)' : '');
    }
    const list = await this.app.mysql.query('SELECT * FROM td_b_base_item_value'
      + (where ? ` WHERE ${where}` : '')
      + (orderBy ? ` ORDER BY ${orderBy}` : '')
      + ` LIMIT ${offset}, ${limit}`
    );
    const [{ count: total }] = await this.app.mysql.query('SELECT COUNT(*) AS count FROM td_b_base_item_value' + (where ? ` WHERE ${where}` : ''));
    return { list, total };
  }
  async get(code) {
    const result = await this.app.mysql.get('td_b_base_item_value', { para_value_code: code });
    return result;
  }
  async insert(item) {
    const code = '210000178';
    const newItem = {
      ...item,
      code,
      create_time: this.app.mysql.literals.now,
      update_time: this.app.mysql.literals.now,
    };
    const { affectedRows, message } = await this.app.mysql.insert('property_value', newItem);
    if (!Object.is(affectedRows, 1)) { return new Error(message); }
    return;
  }
  async update(code, item) {
    const newItem = {
      ...item,
      update_time: this.app.mysql.literals.now,
    };
    const { affectedRows, message } = await this.app.mysql.update('property_vaue', newItem, { where: { code } });
    if (!Object.is(affectedRows, 1)) { return new Error(message); }
    return code;
  }
  async delete(code) {
    const { affectedRows, message } = await this.app.mysql.delete('property_value', { code });
    if (!Object.is(affectedRows, 1)) { return new Error(message); }
  }
};
