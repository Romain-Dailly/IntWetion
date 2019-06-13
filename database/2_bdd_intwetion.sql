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
  `text_question` text,
  `image_question` varchar(255),
  `type_response` int,
  `type_response2` boolean,
  `id_resource` int
);

CREATE TABLE `resources`
(
  `id` int UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `url_resource` text,
  `type_resource` int
);

CREATE TABLE `quiz_ref`
(
  `id_card` int,
  `id_question` int
);

CREATE TABLE `videos`
(
  `id` int UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `url_video` varchar(255),
  `type_video` int,
  `id_card` int
);

ALTER TABLE `questions` ADD FOREIGN KEY (`id_resource`) REFERENCES `resources` (`id`);

ALTER TABLE `quiz_ref` ADD FOREIGN KEY (`id_card`) REFERENCES `card` (`id`);

ALTER TABLE `quiz_ref` ADD FOREIGN KEY (`id_question`) REFERENCES `questions` (`id`);

ALTER TABLE `videos` ADD FOREIGN KEY (`id_card`) REFERENCES `card` (`id`);
