'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.resources('propertyValues', '/api/propertyValues', controller.propertyValues);

  // router.get('/api/propertyValues', controller.propertyValue.index);
  // router.get('/api/propertyValues/all', controller.propertyValue.allList);
  // router.get('/api/propertyValues/:code', controller.propertyValue.show);
  // router.post('/api/propertyValues', controller.propertyValue.create);
  // router.put('/api/propertyValues/:code', controller.propertyValue.update);
  // router.delete('/api/propertyValues/:code', controller.propertyValue.destory);
};
