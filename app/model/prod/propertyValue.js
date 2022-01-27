'use strict';

module.exports = (app, model) => {
  const { STRING } = app.Sequelize;

  const PropertyValue = model.define(
    'PropertyValue',
    {
      code: {
        type: STRING(40),
        field: 'para_value_code',
        primaryKey: true,
        notNull: true,
      },
      name: {
        type: STRING(512),
        field: 'para_value_name',
      },
      categoryCode: {
        type: STRING(20),
        field: 'category_code',
      },
      categoryName: {
        type: STRING(200),
        field: 'category_name',
      },
      propertyCode: {
        type: STRING(40),
        field: 'para_code',
      },
      provinceCode: {
        type: STRING(2),
        field: 'province_code',
      },
      areaCode: {
        type: STRING(6),
        field: 'area_code',
      },
      remark: {
        type: STRING(256),
      },
    },
    {
      tableName: 'td_b_base_item_value',
      timestamps: false,
    }
  );

  PropertyValue.associate = function() {
    // app.model.Post.belongsTo(app.model.User, { as: 'user' });
  };

  return PropertyValue;
};
