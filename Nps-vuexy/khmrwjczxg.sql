-- Adminer 4.7.8 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `comment_keywords`;
CREATE TABLE `comment_keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `word` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `comment_keywords` (`id`, `user_id`, `word`, `count`, `created_at`, `updated_at`) VALUES
(6,	2,	'blazing',	1,	'2022-06-15 07:46:37',	'2022-06-15 07:46:37'),
(7,	2,	'amazing',	2,	'2022-06-15 07:46:37',	'2022-06-15 08:29:17'),
(8,	2,	'fantastic',	2,	'2022-06-15 08:29:17',	'2022-06-17 17:39:49'),
(9,	2,	'superb',	1,	'2022-06-15 08:29:17',	'2022-06-15 08:29:17'),
(10,	2,	'test',	3,	'2022-06-15 09:44:20',	'2022-06-15 09:50:25'),
(11,	2,	'test',	1,	'2022-06-15 09:44:20',	'2022-06-15 09:44:20'),
(12,	2,	'tset',	2,	'2022-06-15 09:44:20',	'2022-06-15 09:48:47'),
(13,	2,	'stststssstsetestst',	1,	'2022-06-15 09:48:47',	'2022-06-15 09:48:47'),
(14,	2,	'tsetestsestset',	1,	'2022-06-15 09:50:25',	'2022-06-15 09:50:25'),
(15,	2,	'setests',	1,	'2022-06-15 09:50:25',	'2022-06-15 09:50:25'),
(16,	1,	'education',	3,	'2022-06-17 17:26:52',	'2022-06-17 19:30:05'),
(17,	1,	'awesome',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(18,	1,	'program',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(19,	1,	'plan',	3,	'2022-06-17 17:26:52',	'2022-06-17 19:30:05'),
(20,	1,	'ive',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(21,	1,	'plan',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(22,	1,	'website',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(23,	1,	'customer',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(24,	1,	'support',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(25,	1,	'helpful',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(26,	1,	'recommend',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(27,	1,	'plan',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(28,	1,	'hesitation',	1,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(29,	1,	'absolutely',	1,	'2022-06-17 17:39:49',	'2022-06-17 17:39:49'),
(30,	1,	'tools',	1,	'2022-06-17 17:39:49',	'2022-06-17 17:39:49'),
(31,	1,	'admin',	1,	'2022-06-17 17:39:49',	'2022-06-17 17:39:49'),
(32,	1,	'area',	1,	'2022-06-17 17:39:49',	'2022-06-17 17:39:49'),
(33,	1,	'promote',	1,	'2022-06-17 17:39:49',	'2022-06-17 17:39:49'),
(34,	1,	'daughters',	1,	'2022-06-17 19:30:05',	'2022-06-17 19:30:05'),
(35,	1,	'college',	1,	'2022-06-17 19:30:05',	'2022-06-17 19:30:05');

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` text NOT NULL,
  `exception` text NOT NULL,
  `failed_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE `oauth_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(191) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `password_resets_email_index` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `survey`;
CREATE TABLE `survey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_method` int(11) DEFAULT 0 COMMENT '0 = web, 1= email',
  `survey_type` varchar(50) NOT NULL COMMENT 'standard,simple,modern',
  `user_id` int(11) NOT NULL,
  `brand_title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `text_color` varchar(255) DEFAULT NULL,
  `icon_color` varchar(255) DEFAULT NULL,
  `brand_color` varchar(255) DEFAULT NULL,
  `button_style` varchar(255) DEFAULT NULL,
  `button_shape` varchar(255) DEFAULT NULL,
  `question` varchar(255) NOT NULL,
  `lang` varchar(255) DEFAULT NULL,
  `skip_comment` tinyint(4) DEFAULT NULL,
  `from_email` varchar(255) DEFAULT NULL,
  `reply_to` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `survey` (`id`, `survey_method`, `survey_type`, `user_id`, `brand_title`, `description`, `text_color`, `icon_color`, `brand_color`, `button_style`, `button_shape`, `question`, `lang`, `skip_comment`, `from_email`, `reply_to`, `subject`, `status`, `created_at`, `updated_at`) VALUES
(1,	0,	'standard',	1,	'On a scale between 1 and 10, would you recommend The Education Plan to a friend or family member?',	'Your feedback is important to us. This feedback can improve our service and provide a richer experience for our account holders.',	'#636363',	'#636363',	'#8742cd',	'fill',	'border-radius',	'Please share any additional feedback you feel helpful',	'en',	0,	'',	'',	'',	NULL,	'2022-06-06 12:29:58',	'2022-06-06 12:30:52'),
(2,	0,	'standard',	2,	'On a scale between 1-10, how likely are you to recommend The NPS to a friend or collegue?',	'Your feedback is important to us. The NPS user this feedback to improve our service and provide a richer experience for our account holders.',	'#636363',	'#636363',	'#4f7d36',	'fill',	'border-radius',	'What about The NPS do you like? please comment below\n',	'en',	0,	'',	'',	'',	NULL,	'2022-06-15 07:31:47',	'2022-06-15 07:32:11'),
(3,	0,	'simple',	2,	'On a scale between 1-10, how likely are you to recommend The NPS to a friend or collegue?',	'Your feedback is important to us. The NPS user this feedback to improve our service and provide a richer experience for our account holders.',	'#636363',	'#a3df34',	'#636363',	'fill',	'border-radius',	'What about The NPS do you like? please comment below\n',	'en',	0,	'',	'',	'',	NULL,	'2022-06-15 07:33:02',	'2022-06-15 07:33:02'),
(4,	0,	'modern',	2,	'On a scale between 1-10, how likely are you to recommend The NPS to a friend or collegue? \n',	'Your feedback is important to us. The NPS user this feedback to improve our service and provide a richer experience for our account holders.',	'#636363',	'#636363',	'#55a234',	'fill',	'border-radius',	'What about The NPS do you like? please comment below\n',	'en',	0,	'',	'',	'',	NULL,	'2022-06-15 07:33:46',	'2022-06-15 09:35:48'),
(5,	0,	'standard',	1,	'The Education Plan',	'Your feedback is important to us. We’ll use it to help improve The Education Plan for all account holders.',	'#636363',	'#636363',	'#1471d1',	'fill',	'border-radius',	'Please share any additional feedback you feel may be helpful.',	'en',	0,	'',	'',	'',	NULL,	'2022-06-16 17:00:54',	'2022-06-17 19:16:39');

DROP TABLE IF EXISTS `survey_response`;
CREATE TABLE `survey_response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `survey_id` int(11) DEFAULT NULL,
  `score_value` int(11) DEFAULT NULL,
  `review_message` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `survey_response_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `survey_response` (`id`, `user_id`, `name`, `survey_id`, `score_value`, `review_message`, `ip_address`, `website`, `url`, `token`, `created_at`, `updated_at`) VALUES
(3,	2,	'john deo',	4,	9,	'it is blazing amazing',	'::ffff:127.0.0.1',	'staging-stemcell.kinsta.cloud',	'https://staging-stemcell.kinsta.cloud/',	NULL,	'2022-06-15 07:46:37',	'2022-06-15 07:46:37'),
(4,	2,	'test',	4,	10,	'it is fantastic and superb and amazing',	'::ffff:127.0.0.1',	'staging-stemcell.kinsta.cloud',	'https://staging-stemcell.kinsta.cloud/',	NULL,	'2022-06-15 08:29:17',	'2022-06-15 08:29:17'),
(5,	2,	'PPPPPP',	3,	2,	'TEST TEST TSET',	'::ffff:127.0.0.1',	'staging-stemcell.kinsta.cloud',	'https://staging-stemcell.kinsta.cloud/',	NULL,	'2022-06-15 09:44:20',	'2022-06-15 09:44:20'),
(6,	2,	'testststst',	2,	10,	'test tset stststssstsetestst',	'::ffff:127.0.0.1',	'staging-stemcell.kinsta.cloud',	'https://staging-stemcell.kinsta.cloud/',	NULL,	'2022-06-15 09:48:47',	'2022-06-15 09:48:47'),
(7,	2,	'testtsss',	2,	1,	'Test tsetestsestset setests ',	'::ffff:127.0.0.1',	'staging-stemcell.kinsta.cloud',	'https://staging-stemcell.kinsta.cloud/',	NULL,	'2022-06-15 09:50:25',	'2022-06-15 09:50:25'),
(8,	2,	'd',	2,	4,	'',	'::ffff:127.0.0.1',	'staging-stemcell.kinsta.cloud',	'https://staging-stemcell.kinsta.cloud/',	NULL,	'2022-06-15 09:51:32',	'2022-06-15 09:51:32'),
(9,	1,	'Hasti',	1,	9,	'Thank you so much',	'::ffff:127.0.0.1',	'v2websolutions.com',	'https://v2websolutions.com/thank-you/',	NULL,	'2022-06-15 17:24:22',	'2022-06-15 17:24:22'),
(10,	1,	'Jamie Rushad Gros',	5,	10,	'The Education Plan is an awesome program. I\'ve now used the plan for all three of my children! The website is great and the customer support is always helpful. I would recommend the plan to my family without hesitation.',	'::ffff:127.0.0.1',	'nmetbstg.prod.acquia-sites.com',	'https://nmetbstg.prod.acquia-sites.com/thank-you',	NULL,	'2022-06-17 17:26:52',	'2022-06-17 17:26:52'),
(11,	1,	'Ronda',	5,	10,	'The Education Plan is absolutely fantastic. I would love if there were more tools in the admin area to share and promote to my friends and family.',	'::ffff:127.0.0.1',	'theeducationplan.com',	'https://theeducationplan.com/thank-you',	NULL,	'2022-06-17 17:39:49',	'2022-06-17 17:39:49'),
(12,	1,	'Heather Apodaca',	5,	9,	'The Education Plan has been a great way to save for our daughter\'s college education. ',	'::ffff:127.0.0.1',	'nmetbstg.prod.acquia-sites.com',	'https://nmetbstg.prod.acquia-sites.com/thank-you',	NULL,	'2022-06-17 19:30:05',	'2022-06-17 19:30:05');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `role` int(11) NOT NULL DEFAULT 1 COMMENT '1 = Super Admin, 2 = Subscriber',
  `name` varchar(191) NOT NULL,
  `first_name` varchar(250) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `username` varchar(250) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `mobile_no` bigint(20) DEFAULT NULL,
  `profile_pic` varchar(250) DEFAULT NULL,
  `brand_logo` varchar(250) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `password_resets_token` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `usersnew`;
CREATE TABLE `usersnew` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `role` int(11) NOT NULL DEFAULT 1 COMMENT '1 = Super Admin, 2 = Subscriber',
  `name` varchar(191) NOT NULL,
  `first_name` varchar(250) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `username` varchar(250) NOT NULL,
  `layoutDetail` longtext DEFAULT NULL,
  `sheetID` varchar(255) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `mobile_no` bigint(20) DEFAULT NULL,
  `profile_pic` varchar(250) DEFAULT NULL,
  `brand_logo` varchar(250) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `password_resets_token` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `usersnew` (`id`, `role`, `name`, `first_name`, `last_name`, `username`, `layoutDetail`, `sheetID`, `email`, `email_verified_at`, `mobile_no`, `profile_pic`, `brand_logo`, `password`, `remember_token`, `password_resets_token`, `createdAt`, `updatedAt`) VALUES
(1,	2,	'The_Education Plan',	'The_Education',	'Plan',	'Esparza1234',	'{\"lg\":[{\"w\":2,\"h\":1,\"x\":0,\"y\":1,\"i\":\"1\",\"minW\":2,\"moved\":false,\"static\":false},{\"w\":2,\"h\":1,\"x\":0,\"y\":0,\"i\":\"2\",\"minW\":2,\"moved\":false,\"static\":false},{\"w\":3,\"h\":2,\"x\":5,\"y\":0,\"i\":\"3\",\"minW\":2,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":3,\"h\":2,\"x\":2,\"y\":0,\"i\":\"4\",\"minW\":2,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":7,\"h\":3,\"x\":0,\"y\":2,\"i\":\"5\",\"minW\":4,\"minH\":2.4,\"moved\":false,\"static\":false},{\"w\":4,\"h\":2,\"x\":8,\"y\":0,\"i\":\"6\",\"minW\":4,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":5,\"h\":3,\"x\":7,\"y\":2,\"i\":\"7\",\"minW\":2,\"minH\":2.5,\"moved\":false,\"static\":false}]}',	'1N9DzSBVMyvrS66XA9TAx8J8PFIMRTIruB-gCou88NjM',	'digital@esparza.com',	NULL,	5555555555,	'1655488120144Icon.jpg',	'1655488013176TEPLogo.jpg',	'$2a$10$UCFsWawkaGXiwPH..YYILeYw7vPkCDTtTDDThbOoNaiub1Gs6UorO',	NULL,	NULL,	'2022-06-06 07:37:09',	'2022-06-17 17:54:31'),
(2,	2,	'test user',	'test',	'user',	'test123',	'{\"lg\":[{\"w\":3,\"h\":1,\"x\":0,\"y\":0,\"i\":\"1\",\"minW\":2,\"moved\":false,\"static\":false},{\"w\":3,\"h\":1,\"x\":3,\"y\":0,\"i\":\"2\",\"minW\":2,\"moved\":false,\"static\":false},{\"w\":3,\"h\":2,\"x\":0,\"y\":1,\"i\":\"3\",\"minW\":2,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":3,\"h\":2,\"x\":3,\"y\":1,\"i\":\"4\",\"minW\":2,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":6,\"h\":2.4,\"x\":6,\"y\":0,\"i\":\"5\",\"minW\":4,\"minH\":2.4,\"moved\":false,\"static\":false},{\"w\":6,\"h\":2,\"x\":0,\"y\":3,\"i\":\"6\",\"minW\":4,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":6,\"h\":2.5,\"x\":6,\"y\":2.4,\"i\":\"7\",\"minW\":2,\"minH\":2.5,\"moved\":false,\"static\":false}]}',	NULL,	'bhavik@hastishah.com',	NULL,	9696858859,	'1655278258714Capture.PNG',	'1655278258717esparza_logo.png',	'$2a$10$c6sA2xaA5dpqca1Egj9IV.02OYpP//ucAZy3UjXXBlFqqav9.s2ni',	NULL,	NULL,	'2022-06-15 07:30:10',	'2022-06-17 12:21:52');

-- 2022-06-20 11:14:42
