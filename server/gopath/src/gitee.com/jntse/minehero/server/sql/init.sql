DROP DATABASE IF EXISTS texaspoker;
CREATE DATABASE texaspoker;

use texaspoker;

DROP TABLE IF EXISTS `charbase`;
CREATE TABLE `charbase` (
    `id` bigint(20) NOT NULL,
    `name` varchar(32) NOT NULL DEFAULT "",
    `face` int(10) NOT NULL DEFAULT '0',
    `sex` int(10) NOT NULL DEFAULT '0',
    `account` varchar(32) NOT NULL DEFAULT '0',
    `level` int(10) NOT NULL DEFAULT '0',
    `exp` int(10) NOT NULL DEFAULT '0',
    `gold` bigint(20) NOT NULL DEFAULT '0',
    `yuanbao` bigint(20) NOT NULL DEFAULT '0',
    `diamond` bigint(20) NOT NULL DEFAULT '0',
    `age` int(10) NOT NULL DEFAULT '0',
    `vipexp` int(10) NOT NULL DEFAULT '0',
    `viplevel` int(10) NOT NULL DEFAULT '0',
    `viptime1` bigint(20) NOT NULL DEFAULT '0',
    `viptime2` bigint(20) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


