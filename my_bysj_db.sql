-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: my_bysj_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='管理员账号';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'cyl','123456');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartId` int NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `openid` text NOT NULL COMMENT '用户id',
  `dishId` int NOT NULL COMMENT '菜品id',
  `quantity` int NOT NULL COMMENT '菜品数量',
  `isSelect` tinyint NOT NULL DEFAULT '0' COMMENT '是否选择',
  PRIMARY KEY (`cartId`),
  KEY `fk_cart_dishes_id` (`dishId`),
  CONSTRAINT `fk_cart_dishes_id` FOREIGN KEY (`dishId`) REFERENCES `dishes` (`dishId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='购物车表格（Cart）：用于保存用户的购物车信息，包括顾客编号、菜品编号、菜品数量等字段。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (24,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',7,1,0),(25,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',12,1,0),(26,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',24,1,0);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentId` int NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `openid` text NOT NULL COMMENT '用户id',
  `dishId` int NOT NULL COMMENT '菜品id',
  `commentText` text NOT NULL COMMENT '评论内容',
  `commentImgUrl` text COMMENT '评论图片',
  `rate` int NOT NULL DEFAULT '5' COMMENT '评论时间',
  `orderId` int NOT NULL,
  `createtime` datetime NOT NULL,
  PRIMARY KEY (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='评论表格（Comments）：用于保存用户对菜品的评论信息，包括评论编号、顾客编号、菜品编号、评论内容、评论时间等字段。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',2,'很好吃，菜品口感很棒，份量适中，价格也比较合理。服务员态度也很好，给人很好的用餐体验。推荐大家来尝试这道鱼香肉丝！','',4,3,'2023-04-15 16:04:00'),(3,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',1,'哇，红烧鱼太好吃了！鱼肉鲜嫩多汁，入口即化，还有那浓郁的红烧酱汁，简直是绝配啊！再加上搭配的凉拌小黄瓜，口感清爽，真是一道完美的餐点！强烈推荐给大家哦！','',4,3,'2023-04-15 16:04:00'),(4,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',2,'这道鱼香肉丝真的很好吃呢！肉质鲜嫩，口感十分细腻，而且配上甜酸的酱汁和香葱，味道真的很棒！只是有点儿偏甜，如果能再减少一点糖的用量就更好了。总之，这是一道让人回味无穷的美味佳肴！','http://127.0.0.1:3000/images/rateImg/f1h72lknOUFv6644b5cfc0f1a42afb7494a178e7576e.jpg,http://127.0.0.1:3000/images/rateImg/MT8y1rtzD21y125d7edd8d13df47237fe1b32f688bd5.jpg,http://127.0.0.1:3000/images/rateImg/IcIU4EEf66gr2c34d63d6a62a5f57131a22684f08a9b.jpg',5,5,'2023-04-15 16:06:00'),(5,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',5,'好吃','http://127.0.0.1:3000/images/rateImg/gAXgr8GQtzBJ48fdc3513a3c086006a0a7a241057055.jpg,http://127.0.0.1:3000/images/rateImg/1OiQMN7RIRPffbca51e8bab323cdeb901702036fbe9e.jpg,http://127.0.0.1:3000/images/rateImg/JVTGxIMmmuH86c7502913058d7c0319fffd8e1c28319.jpg',4,4,'2023-05-20 22:19:00'),(6,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',3,'美味','http://127.0.0.1:3000/images/rateImg/zs26ljHqESwRc82ee8677a8a388f0c242c1e4b7949fc.jpg,http://127.0.0.1:3000/images/rateImg/w911T93fSmmgb5b738284ca60b2550ee746f887d7cdc.jpg,http://127.0.0.1:3000/images/rateImg/o3AUJMAWoEtLdf5ebc40d65bb0f8f0d22b5f24141c80.jpg',5,4,'2023-05-20 22:19:00');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `couponId` int NOT NULL AUTO_INCREMENT COMMENT '优惠id',
  `couponLimit` int NOT NULL COMMENT '每人限领',
  `couponCondition` float NOT NULL COMMENT '优惠券使用条件',
  `value` float NOT NULL COMMENT '优惠券面额',
  `number` int NOT NULL COMMENT '优惠券数量',
  PRIMARY KEY (`couponId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='优惠券';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (1,1,100,10,149),(2,1,80,5,99),(3,1,50,5,49),(4,1,120,30,50),(5,1,150,50,50),(6,1,200,60,18);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerId` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userName` varchar(45) NOT NULL COMMENT '用户昵称',
  `userAvatar` text NOT NULL COMMENT '用户头像',
  `phone` varchar(45) DEFAULT NULL COMMENT '用户联系号码',
  `gender` char(1) DEFAULT NULL COMMENT '用户性别',
  `openid` text NOT NULL COMMENT '用户微信授权的openid——唯一标识符',
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='顾客表格（Customers）：用于保存用户的个人信息，包括用户编号、用户名、密码、手机号等字段。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'o 。O！','http://127.0.0.1:3000/images/avatar/EbT3bYa3UA1m76f9d40334838c7e9842b34ed4dde616.jpeg','15766126496','男','oomqF5Nuc9qbpsjJeAFN4C3__xhI');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerscoupons`
--

DROP TABLE IF EXISTS `customerscoupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerscoupons` (
  `customerCouponId` int NOT NULL AUTO_INCREMENT COMMENT '用户领取优惠券id',
  `openid` text NOT NULL COMMENT '用户id',
  `couponId` int NOT NULL COMMENT '优惠券id',
  `recivenumber` int NOT NULL COMMENT '是否已被使用',
  `isused` tinyint NOT NULL DEFAULT '0',
  `haveNumber` int DEFAULT NULL,
  PRIMARY KEY (`customerCouponId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户领取的优惠券';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerscoupons`
--

LOCK TABLES `customerscoupons` WRITE;
/*!40000 ALTER TABLE `customerscoupons` DISABLE KEYS */;
INSERT INTO `customerscoupons` VALUES (1,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',1,1,0,1),(2,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',3,1,0,1),(3,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',2,1,1,0),(4,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',6,1,0,2);
/*!40000 ALTER TABLE `customerscoupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishes`
--

DROP TABLE IF EXISTS `dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dishes` (
  `dishId` int NOT NULL AUTO_INCREMENT COMMENT '菜品id',
  `name` varchar(45) NOT NULL COMMENT '菜品名字',
  `description` text NOT NULL COMMENT '菜品描述',
  `category` varchar(45) NOT NULL COMMENT '菜品类别',
  `imageUrl` text NOT NULL COMMENT '图片连接',
  `price` float NOT NULL COMMENT '菜品价格',
  `averageRating` float DEFAULT NULL COMMENT '平均分数',
  PRIMARY KEY (`dishId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='菜品表格（Dishes）：用于保存所有的菜品信息，包括菜品编号、名称、描述、图片URL、价格等字段，以及平均评分和总评价数两个额外的字段。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishes`
--

LOCK TABLES `dishes` WRITE;
/*!40000 ALTER TABLE `dishes` DISABLE KEYS */;
INSERT INTO `dishes` VALUES (1,'红烧鱼','红烧鱼是用鲳鱼制作的一道闽菜菜品。鱼不仅味道鲜美，而且营养价值极高。其蛋白质含量为猪肉的2倍，且属于优质蛋白，人体吸收率高。鱼中富含丰富的硫胺素、核黄素、尼克酸、维生素d等和一定量的钙、磷、铁等矿物质。鱼肉中脂肪含量虽低，但其中的脂肪酸被证实有降糖、护心和防癌的作用。鱼肉中的维生素d、钙、磷，能有效地预防骨质疏松症。祖国医学认为食鱼要讲究对症，对症吃“鱼”，它的食用和医用价值才能显现出来。','闽菜','http://127.0.0.1:3000/images/foods/hongshaoyu1.jpeg,http://127.0.0.1:3000/images/foods/hongshaoyu2.jpg,http://127.0.0.1:3000/images/foods/hongshaoyu3.jpg,http://127.0.0.1:3000/images/foods/hongshaoyu4.jpg,http://127.0.0.1:3000/images/foods/hongshaoyu5.jpg,http://127.0.0.1:3000/images/foods/hongshaoyu6.jpg',20,4.25),(2,'鱼香肉丝','鱼香肉丝，是四川的一道特色名菜，该菜品以泡辣椒、木耳丝，子姜、大蒜、糖和醋炒制猪里脊肉丝而成，由民国时期的一位川菜大厨所创制，相传灵感来自泡椒肉丝。\n鱼香肉丝是一道著名川菜，其辣咸鲜酸甜兼备，葱姜蒜香浓郁，其鱼香味是用不含鱼的调味品调制而成，此法源出于四川民间独具特色的烹鱼调味方法，而今已广泛用于川味的熟菜中。','川菜','http://127.0.0.1:3000/images/foods/yuxiangrous2.jpg,http://127.0.0.1:3000/images/foods/yuxiangrous3.jpg,http://127.0.0.1:3000/images/foods/yuxiangrous4.jpg,http://127.0.0.1:3000/images/foods/yuxiangrous5.jpg,http://127.0.0.1:3000/images/foods/yuxiangrous6.jpg,http://127.0.0.1:3000/images/foods/yuxiangrousi1.jpg',17,4.5),(3,'宫保鸡丁','宫保鸡丁，是一道闻名中外的特色传统名菜，在鲁菜、川菜、贵州菜中都有收录，其原料、做法有差别。该菜式的起源与鲁菜中的酱爆鸡丁、贵州菜中的胡辣子鸡丁有关，后被清朝山东巡抚、四川总督丁宝桢改良发扬，形成了一道新菜式——宫保鸡丁，并流传，此道菜也被归纳为北京宫廷菜。之后宫保鸡丁也流传到国外。\n宫保鸡丁选用鸡肉为主料，佐以花生米、辣椒等辅料烹制而成；红而不辣、辣而不猛、香辣味浓、肉质滑脆；其入口鲜辣，鸡肉的鲜嫩可以配合花生的香脆。','鲁菜、川菜、贵州菜','http://127.0.0.1:3000/images/foods/gongbaojiding1.jpg,http://127.0.0.1:3000/images/foods/gongbaojiding2.jpg,http://127.0.0.1:3000/images/foods/gongbaojiding3.jpg,http://127.0.0.1:3000/images/foods/gongbaojiding4.jpg,http://127.0.0.1:3000/images/foods/gongbaojiding5.jpg,http://127.0.0.1:3000/images/foods/gongbaojiding6.jpg',20,5),(4,'红烧肉','红烧肉，一道著名的大众菜肴，各大菜系都有自己特色的红烧肉。其以五花肉为制作主料，也可用猪后腿代替，最好选用肥瘦相间的三层肉来做，锅具以砂锅为主，做出来的肉肥瘦相间，香甜松软，营养丰富，入口即化。\n红烧肉在我国各地流传甚广，做法多达二三十种，具有一定的营养价值','家常菜','http://127.0.0.1:3000/images/foods/hongshaorou1.jpg,http://127.0.0.1:3000/images/foods/hongshaorou2.jpg,http://127.0.0.1:3000/images/foods/hongshaorou3.jpg,http://127.0.0.1:3000/images/foods/hongshaorou4.jpg,http://127.0.0.1:3000/images/foods/hongshaorou5.jpg,http://127.0.0.1:3000/images/foods/hongshaorou6.jpg',20.5,4.25),(5,'番茄炒蛋','番茄炒蛋是一道简单易学的家常菜，口感鲜美，是大多数中国家庭中的常客。是以西红柿和鸡蛋为主料制作的家常菜，主要食材为鸡蛋，西红柿，食用油，盐，清水，生抽，味精，葱花，白砂糖，蚝油。','家常菜','http://127.0.0.1:3000/images/foods/fanqiechaodan1.jpg,http://127.0.0.1:3000/images/foods/fanqiechaodan2.jpg,http://127.0.0.1:3000/images/foods/fanqiechaodan3.jpg,http://127.0.0.1:3000/images/foods/fanqiechaodan4.jpg,http://127.0.0.1:3000/images/foods/fanqiechaodan5.jpg,http://127.0.0.1:3000/images/foods/fanqiechaodan6.jpg',10,4.25),(6,'东坡肉','东坡肉是中国传统名菜之一，由猪肉制成，肉质酥烂，入口即化，肥而不腻，香而不腥，是中国美食中的瑰宝。东坡肉的主料和造型大同小异，主料都是半肥半瘦的猪肉，加入配料焖制而成，成品菜都是码得整整齐齐的麻将块儿，红得透亮，色如玛瑙，入口软而不烂，肥而不腻。','浙菜','http://127.0.0.1:3000/images/foods/dongporou1.jpg,http://127.0.0.1:3000/images/foods/dongporou2.jpg,http://127.0.0.1:3000/images/foods/dongporou3.jpg,http://127.0.0.1:3000/images/foods/dongporou4.jpg,http://127.0.0.1:3000/images/foods/dongporou5.jpg,http://127.0.0.1:3000/images/foods/dongporou6.jpg',25,4),(7,'清蒸鲈鱼','清蒸鲈鱼的烹饪技巧以蒸菜为主，口味清淡，是广东省特色传统名菜之一。属于粤菜系，以鲈鱼为制作主料。\n鲈鱼富含多种营养价值，是淡水鱼中含DHA量最高的，因此清蒸鲈鱼最补脑。选用一斤左右的鲈鱼，蒸的时间恰到火候，鱼肉刚熟，细嫩爽滑，鱼肉的鲜美完全的呈现。汤汁带着米酒的甜，豉油的香。','粤菜','http://127.0.0.1:3000/images/foods/qingzhengluyu1.jpg,http://127.0.0.1:3000/images/foods/qingzhengluyu2.jpg,http://127.0.0.1:3000/images/foods/qingzhengluyu3.jpg,http://127.0.0.1:3000/images/foods/qingzhengluyu4.jpg,http://127.0.0.1:3000/images/foods/qingzhengluyu5.jpg,http://127.0.0.1:3000/images/foods/qingzhengluyu6.jpg',20,5),(8,'麻婆豆腐','麻婆豆腐是四川省传统的川菜之一，色泽红亮，口感麻辣浓香，豆腐嫩滑爽口。主料为：豆腐，辅料为：蒜苗、牛肉沫(其他肉也可以)，调料为：豆瓣、辣椒面和花椒面、酱油、生抽、老抽、糖、淀粉等，麻来自花椒，辣来自辣椒面，此菜成菜麻、辣、鲜、香、烫、脆、嫩、酥，将川菜麻辣味型的特点展现的淋漓尽致，如今，麻婆豆腐远渡重洋，在美国、加拿大、英国、法国、越南、新加坡、马来西亚、日本、澳大利亚等国安家落户，从一味家常小菜一跃而登上大雅之堂，成了国际名菜。','川菜','http://127.0.0.1:3000/images/foods/mapodoufu1.jpg,http://127.0.0.1:3000/images/foods/mapodoufu2.jpg,http://127.0.0.1:3000/images/foods/mapodoufu3.jpg,http://127.0.0.1:3000/images/foods/mapodoufu4.jpg,http://127.0.0.1:3000/images/foods/mapodoufu5.jpg,http://127.0.0.1:3000/images/foods/mapodoufu6.jpg',15,3.5),(9,'蒜香排骨','蒜香排骨是一道家常菜，属于上海菜。选用肉质紧实的排骨，用葱、姜、蒜等调味料腌制，再用锅煎炸，口感酥脆香嫩。蒜香排骨是一道美味可口的地方名菜，其口感蒜香浓郁，质嫩味美。具有贫血调理，月经不调调理，健脾开胃调理的功效。猪肋排洗净斩成8厘米长件，用松肉粉(嫩肉粉)腌1小时后，冲水沥干。','上海菜','http://127.0.0.1:3000/images/foods/suanxiangpaigu1.jpg,http://127.0.0.1:3000/images/foods/suanxiangpaigu2.jpg,http://127.0.0.1:3000/images/foods/suanxiangpaigu3.jpg,http://127.0.0.1:3000/images/foods/suanxiangpaigu4.jpg,http://127.0.0.1:3000/images/foods/suanxiangpaigu5.jpg,http://127.0.0.1:3000/images/foods/suanxiangpaigu6.jpg',30,3),(10,'糖醋里脊','糖醋里脊是一道传统的中式烹饪美食，口感酸甜可口，里脊嫩滑，外酥里嫩。糖醋里脊是中国经典传统名菜之一，该菜品以猪里脊肉为主材，配以面粉、淀粉、醋、番茄酱等佐料，酸甜可口，让人食欲大开；该菜品在陕菜、豫菜、浙菜、鲁菜、川菜、淮扬菜、粤菜、闽菜里均有此菜。','家常菜','http://127.0.0.1:3000/images/foods/tangculiji1.jpg,http://127.0.0.1:3000/images/foods/tangculiji2.jpg,http://127.0.0.1:3000/images/foods/tangculiji3.jpg,http://127.0.0.1:3000/images/foods/tangculiji4.jpg,http://127.0.0.1:3000/images/foods/tangculiji5.jpg,http://127.0.0.1:3000/images/foods/tangculiji6.jpg',20,3.5),(11,'干锅牛肉','干锅牛肉是一道菜品，制作原料主要有牛肉、尖红、精盐、味精等。色红亮，质软糯，汁浓稠，回味悠长，营养丰富。','家常菜','http://127.0.0.1:3000/images/foods/ganguoniurou1.jpg,http://127.0.0.1:3000/images/foods/ganguoniurou2.jpg,http://127.0.0.1:3000/images/foods/ganguoniurou3.jpg,http://127.0.0.1:3000/images/foods/ganguoniurou4.jpg,http://127.0.0.1:3000/images/foods/ganguoniurou5.jpg,http://127.0.0.1:3000/images/foods/ganguoniurou6.jpg',30,4.5),(12,'凉拌黄瓜','凉拌黄瓜是以黄瓜为主要食材的清爽家常凉拌菜，口感清脆爽口，操作简单，具有美容养颜功效，营养价值丰富。','家常菜','http://127.0.0.1:3000/images/foods/liangbanhuanggua1.jpg,http://127.0.0.1:3000/images/foods/liangbanhuanggua2.jpg,http://127.0.0.1:3000/images/foods/liangbanhuanggua3.jpg,http://127.0.0.1:3000/images/foods/liangbanhuanggua4.jpg,http://127.0.0.1:3000/images/foods/liangbanhuanggua5.jpg,http://127.0.0.1:3000/images/foods/liangbanhuanggua6.jpg',8,4.5),(13,'回锅肉','回锅肉，是四川传统菜式中家常菜肴的代表菜之一，属于川菜。其制作原料主要有猪后臀肉（二刀肉）、青椒、蒜苗等，口味独特，色泽红亮，肥而不腻。\n回锅肉起源四川农村地区 。古代时期称作油爆锅，四川地区大部分家庭都会制作。所谓回锅，就是再次烹调的意思。回锅肉在川菜中的地位是非常重要的，回锅肉一直被认为是川菜之首，川菜之化身，提到川菜必然想到回锅肉。\n回锅肉色香味俱全，是下饭菜中大部分人会选的菜。川菜中的回锅肉，最佳是蒜苗、仔姜、青椒做“翘头”，而自贡家常菜中的回锅肉，就有青椒、仔姜、葱白配，藠头配，干豇豆配，莲花白配，甚至锅盔配。 \n配料各有不同，除了蒜苗（青蒜）还可以用彩椒，洋葱，韭菜，锅盔等来制作回锅肉，“家常”顾名思义，“调料家家常有之意，”故每一家制作出的味道都不相同，这一特性，也是赋予了回锅肉这道菜独特的魅力。','川菜','http://127.0.0.1:3000/images/foods/huiguorou1.jpg,http://127.0.0.1:3000/images/foods/huiguorou2.jpg,http://127.0.0.1:3000/images/foods/huiguorou3.jpg,http://127.0.0.1:3000/images/foods/huiguorou4.jpg,http://127.0.0.1:3000/images/foods/huiguorou5.jpg,http://127.0.0.1:3000/images/foods/huiguorou6.jpg',28,5),(14,'水煮肉片','水煮肉片是以猪里脊肉为主料的一道地方新创名菜，起源于四川地区-四川省-自贡市，发扬于西南，属于川菜中著名的家常菜。因肉片未经划油，以水煮熟故名水煮肉片。水煮肉片肉味香辣，软嫩，易嚼。吃时肉嫩菜鲜 ，汤红油亮，麻辣味浓，最宜下饭，为家常美食之一；特色是“麻、辣、鲜、香”。','川菜','http://127.0.0.1:3000/images/foods/shuizhuroupian1.jpg,http://127.0.0.1:3000/images/foods/shuizhuroupian2.jpg,http://127.0.0.1:3000/images/foods/shuizhuroupian3.jpg,http://127.0.0.1:3000/images/foods/shuizhuroupian4.jpg,http://127.0.0.1:3000/images/foods/shuizhuroupian5.jpg,http://127.0.0.1:3000/images/foods/shuizhuroupian6.jpg',28.9,5),(15,'辣子鸡','辣子鸡是一道经典的家常菜，一般以整鸡为主料，加上葱、干辣椒、花椒、盐、胡椒、味精等多种材料精制而成，虽然是同一道菜，各地制作也各有特色。辣子鸡因各地的不同制作方法也有不同的特色，深受各地人们的喜爱。此菜成菜色泽棕红油亮，麻辣味浓。','川菜','http://127.0.0.1:3000/images/foods/laziji1.jpg,http://127.0.0.1:3000/images/foods/laziji2.jpg,http://127.0.0.1:3000/images/foods/laziji3.jpg,http://127.0.0.1:3000/images/foods/laziji4.jpg,http://127.0.0.1:3000/images/foods/laziji5.jpg,http://127.0.0.1:3000/images/foods/laziji6.jpg',23.9,4),(16,'凉拌木耳','凉拌木耳是道以木耳作为主要食材，以胡萝卜、香菜、洋葱、红辣椒、甜椒、蒜头作为辅料凉拌而成的一道家常菜。具有清爽可口，营养丰富的特点，尤其适宜夏季食用。火麻油拌木耳的功效具有补气血、减肥防癌治便秘、清肠胃等，木耳含有抗肿瘤活性物质，能增强机体免疫力，木耳含有维生素K，预防血栓症的发生。','家常菜','http://127.0.0.1:3000/images/foods/liangbanmuer1.jpg,http://127.0.0.1:3000/images/foods/liangbanmuer2.jpg,http://127.0.0.1:3000/images/foods/liangbanmuer3.jpg,http://127.0.0.1:3000/images/foods/liangbanmuer4.jpg,http://127.0.0.1:3000/images/foods/liangbanmuer5.jpg,http://127.0.0.1:3000/images/foods/liangbanmuer6.jpg',10,4),(17,'凉拌豆腐','凉拌豆腐是一道经典的名菜，属于淮扬菜。主料为豆腐、皮蛋、黄瓜、番茄等原料。 爽口开胃,适用夏季食用。材料嫩八公山豆腐2块 皮蛋2个 小黄瓜2条 大葱1大根 番茄1个调味汁酱油4大匙 醋1大匙 芝麻油3大匙','家常菜','http://127.0.0.1:3000/images/foods/liangbandoufu1.jpg,http://127.0.0.1:3000/images/foods/liangbandoufu2.jpg,http://127.0.0.1:3000/images/foods/liangbandoufu3.jpg,http://127.0.0.1:3000/images/foods/liangbandoufu4.jpg,http://127.0.0.1:3000/images/foods/liangbandoufu5.jpg,http://127.0.0.1:3000/images/foods/liangbandoufu6.jpg',12.5,3),(18,'油焖大虾','油焖大虾是山东省的一道特色名菜，属于鲁菜。该菜品的主要食材为清明前渤海湾的大对虾，使用鲁菜特有的油焖技法。其是一道历史悠久的名菜，鲜香甜咸四种味道相辅相成，回味无穷。近些年流行的油焖大虾是起源于湖北潜江的鄂菜，使用的是淡水的鳌虾（俗称小龙虾）制作，与鲁菜的油焖大虾不同。','鲁菜','http://127.0.0.1:3000/images/foods/youmendaxia1.jpg,http://127.0.0.1:3000/images/foods/youmendaxia2.jpg,http://127.0.0.1:3000/images/foods/youmendaxia3.jpg,http://127.0.0.1:3000/images/foods/youmendaxia4.jpg,http://127.0.0.1:3000/images/foods/youmendaxia5.jpg,http://127.0.0.1:3000/images/foods/youmendaxia6.jpg',35,3.5),(19,'西红柿鸡蛋汤','西红柿鸡蛋汤，是一道常见的家常菜。番茄鸡蛋汤，做法简易、味道可口、营养丰富，是一道十分受欢迎的菜肴。可用作中餐、晚餐。','家常菜','http://127.0.0.1:3000/images/foods/xihongshijidantang1.jpg,http://127.0.0.1:3000/images/foods/xihongshijidantang2.jpg,http://127.0.0.1:3000/images/foods/xihongshijidantang3.jpg,http://127.0.0.1:3000/images/foods/xihongshijidantang4.jpg,http://127.0.0.1:3000/images/foods/xihongshijidantang5.jpg,http://127.0.0.1:3000/images/foods/xihongshijidantang6.jpg',12.9,3),(20,'拔丝地瓜','拔丝地瓜（The hot candied sweet potatoes）是以地瓜、白糖、油等食材制成的一道色香味俱全的传统名菜。地瓜营养价值很高，是世界卫生组织评选出来的“十大最佳蔬菜”的冠军。地瓜;又称;红薯、红蓣、紫蓣、番薯、甘薯、山芋、等。。不同地区人们对它的称呼也不同，我们北京叫白薯。红薯有“补虚乏，益气力，健脾胃，强肾阴”的功效，使人“长寿少疾”。还能补中、和血、暖胃、肥五脏等。当代《中华本草》说其：“味甘，性平。归脾、肾经。”“补中和血、益气生津、宽肠胃、通便秘。主治脾虚水肿、疮疡肿毒、肠燥便秘。”','家常菜','http://127.0.0.1:3000/images/foods/basidigua1.jpg,http://127.0.0.1:3000/images/foods/basidigua2.jpg,http://127.0.0.1:3000/images/foods/basidigua3.jpg,http://127.0.0.1:3000/images/foods/basidigua4.jpg,http://127.0.0.1:3000/images/foods/basidigua5.jpg,http://127.0.0.1:3000/images/foods/basidigua6.jpg',10,3),(21,'滑蛋虾仁','滑蛋虾仁，是一道菜品，主要制作原料是虾仁，鸡蛋，是广东省传统的特色名菜，属于粤菜系。人体内很重要的一种物质就是虾青素，就是表面红颜色的成分，虾青素是发现的最强的一种抗氧化剂，颜色越深说明虾青素含量越高。广泛用在化妆品、食品添加、以及药品。日本大阪大学的科学家最近发现，虾体内的虾青素有助于消除因时差反应而产生的“时差症”。','粤菜','http://127.0.0.1:3000/images/foods/huadanxiaren1.jpg,http://127.0.0.1:3000/images/foods/huadanxiaren2.jpg,http://127.0.0.1:3000/images/foods/huadanxiaren3.jpg,http://127.0.0.1:3000/images/foods/huadanxiaren4.jpg,http://127.0.0.1:3000/images/foods/huadanxiaren5.jpg,http://127.0.0.1:3000/images/foods/huadanxiaren6.jpg',15.5,4),(22,'水煮鱼','水煮鱼又称江水煮江鱼、水煮鱼片，是中国川渝地区的一道特色名菜，属于川菜系，其最早流行于重庆市渝北区翠云乡。\n水煮鱼通常由新鲜草鱼、豆芽、辣椒等食材制作而成。“油而不腻、辣而不燥、麻而不苦、肉质滑嫩”是其特色。','川菜','http://127.0.0.1:3000/images/foods/shuizhuyu1.jpg,http://127.0.0.1:3000/images/foods/shuizhuyu2.jpg,http://127.0.0.1:3000/images/foods/shuizhuyu3.jpg,http://127.0.0.1:3000/images/foods/shuizhuyu4.jpg,http://127.0.0.1:3000/images/foods/shuizhuyu5.jpg,http://127.0.0.1:3000/images/foods/shuizhuyu6.jpg',30.99,4.5),(23,'酸菜鱼','酸菜鱼也称为酸汤鱼，是一道源自重庆市的经典菜品，以其特有的调味和独特的烹调技法而著称。流行于上世纪90年代，是重庆江湖菜的开路先锋之一。\n酸菜鱼以草鱼为主料，配以泡菜等食材煮制而成，口味酸辣可口；鱼含丰富优质蛋白，能提供人丰富的蛋白质、矿物质等营养；酸菜中的乳酸可以促进人体对铁元素的吸收，还可以增加人的食欲。\n关于酸菜鱼的历史来源众说纷纭，也无法考证，后经传承，制作方法也各有不同，但口味基本一致。','川菜','http://127.0.0.1:3000/images/foods/suancaiyu1.jpg,http://127.0.0.1:3000/images/foods/suancaiyu2.jpg,http://127.0.0.1:3000/images/foods/suancaiyu3.jpg,http://127.0.0.1:3000/images/foods/suancaiyu4.jpg,http://127.0.0.1:3000/images/foods/suancaiyu5.jpg,http://127.0.0.1:3000/images/foods/suancaiyu6.jpg',31.99,4.5),(24,'红烧茄子','红烧茄子（Eggplant）是一道历史久远的特色传统佳肴，此菜是素菜中的精细者，属于大众食品。红烧茄子以茄子为主材制作而成。可清热解暑，对于容易长痱子、生疮疖的人，尤为适宜。','家常菜','http://127.0.0.1:3000/images/foods/hongshaoqiezi1.jpg,http://127.0.0.1:3000/images/foods/hongshaoqiezi2.jpg,http://127.0.0.1:3000/images/foods/hongshaoqiezi3.jpg,http://127.0.0.1:3000/images/foods/hongshaoqiezi4.jpg,http://127.0.0.1:3000/images/foods/hongshaoqiezi5.jpg,http://127.0.0.1:3000/images/foods/hongshaoqiezi6.jpg',12.99,5),(25,'酸辣土豆丝','酸辣土豆丝，是用土豆、辣椒、白醋，葱，姜等制作而成的菜肴，色泽光亮，酸辣可口。土豆：土豆是低热能、多维生素和微量元素的食物，是理想的减肥食品。每100克土豆含钾高达300毫克。专家认为，每周吃5～6个土豆可使中风几率下降40%。同时土豆对辅助治疗消化不良、习惯性便秘、神疲乏力、慢性胃痛、关节疼痛、皮肤湿疹等症有良好效果，是胃病和心脏病患者的优质保健食品，还可以降糖降脂，美容、抗衰老等。\n红辣椒：辣椒是老百姓餐桌上最常见的一种原料，其营养丰富，口味独特，就餐时能增加饭量，多食可增强体力，改善怕冷、冻伤、血管性头痛等症状。同时辣椒中含有一种物殊物质，能加速新陈代谢，促进荷尔蒙分泌，保健皮肤。富含的维C，可以控制心脏病及冠状动脉硬化，降低胆固醇。含有较多抗氧化物质，可预防癌症及其他慢性疾病。可以使呼吸道畅通，用以治疗咳嗽、感冒。','家常菜','http://127.0.0.1:3000/images/foods/suanlatudousi1.jpg,http://127.0.0.1:3000/images/foods/suanlatudousi2.jpg,http://127.0.0.1:3000/images/foods/suanlatudousi3.jpg,http://127.0.0.1:3000/images/foods/suanlatudousi4.jpg,http://127.0.0.1:3000/images/foods/suanlatudousi5.jpg,http://127.0.0.1:3000/images/foods/suanlatudousi6.jpg',12,3.5),(26,'锅包肉','锅包肉，原名锅爆肉，光绪年间始创自哈尔滨道台府府尹杜学瀛厨师郑兴文之手。成菜后，色泽金黄，口味酸甜。锅包肉是为适应外宾口味，把咸鲜口味的“焦烧肉条”改成了一道酸甜口味的菜肴。通常将猪里脊肉切片腌入味，裹上炸浆，下锅炸至金黄色捞起，再下锅拌炒勾芡即成。','家常菜','http://127.0.0.1:3000/images/foods/guobaorou1.jpg,http://127.0.0.1:3000/images/foods/guobaorou2.jpg,http://127.0.0.1:3000/images/foods/guobaorou3.jpg,http://127.0.0.1:3000/images/foods/guobaorou4.jpg,http://127.0.0.1:3000/images/foods/guobaorou5.jpg,http://127.0.0.1:3000/images/foods/guobaorou6.jpg',28,4.5),(27,'红烧狮子头','红烧狮子头，是一道淮扬名菜。将有肥有瘦的肉配上荸荠，香菇等材料，做成丸子，然后先炸后煮。已故国画大师张大千传授夫人的一道拿手好菜就是“红烧狮子头”，大千先生的作法是，七分瘦肉，三分肥肉，细切粗斩，大小要如米粒，不能剁太细，让肉质间保持缝隙，才能含汁。','淮扬菜','http://127.0.0.1:3000/images/foods/hongshaoshizitou1.jpg,http://127.0.0.1:3000/images/foods/hongshaoshizitou2.jpg,http://127.0.0.1:3000/images/foods/hongshaoshizitou3.jpg,http://127.0.0.1:3000/images/foods/hongshaoshizitou4.jpg,http://127.0.0.1:3000/images/foods/hongshaoshizitou5.jpg,http://127.0.0.1:3000/images/foods/hongshaoshizitou6.jpg',20,4.5),(28,'醋熘白菜','醋熘白菜是一道汉族名菜，属鲁菜系，口感色泽银红，酸甜辣香。以白菜心为主料，青、红辣椒块，海米为配料。白菜含有丰富的钙、铁、无机盐的维生素C等，并且释放热量较多。加入青、红辣椒块，海米，能过醋熘不仅增加钙、磷等无机盐含量，而且使菜肴具有色、香、味、形的特点。','家常菜','http://127.0.0.1:3000/images/foods/culiubaicai1.jpg,http://127.0.0.1:3000/images/foods/culiubaicai2.jpg,http://127.0.0.1:3000/images/foods/culiubaicai3.jpg,http://127.0.0.1:3000/images/foods/culiubaicai4.jpg,http://127.0.0.1:3000/images/foods/culiubaicai5.jpg,http://127.0.0.1:3000/images/foods/culiubaicai6.jpg',15,5),(29,'鱼头豆腐汤','鱼头豆腐汤是由鱼头和豆腐为主要食材烧的汤，豆腐含钙量比较多，而鱼肉中含有维生素D，两者合吃，借助鱼体内维生素D作用，使人体对钙的吸收率提高很多倍。因此，这道汤特别适合中年人，青少年食用。鱼头和豆腐的结合：鱼头富含胶质蛋白，脂肪和热量都很低，食之有健脾补气、温中暖胃、美容润肤之效；豆腐的蛋白质和钙含量丰富，有清热润燥、生津解毒、降低血脂的作用。将鱼头和豆腐炖成汤饮用，不仅可以暖身健脑，还可以使人皮肤润泽细腻。','家常菜','http://127.0.0.1:3000/images/foods/yutoudoufutang1.jpg,http://127.0.0.1:3000/images/foods/yutoudoufutang2.jpg,http://127.0.0.1:3000/images/foods/yutoudoufutang3.jpg,http://127.0.0.1:3000/images/foods/yutoudoufutang4.jpg,http://127.0.0.1:3000/images/foods/yutoudoufutang5.jpg,http://127.0.0.1:3000/images/foods/yutoudoufutang6.jpg',23,4),(30,'莲藕排骨汤','莲藕排骨汤是一道传统名菜，属于鄂菜系，制作原料主要有猪排骨、莲藕、盐等。是千湖之省、水乡泽国和莲藕之乡的湖北名菜。在湖北，素有“无汤不成席”的说法，举凡筵宴，压轴戏必然是一罐鲜醇香美的汤。湖北人爱喝汤，也很会做汤，莲藕排骨汤、瓦罐鸡汤、鱼圆汤均为汤中佳品，待客上选。尤其是用被誉为“水中之宝”的洪湖莲藕做出来的“莲藕排骨汤”，更是极具地域特色，浓缩了荆楚美食文化的精华。','家常菜','http://127.0.0.1:3000/images/foods/lianoupaigutang1.jpg,http://127.0.0.1:3000/images/foods/lianoupaigutang2.jpg,http://127.0.0.1:3000/images/foods/lianoupaigutang3.jpg,http://127.0.0.1:3000/images/foods/lianoupaigutang4.jpg,http://127.0.0.1:3000/images/foods/lianoupaigutang5.jpg,http://127.0.0.1:3000/images/foods/lianoupaigutang6.jpg',25,4),(31,'三杯鸡','三杯鸡是中国江西省赣州市传统风味名菜，属于赣菜客家美食。也是台湾有名的家常菜，因其烹饪时使用一杯台湾米酒、一杯酱油和一杯黑麻油而得名。三杯鸡以鸡肉为主料，搭配糯米酒、青椒、红椒等辅料，通过炸鸡肉、炒糖色后进行煮焖，最后浇汁制作而成。2018年9月10日，三杯鸡被评为“江西十大经典名菜”。','赣菜','http://127.0.0.1:3000/images/foods/sanbeiji1.jpg,http://127.0.0.1:3000/images/foods/sanbeiji2.jpg,http://127.0.0.1:3000/images/foods/sanbeiji3.jpg,http://127.0.0.1:3000/images/foods/sanbeiji4.jpg,http://127.0.0.1:3000/images/foods/sanbeiji5.jpg,http://127.0.0.1:3000/images/foods/sanbeiji6.jpg',30,3.5),(32,'盐焗鸡','盐焗鸡是广东省客家地区的传统美食，属于客家菜，也是广东当地客家招牌菜式之一；盐焗鸡流行于广东深圳、梅州、惠州、河源等地，现已成为享誉中国国内外的经典菜式，原材料是鸡、盐和盐焗粉等，味道咸香，口感鲜嫩。盐焗鸡是广东传统三大名菜之一，由客家人迁徙途中用盐包裹的“盐煨咸鸡”演变而来，至今有千年历史。盐焗鸡主要选用客家山区土鸡为原料，经10几道工序精制而成，有“鲜润、咸香、醇厚”的特点，盐焗鸡是客家传统饮食文化品牌、世界客属华侨“寻根问祖”的标志，也是见证客家历史文化的活化石。','粤菜','http://127.0.0.1:3000/images/foods/yanjuji1.jpg,http://127.0.0.1:3000/images/foods/yanjuji2.jpg,http://127.0.0.1:3000/images/foods/yanjuji3.jpg,http://127.0.0.1:3000/images/foods/yanjuji4.jpg,http://127.0.0.1:3000/images/foods/yanjuji5.jpg,http://127.0.0.1:3000/images/foods/yanjuji6.jpg',20,3),(33,'毛血旺','毛血旺是川菜的一道特色名菜，也是重庆江湖菜的鼻祖之一，已经列入国家标准委员会《渝菜烹饪标准体系》。毛血旺以鸭血为制作主料，烹饪技巧以煮菜为主，口味属于麻辣味。其起源于重庆，流行于西南地区，是一道著名的传统菜式，这道菜是将生血旺现烫现吃，且毛肚杂碎为主料，遂得名。','川菜','http://127.0.0.1:3000/images/foods/maoxuewang1.jpg,http://127.0.0.1:3000/images/foods/maoxuewang2.jpg,http://127.0.0.1:3000/images/foods/maoxuewang3.jpg,http://127.0.0.1:3000/images/foods/maoxuewang4.jpg,http://127.0.0.1:3000/images/foods/maoxuewang5.jpg,http://127.0.0.1:3000/images/foods/maoxuewang6.jpg',15,3.5),(34,'新疆大盘鸡','新疆大盘鸡，又名沙湾大盘鸡、辣子炒鸡，是新疆维吾尔自治区塔城地区沙湾市的特色美食，20世纪80年代起源于新疆公路边饭馆的江湖菜，主要用鸡块和土豆块炒炖而成，还同新疆皮带面搭配食用。色彩鲜艳、爽滑麻辣的鸡肉和软糯甜润的土豆，辣中有香、粗中带细，是餐桌上的佳品。','新疆菜','http://127.0.0.1:3000/images/foods/dapanji1.jpg,http://127.0.0.1:3000/images/foods/dapanji2.jpg,http://127.0.0.1:3000/images/foods/dapanji3.jpg,http://127.0.0.1:3000/images/foods/dapanji4.jpg,http://127.0.0.1:3000/images/foods/dapanji5.jpg,http://127.0.0.1:3000/images/foods/dapanji6.jpg',20,3),(35,'干锅菜花','干锅菜花是一道菜品，制作原料主要有菜花、辣椒、腊肉等。口味浓而不腻，口感饱满，回味悠长。对食欲不振、消化不良、大便干结者都有帮助。','家常菜','http://127.0.0.1:3000/images/foods/ganguocaihua1.jpg,http://127.0.0.1:3000/images/foods/ganguocaihua2.jpg,http://127.0.0.1:3000/images/foods/ganguocaihua3.jpg,http://127.0.0.1:3000/images/foods/ganguocaihua4.jpg,http://127.0.0.1:3000/images/foods/ganguocaihua5.jpg,http://127.0.0.1:3000/images/foods/ganguocaihua6.jpg',12,3.5);
/*!40000 ALTER TABLE `dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `favoriteId` int NOT NULL AUTO_INCREMENT,
  `openid` text NOT NULL,
  `dishId` int NOT NULL,
  PRIMARY KEY (`favoriteId`),
  KEY `fk_favorites_dishes_id` (`dishId`),
  CONSTRAINT `fk_favorites_dishes_id` FOREIGN KEY (`dishId`) REFERENCES `dishes` (`dishId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='收藏表格（Favorites）：用于保存用户收藏的菜品信息，包括顾客编号、菜品编号等字段。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',3),(2,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',13),(3,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',14),(4,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',28),(5,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',1),(6,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',5),(7,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',11),(8,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',6),(9,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',10),(10,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',12),(11,'oomqF5Nuc9qbpsjJeAFN4C3__xhI',30);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `orderDetailId` int NOT NULL AUTO_INCREMENT COMMENT '订单详情id',
  `dishId` int NOT NULL COMMENT '菜品id',
  `quantity` int NOT NULL COMMENT '菜品数量',
  `shopPrice` int NOT NULL COMMENT '菜品价格',
  `orderId` int NOT NULL,
  PRIMARY KEY (`orderDetailId`),
  KEY `fk_orderdetails_orders_id` (`orderId`),
  CONSTRAINT `fk_orderdetails_orders_id` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='订单菜品表格（OrderDishes）：用于保存订单中包含的所有菜品信息，包括订单编号、菜品编号、菜品数量、菜品价格等字段。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (34,2,1,17,3),(35,4,4,21,3),(36,1,1,20,3),(37,5,2,10,4),(38,3,2,20,4),(39,2,4,17,5),(40,1,1,20,6),(41,4,1,21,6),(42,7,1,20,6),(43,9,1,30,6);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `openid` text NOT NULL COMMENT '用户id',
  `orderTime` datetime NOT NULL COMMENT '创建订单时间',
  `status` int NOT NULL DEFAULT '0' COMMENT '订单状态',
  `totalAmount` float NOT NULL COMMENT '订单总金额',
  `userAddressId` int NOT NULL COMMENT '收货信息id',
  `customerscouponId` int DEFAULT NULL COMMENT '使用的优惠券',
  `createTime` datetime NOT NULL,
  `isComment` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='订单表格（Orders）：用于保存用户提交的订单信息，包括订单编号、顾客编号、下单时间、订单状态、订单总金额等字段。';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,'oomqF5Nuc9qbpsjJeAFN4C3__xhI','2023-04-15 20:00:00',2,114,2,3,'2023-04-15 15:57:00',1),(4,'oomqF5Nuc9qbpsjJeAFN4C3__xhI','2023-04-15 20:00:00',2,55,2,2,'2023-04-15 16:01:00',1),(5,'oomqF5Nuc9qbpsjJeAFN4C3__xhI','2023-04-15 20:00:00',2,63,2,2,'2023-04-15 16:04:00',1),(6,'oomqF5Nuc9qbpsjJeAFN4C3__xhI','2023-04-15 20:00:00',0,85.5,2,3,'2023-04-15 16:06:00',0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `swiper`
--

DROP TABLE IF EXISTS `swiper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `swiper` (
  `swiperId` int NOT NULL AUTO_INCREMENT,
  `swiperUrl` text NOT NULL COMMENT '轮播图url',
  PRIMARY KEY (`swiperId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='轮播图';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `swiper`
--

LOCK TABLES `swiper` WRITE;
/*!40000 ALTER TABLE `swiper` DISABLE KEYS */;
INSERT INTO `swiper` VALUES (1,'http://127.0.0.1:3000/images/swiper/swiper1.jpg'),(2,'http://127.0.0.1:3000/images/swiper/swiper2.jpg'),(3,'http://127.0.0.1:3000/images/swiper/swiper3.jpg'),(4,'http://127.0.0.1:3000/images/swiper/swiper4.jpg'),(5,'http://127.0.0.1:3000/images/swiper/swiper5.jpg');
/*!40000 ALTER TABLE `swiper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraddresses`
--

DROP TABLE IF EXISTS `useraddresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useraddresses` (
  `userAddressId` int NOT NULL AUTO_INCREMENT COMMENT '收货id',
  `openid` text NOT NULL COMMENT '用户id',
  `addressName` varchar(45) NOT NULL COMMENT '收货人姓名',
  `phoneNumber` text NOT NULL COMMENT '收货人手机号',
  `address` varchar(45) NOT NULL COMMENT '收货地区',
  `detailAddress` varchar(100) NOT NULL COMMENT '收货地址详细信息',
  `isDefault` tinyint NOT NULL DEFAULT '0' COMMENT '是否默认地址',
  PRIMARY KEY (`userAddressId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户收货信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraddresses`
--

LOCK TABLES `useraddresses` WRITE;
/*!40000 ALTER TABLE `useraddresses` DISABLE KEYS */;
INSERT INTO `useraddresses` VALUES (1,'oomqF5Nuc9qbpsjJeAFN4C3__xhI','陈育林','18903080478','广东省广州市白云区江高镇','广东技术师范大学',0),(2,'oomqF5Nuc9qbpsjJeAFN4C3__xhI','陈育林','15766126496','广东省揭阳市普宁市梅塘镇社山村','东龙路22号',1);
/*!40000 ALTER TABLE `useraddresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'my_bysj_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-20 22:33:13
