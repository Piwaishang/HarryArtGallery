DROP TABLE IF EXISTS `艺术作品`;
CREATE TABLE 艺术作品 (
id INT AUTO_INCREMENT PRIMARY KEY,
作品名称 VARCHAR(255),
类型 VARCHAR(255),
作者 VARCHAR(255),
喜欢 INT,
Comments TEXT);
INSERT INTO `艺术作品` VALUES (0,'Waltz','作曲作品,wav','Xiao Shenghuan','0',',千岛湖夏令营我有膝盖摔伤的经历前作曲作品,piwaishang: 轮滑摔伤的经历，轮滑摔伤没伤口就是不纯洁的,千岛湖摔伤也是经历前');
INSERT INTO `艺术作品` VALUES (1,'Child of me Skateboarding','作曲作品,ogg','Xiao Shenghuan','0','作曲家式看到别人膝盖摔伤: 又想起千岛湖夏令营我有膝盖摔伤的经历？？？小心分享作曲作品《Child of me skateboarding》没人理,piwaishang: 摔伤就能消灾B：看到别人膝盖摔伤而自己仅仅骑车摔倒了,piwaishang: 又想起千岛湖夏令营我有膝盖摔伤的经历？？？小心由高进作曲的《我们不怕》作为电影《🇨🇳👩‍⚕️》在等你');
INSERT INTO `艺术作品` VALUES (2,'Fantasia in F','作曲作品,ogg','Xiao Shenghuan','0',',最新作曲作品,piwaishang: 在千岛湖环湖比赛看到单车手骑车摔倒把膝盖摔伤,作曲家式看到别人膝盖摔伤: 上一个作曲作品是《Child of me Skateboarding》');
INSERT INTO `艺术作品` VALUES (3,'千岛湖夏令营我有膝盖摔伤的经历印象派','美术作品,JPG','千岛湖夏令营老师,Pho.to','0',',千岛湖夏令营我有膝盖摔伤的经历印象派版,piwaishang: 膝盖摔伤的经历艺术,膝盖摔伤的经历艺术');
