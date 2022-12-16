const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'survey',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			survey_method: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
				comment: '0 = web, 1= email',
			},
			survey_type: {
				type: DataTypes.STRING(50),
				allowNull: false,
				comment: 'standard,simple,modern',
				validate: {
					notNull: { msg: 'survey type is required' },
				},
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: { msg: 'userId is required' },
				},
			},
			brand_title: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					notNull: { msg: 'brandtitle is required' },
				},
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			text_color: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			icon_color: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			brand_color: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			button_style: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			button_shape: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			question: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					notNull: { msg: 'question is required' },
				},
			},
			lang: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			skip_comment: {
				type: DataTypes.TINYINT,
				allowNull: true,
			},
			from_email: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			reply_to: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			subject: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'survey',
			timestamps: true,
			underscored: true,

			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
			],
		}
	);
};
