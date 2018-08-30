DROP TABLE IF EXISTS `housetrade`;
CREATE TABLE `housetrade` (
    `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `Name` varchar(32) NOT NULL DEFAULT "",
    `houselevel` int(10) unsigned NOT NULL DEFAULT '0',
    `price` int(10) unsigned NOT NULL DEFAULT '0',
    `area` int(10) unsigned NOT NULL DEFAULT '0',
    `income` int(10) unsigned NOT NULL DEFAULT '0',
    `houseuid` int(10) unsigned NOT NULL DEFAULT '0',
    `housebaseid` int(10) unsigned NOT NULL DEFAULT '0',
    `endtime` int(10) unsigned NOT NULL DEFAULT '0',
    `location` int(10) unsigned NOT NULL DEFAULT '0',
    `sublocation` int(10) unsigned NOT NULL DEFAULT '0',
    `posx` int(10) unsigned NOT NULL DEFAULT '0',
    `posy` int(10) unsigned NOT NULL DEFAULT '0',
    `state` int(10) unsigned NOT NULL DEFAULT '0',
    `housetype` int(10) unsigned NOT NULL DEFAULT '0',
    PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cartrade`;
CREATE TABLE `cartrade` (
    `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `caruid` int(10) unsigned NOT NULL DEFAULT '0',
    `price` int(10) unsigned NOT NULL DEFAULT '0',
    `income` int(10) unsigned NOT NULL DEFAULT '0',
    `carbaseid` int(10) unsigned NOT NULL DEFAULT '0',
    `endtime` int(10) unsigned NOT NULL DEFAULT '0',
    `ownerid` int(20) unsigned NOT NULL DEFAULT '0',
    `carlevel` int(10) unsigned NOT NULL DEFAULT '0',
    `cartype` int(10) unsigned NOT NULL DEFAULT '0',
    `name` int(10) unsigned NOT NULL DEFAULT '0',
    PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



