-- danger zone -> DROP DATABASE IF EXISTS `intwetion`;

CREATE DATABASE `intwetion`;

USE `intwetion`;

CREATE TABLE `card`
(
  `id` int UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `image` varchar(255),
  `description` text,
  `online` boolean,
  `payment` boolean,
  `date` bigint
);

CREATE TABLE `questions`
(
  `id` int UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `id_card` int,
  `number_question` float,
  `text_question` text,
  `image_question` varchar(255),
  `type_response` int,
  `has_comment` boolean
);

CREATE TABLE `resources`
(
  `id` int UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `id_question` int,
  `url_resource` text,
  `type_resource` int
);

CREATE TABLE `videos`
(
  `id` int UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `id_card` int,
  `url_video` varchar(255),
  `type_video` int
);

ALTER TABLE `questions` ADD FOREIGN KEY (`id_card`) REFERENCES `card` (`id`);

ALTER TABLE `videos` ADD FOREIGN KEY (`id_card`) REFERENCES `card` (`id`);

ALTER TABLE `resources` ADD FOREIGN KEY (`id_question`) REFERENCES `questions` (`id`);

