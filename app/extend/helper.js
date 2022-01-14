'use strict';

exports.createSuccessJSONResponse = (ctx, status, data) => {
  ctx.status = status;
  ctx.response.type = 'application/json; charset=utf-8';
  ctx.body = JSON.stringify({
    success: true,
    data,
  });
};

exports.createFailJSONResponse = (ctx, status, message) => {
  ctx.status = status;
  ctx.response.type = 'application/json; charset=utf-8';
  ctx.body = JSON.stringify({
    success: false,
    message,
  });
};
