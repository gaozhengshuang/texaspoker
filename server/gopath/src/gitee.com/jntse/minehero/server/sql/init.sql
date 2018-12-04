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

DROP TABLE IF EXISTS `bidata_daily`;
CREATE TABLE `bidata_daily` (
	`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
	`date` datetime NOT NULL COMMENT '创建时间',
	`user_incr` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '日增用户数量',
	`user_pay` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '本日付费用户数量',
	`user_login` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '本日登录用户数量',
	`pay_amount` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '本日的充值总额',
	`pay_orders` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '充值单数',
	`timestamp` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新的时间戳',
	`online_max` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最高在线人数',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
