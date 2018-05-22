-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.55 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  7.0.0.4363
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 hjb.db_address 结构
CREATE TABLE IF NOT EXISTS `db_address` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT '对应的用户id',
  `province` varchar(25) NOT NULL DEFAULT '0' COMMENT '省',
  `city` varchar(25) NOT NULL DEFAULT '0' COMMENT '市',
  `county` varchar(25) NOT NULL DEFAULT '0' COMMENT '区/县',
  `place` varchar(100) NOT NULL DEFAULT '0' COMMENT '具体地址',
  `consignee` varchar(50) NOT NULL DEFAULT '0' COMMENT '收件人',
  `tel` varchar(50) NOT NULL DEFAULT '0' COMMENT '收件人联系方式',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='地址';

-- 正在导出表  hjb.db_address 的数据：0 rows
/*!40000 ALTER TABLE `db_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `db_address` ENABLE KEYS */;


-- 导出  表 hjb.db_admin 结构
CREATE TABLE IF NOT EXISTS `db_admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT '密码',
  `tel` varchar(50) NOT NULL DEFAULT '' COMMENT '联系方式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='网站管理员';

-- 正在导出表  hjb.db_admin 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `db_admin` DISABLE KEYS */;
INSERT INTO `db_admin` (`id`, `username`, `password`, `tel`) VALUES
	(4, 'admin', 'uUnt281xMM909x3WwR00+A==', '17764591475'),
	(5, 'user', 'YW9IL1Wnz8NoWGqREQbYEw==', '17764591475');
/*!40000 ALTER TABLE `db_admin` ENABLE KEYS */;


-- 导出  表 hjb.db_brand 结构
CREATE TABLE IF NOT EXISTS `db_brand` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0' COMMENT '品牌名',
  `des` longtext COMMENT '描述',
  `logo` varchar(225) NOT NULL DEFAULT 'https://127.0.0.1:8080/uploads/default/20180227082733974944.jpg' COMMENT '品牌logo',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='手机品牌';

-- 正在导出表  hjb.db_brand 的数据：5 rows
/*!40000 ALTER TABLE `db_brand` DISABLE KEYS */;
INSERT INTO `db_brand` (`id`, `name`, `des`, `logo`) VALUES
	(5, 'VIVO', '', 'http://127.0.0.1:8080/uploads/default/20180227082733974944.jpg'),
	(4, 'OPPO', '', 'http://127.0.0.1:8080/uploads/default/20180227082733974944.jpg'),
	(6, '华为', '', 'http://127.0.0.1:8080/uploads/default/20180227082733974944.jpg'),
	(8, '三星', '', 'http://127.0.0.1:8080/uploads/default/20180227082733974944.jpg'),
	(9, '苹果', '', 'http://127.0.0.1:8080/uploads/default/20180227082733974944.jpg');
/*!40000 ALTER TABLE `db_brand` ENABLE KEYS */;


-- 导出  表 hjb.db_evals 结构
CREATE TABLE IF NOT EXISTS `db_evals` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goodsId` int(10) NOT NULL DEFAULT '0' COMMENT '商品id',
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT '评论人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商品评论';

-- 正在导出表  hjb.db_evals 的数据：0 rows
/*!40000 ALTER TABLE `db_evals` DISABLE KEYS */;
/*!40000 ALTER TABLE `db_evals` ENABLE KEYS */;


-- 导出  表 hjb.db_goods 结构
CREATE TABLE IF NOT EXISTS `db_goods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
  `des` varchar(255) DEFAULT '' COMMENT '商品简介',
  `brandId` int(10) NOT NULL DEFAULT '0' COMMENT '品牌Id',
  `pamramId` int(10) NOT NULL DEFAULT '0' COMMENT '商品规格Id',
  `revaId` int(10) NOT NULL DEFAULT '0' COMMENT '回收估价Id',
  `o_price` varchar(50) NOT NULL DEFAULT '' COMMENT '原价',
  `m_price` varchar(50) DEFAULT '' COMMENT '最低换购价',
  `l_price` varchar(50) DEFAULT '' COMMENT '租赁价',
  `tags` varchar(50) DEFAULT '' COMMENT '商品标签',
  `detail` longtext COMMENT '详情',
  `detailImg` varchar(255) DEFAULT NULL COMMENT '商品详情图',
  `img` varchar(255) NOT NULL DEFAULT 'https://127.0.0.1:8080/uploads/default/20180227082733974944.jpg' COMMENT '商品主图',
  `showImg` varchar(1024) NOT NULL DEFAULT 'https://127.0.0.1:8080/uploads/default/20180227082733974944.jpg' COMMENT '商品展示图',
  `exp` longtext COMMENT '说明',
  `tomp` varchar(50) DEFAULT '其它' COMMENT '手机类型',
  `tst` varchar(50) DEFAULT '其它' COMMENT '触摸屏类型',
  `mss` varchar(50) DEFAULT '0*0' COMMENT '主屏尺寸',
  `msm` varchar(50) DEFAULT '其它' COMMENT '主屏材质',
  `msr` varchar(50) DEFAULT '0' COMMENT '主屏分辨率',
  `spd` varchar(50) DEFAULT '0' COMMENT '屏幕像素密度',
  `nb` varchar(50) DEFAULT '0.00mm' COMMENT '窄边框',
  `sor` varchar(50) DEFAULT '0' COMMENT '屏幕占比',
  `osp` varchar(50) DEFAULT '无' COMMENT '其他屏幕参数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='商品';

-- 正在导出表  hjb.db_goods 的数据：16 rows
/*!40000 ALTER TABLE `db_goods` DISABLE KEYS */;
INSERT INTO `db_goods` (`id`, `name`, `des`, `brandId`, `pamramId`, `revaId`, `o_price`, `m_price`, `l_price`, `tags`, `detail`, `detailImg`, `img`, `showImg`, `exp`, `tomp`, `tst`, `mss`, `msm`, `msr`, `spd`, `nb`, `sor`, `osp`) VALUES
	(8, 'OPPO A57', 'OPPO A57', 4, 0, 0, '1299', '1099', '100', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892230186.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892216620.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892225021.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892226917.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892228393.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(5, 'OPPO A1 红', 'OPPO A1 红', 4, 0, 0, '1499', '1299', '300', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892015375.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526891998891.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892010084.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892011904.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892013716.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(6, 'OPPO A1 深海蓝', 'OPPO A1 深海蓝', 4, 0, 0, '1499', '1299', '300', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892115359.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892103664.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892109668.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892112066.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892113682.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(7, 'OPPO A3', 'OPPO A3', 4, 0, 0, '2099', '1899', '300', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892179955.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892167752.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892173833.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892176059.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892178238.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(9, 'OPPO A73', 'OPPO A73', 4, 0, 0, '1499', '1299', '300', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892288485.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892277562.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892283123.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892285251.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892286865.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(10, 'X20', 'X20', 5, 0, 0, '2598', '2498', '500', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892352687.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892344992.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892347067.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892349326.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892350940.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(11, 'X20_1 ', 'X20_1 ', 5, 0, 0, '2598', '5498', '500', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892394016.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892386502.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892389158.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892390841.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892392446.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(12, 'X21 普通', 'X21 普通', 5, 0, 0, '3198', '2988', '700', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892427341.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892419448.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892421739.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892423642.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892425198.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(13, 'X21_1 屏幕指纹解锁 ', 'X21_1 屏幕指纹解锁 ', 5, 0, 0, '3698', '3198', '1000', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892468212.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892460882.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892462791.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892464313.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892465860.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(14, 'Y66i ', 'Y66i ', 5, 0, 0, '1198', '998', '100', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892502309.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892494384.png', 'http://127.0.0.1:8080/uploads/2018521/20185211526892496347.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892498100.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892499720.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(15, '华为 nova3e j金', '华为 nova3e j金', 6, 0, 0, '2500', '2300', '400', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892553282.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892544720.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892548266.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892549851.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892551308.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(16, 'iPad 2018 WiFi 9.7寸 粉', 'iPad 2018 WiFi 9.7寸 粉', 9, 0, 0, '5988', '5688', '1200', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892645192.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892636123.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892639152.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892641483.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892643446.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(17, 'iPhone 8 红', 'iPhone 8 红', 9, 0, 0, '5466', '5322', '400', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892682082.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892672936.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892676532.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892678348.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892680042.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(18, 'iPhone X', 'iPhone X', 9, 0, 0, '5555', '4444', '321', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892718396.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892707686.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892710292.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892711931.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892713515.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(19, 'S8 灰', 'S8 灰', 8, 0, 0, '3744', '3244', '600', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892755150.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892746523.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892750550.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892752047.jpg,http://127.0.0.1:8080/uploads/2018521/20185211526892753643.jpg', '', '其它', '其它', '其它', '其它', '其它', '其它', '0.00mm', '0', '无'),
	(20, 'S9 黑', 'S9 黑', 8, 0, 0, '3351', '3051', '200', '', '', 'http://127.0.0.1:8080/uploads/2018521/20185211526892790535.jpg', 'http://127.0.0.1:8080/uploads/2018521/20185211526892783071.jpg', 'http://127.0.0.1:8080/uploads/2018522/20185221526956236830.jpg', '', '直立式,智能手机,4G手机', '电容触屏,多点触摸', '0*0', '其它', '0', '0', '0.00mm', '0%', '无');
/*!40000 ALTER TABLE `db_goods` ENABLE KEYS */;


-- 导出  表 hjb.db_imgs 结构
CREATE TABLE IF NOT EXISTS `db_imgs` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL DEFAULT 'https://127.0.0.1:8080/uploads/default/20180227082733974944.jpg' COMMENT '图片地址',
  `type` int(2) NOT NULL DEFAULT '2' COMMENT '1  小程序   2 PC  3  海报图',
  `width` varchar(50) NOT NULL DEFAULT '1920' COMMENT '宽',
  `height` varchar(50) NOT NULL DEFAULT '600' COMMENT '高',
  `href` varchar(255) DEFAULT NULL COMMENT '图片外部链接',
  `des` varchar(255) DEFAULT NULL COMMENT '图片描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='图片';

-- 正在导出表  hjb.db_imgs 的数据：6 rows
/*!40000 ALTER TABLE `db_imgs` DISABLE KEYS */;
INSERT INTO `db_imgs` (`id`, `url`, `type`, `width`, `height`, `href`, `des`) VALUES
	(29, 'http://127.0.0.1:8080/uploads/2018519/20185191526712234568.jpg', 1, '750', '428', '', ''),
	(24, 'http://127.0.0.1:8080/uploads/2018518/20185181526635493828.jpg', 2, '1920', '600', '', ''),
	(22, 'http://127.0.0.1:8080/uploads/2018518/20185181526635478434.jpg', 2, '1920', '600', '', ''),
	(28, 'http://127.0.0.1:8080/uploads/2018519/20185191526712212542.jpg', 1, '750', '428', '', ''),
	(26, 'http://127.0.0.1:8080/uploads/2018518/20185181526637885693.jpg', 2, '1920', '600', '', ''),
	(30, 'http://127.0.0.1:8080/uploads/2018519/20185191526712243169.jpg', 1, '750', '428', '', '');
/*!40000 ALTER TABLE `db_imgs` ENABLE KEYS */;


-- 导出  表 hjb.db_orders 结构
CREATE TABLE IF NOT EXISTS `db_orders` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL DEFAULT '1' COMMENT '对应的用户id',
  `goodsId` varchar(25) NOT NULL DEFAULT '1' COMMENT '对应的商品id',
  `addressId` int(11) NOT NULL DEFAULT '1' COMMENT '对应的地址id',
  `orderno` varchar(50) NOT NULL DEFAULT '' COMMENT '订单号',
  `time` datetime NOT NULL COMMENT '下单时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '订单状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='订单';

-- 正在导出表  hjb.db_orders 的数据：0 rows
/*!40000 ALTER TABLE `db_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `db_orders` ENABLE KEYS */;


-- 导出  表 hjb.db_param 结构
CREATE TABLE IF NOT EXISTS `db_param` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商品规格参数';

-- 正在导出表  hjb.db_param 的数据：0 rows
/*!40000 ALTER TABLE `db_param` DISABLE KEYS */;
/*!40000 ALTER TABLE `db_param` ENABLE KEYS */;


-- 导出  表 hjb.db_reva 结构
CREATE TABLE IF NOT EXISTS `db_reva` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='旧手机估价标签';

-- 正在导出表  hjb.db_reva 的数据：0 rows
/*!40000 ALTER TABLE `db_reva` DISABLE KEYS */;
/*!40000 ALTER TABLE `db_reva` ENABLE KEYS */;


-- 导出  表 hjb.db_users 结构
CREATE TABLE IF NOT EXISTS `db_users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
  `head` varchar(255) NOT NULL DEFAULT 'https://127.0.0.1:8080/uploads/default/20180226786208374011345.jpg' COMMENT '用户头像',
  `tel` varchar(50) DEFAULT '' COMMENT '联系方式',
  `sex` int(11) DEFAULT '1' COMMENT '1  男性     2  女性',
  `birth` datetime DEFAULT NULL COMMENT '生日',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户信息';

-- 正在导出表  hjb.db_users 的数据：0 rows
/*!40000 ALTER TABLE `db_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `db_users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
