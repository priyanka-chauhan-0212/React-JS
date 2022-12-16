const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_clients', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    secret: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    redirect: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    personal_access_client: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    password_client: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'oauth_clients',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "oauth_clients_user_id_index",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
