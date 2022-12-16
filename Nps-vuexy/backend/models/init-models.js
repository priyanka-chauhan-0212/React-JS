var DataTypes = require("sequelize").DataTypes;
var _comment_keywords = require("./comment_keywords");
var _failed_jobs = require("./failed_jobs");
var _migrations = require("./migrations");
var _oauth_access_tokens = require("./oauth_access_tokens");
var _oauth_auth_codes = require("./oauth_auth_codes");
var _oauth_clients = require("./oauth_clients");
var _oauth_personal_access_clients = require("./oauth_personal_access_clients");
var _oauth_refresh_tokens = require("./oauth_refresh_tokens");
var _password_resets = require("./password_resets");
var _survey = require("./survey");
var _survey_response = require("./survey_response");
var _users = require("./users");

function initModels(sequelize) {
  var comment_keywords = _comment_keywords(sequelize, DataTypes);
  var failed_jobs = _failed_jobs(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var oauth_access_tokens = _oauth_access_tokens(sequelize, DataTypes);
  var oauth_auth_codes = _oauth_auth_codes(sequelize, DataTypes);
  var oauth_clients = _oauth_clients(sequelize, DataTypes);
  var oauth_personal_access_clients = _oauth_personal_access_clients(sequelize, DataTypes);
  var oauth_refresh_tokens = _oauth_refresh_tokens(sequelize, DataTypes);
  var password_resets = _password_resets(sequelize, DataTypes);
  var survey = _survey(sequelize, DataTypes);
  var survey_response = _survey_response(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    comment_keywords,
    failed_jobs,
    migrations,
    oauth_access_tokens,
    oauth_auth_codes,
    oauth_clients,
    oauth_personal_access_clients,
    oauth_refresh_tokens,
    password_resets,
    survey,
    survey_response,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
