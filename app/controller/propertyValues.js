'use strict';

const { Controller } = require('egg');

module.exports = class PropertyValuesController extends Controller {
  async index() {
    const { ctx, app } = this;
    try {
      const { query, helper } = ctx;
      const queryParam = app.validator.validate({
        page: {
          type: 'int',
          default: 1,
        },
        pageSize: {
          type: 'int',
        },
      }, query);
      const { page, pageSize } = query;
      // TODO: 通过社区中的框架来解决接口入参的校验
      // if (!(page && Number.isInteger(Number(page)))) {
      //   return helper.createFailJSONResponse(ctx, 400, 'page参数为空或者不合法');
      // }
      // if (!(pageSize && Number.isInteger(Number(pageSize)))) {
      //   return helper.createFailJSONResponse(ctx, 400, 'pageSize参数为空或者不合法');
      // }

      const fixedPage = Number(page);
      const fixedPageSize = Number(pageSize);
      const { total, list } = await ctx.service.propertyValue.select({
        ...query,
        page: fixedPage,
        pageSize: fixedPageSize,
      });
      ctx.helper.createSuccessJSONResponse(ctx, 200, {
        page: fixedPage,
        pageSize: fixedPageSize,
        list,
        total,
      });
    } catch (error) {
      console.error(error);
      ctx.helper.createFailJSONResponse(ctx, 500, '属性值列表查询错误');
    }
  }
  async allList() {
    const { ctx } = this;
    try {
      const list = await ctx.service.propertyValue.select();
      ctx.helper.createSuccessJSONResponse(ctx, 200, list);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, '属性值列表获取错误');
    }
  }
  async show() {
    const { ctx } = this;
    try {
      const { code } = ctx.params;
      const item = await ctx.service.propertyValue.get(code);
      ctx.helper.createSuccessJSONResponse(ctx, 200, item);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, '属性值获取错误');
    }
  }
  async create() {
    const { ctx } = this;
    try {
      const { name, remark } = ctx.request.body;
      const code = await ctx.service.propertyValue.insert({
        name,
        remark,
      });
      ctx.helper.createSuccessJSONResponse(ctx, 201, code);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, '属性值创建错误');
    }
  }
  async destroy() {
    const { ctx } = this;
    try {
      const { code } = ctx.params;
      await ctx.service.propertyValue.delete(code);
      ctx.helper.createSuccessJSONResponse(ctx, 200);
    } catch (error) {
      ctx.helper.createFailJSONResponse(ctx, 500, '属性值删除错误');
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
