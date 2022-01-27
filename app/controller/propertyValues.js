'use strict';

const { Controller } = require('egg');

module.exports = class PropertyValuesController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { query, helper } = ctx;
    const errors = app.validator.validate({
      current: {
        type: 'int',
        convertType: 'int',
        default: 1,
      },
      pageSize: {
        type: 'int',
        convertType: 'int',
        default: 10,
      },
      code: {
        type: 'string',
        trim: true,
      },
      name: {
        type: 'string',
        trim: true,
      },
    }, query);
    const hasValidationError = !!errors;
    if (hasValidationError) {
      helper.createFailJSONResponse(ctx, 400, `请求参数不匹配！错误原因:${JSON.stringify(errors)}`);
      return;
    }
    const { current, pageSize } = query;
    try {
      const { count, rows } = await ctx.service.propertyValue.select({
        ...query,
        current,
        pageSize,
      });
      helper.createSuccessJSONResponse(ctx, 200, {
        current,
        pageSize,
        list: rows,
        total: count,
      });
    } catch (error) {
      console.error(error);
      helper.createFailJSONResponse(ctx, 500, `属性值列表查询错误！错误原因：${error.toString()}`);
    }
  }
  async show() {
    const { ctx, app } = this;
    const { params, helper } = ctx;
    const errors = app.validator.validate({
      code: { type: 'string' },
    }, params);
    const hasValidationError = !!errors;
    if (hasValidationError) {
      helper.createFailJSONResponse(ctx, 400, `请求参数不匹配！错误原因:${JSON.stringify(errors)}`);
      return;
    }
    const { code } = ctx.params;
    try {
      const item = await ctx.service.propertyValue.get(code);
      ctx.helper.createSuccessJSONResponse(ctx, 200, item);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, `属性值获取错误！错误原因：${error.toString()}`);
    }
  }
  async create() {
    const { ctx, app } = this;
    const { request: { body }, helper } = ctx;
    const errors = app.validator.validate({
      name: {
        type: 'string',
        trim: true,
      },
      remark: {
        type: 'string',
        trim: true,
      },
    }, body);
    const hasValidationError = !!errors;
    if (hasValidationError) {
      helper.createFailJSONResponse(ctx, 400, '请求参数不匹配！错误原因:' + JSON.stringify(errors));
      return;
    }
    const { name, remark } = ctx.request.body;
    try {
      const code = await ctx.service.propertyValue.insert({
        name,
        remark,
      });
      ctx.helper.createSuccessJSONResponse(ctx, 201, code);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, `属性值创建错误！错误原因：${error.toString()}`);
    }
  }
  async destroy() {
    const { ctx, app } = this;
    const { params, helper } = ctx;
    const errors = app.validator.validate({
      code: { type: 'string' },
    }, params);
    const hasValidationError = !!errors;
    if (hasValidationError) {
      helper.createFailJSONResponse(ctx, 400, '请求参数不匹配！错误原因:' + JSON.stringify(errors));
      return;
    }
    const { code } = ctx.params;
    try {
      await ctx.service.propertyValue.delete(code);
      ctx.helper.createSuccessJSONResponse(ctx, 200);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, `属性值删除错误！错误原因：${error.toString()}`);
    }
  }
  async update() {
    const { ctx } = this;
    try {
      const { code } = ctx.params;
      const { name, remark } = ctx.request.body;
      await ctx.service.propertyValue.update(code, { name, remark });
      ctx.helper.createSuccessJSONResponse(ctx, 200);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, '属性值更新错误');
    }
  }
};
