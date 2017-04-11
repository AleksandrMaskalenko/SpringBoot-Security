# CREATE TABLE app_user (
#   id       INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
#   name VARCHAR(255) NOT NULL,
#   username VARCHAR(255) NOT NULL,
#   password VARCHAR(255) NOT NULL,
#   role VARCHAR(255) NOT NULL
# )
#   ENGINE = InnoDB;
#
# CREATE TABLE song (
#   id   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
#   name VARCHAR(255) NOT NULL,
#   author VARCHAR(255) NOT NULL,
#   duration VARCHAR(255) NOT NULL,
#   date VARCHAR(255) NOT NULL,
#   album VARCHAR(255) NOT NULL,
#   image LONGBLOB
# )
#   ENGINE = InnoDB;
#
#
# INSERT INTO app_user VALUES (1,'John','admin','admin','ADMIN');
#
# INSERT INTO app_user VALUES (2,'Liza','user','user','USER');
#
# INSERT INTO song(id,name,author,duration,date,album)
# VALUES (1,'99 Problems','Jay-Z','4:18','2003', 'The Black Album');
#
# INSERT INTO song(id,name,author,duration,date,album)
# VALUES (2,'Clint Eastwood','Gorillaz','4:29','2001', 'Gorillaz');
#
# INSERT INTO song(id,name,author,duration,date,album)
# VALUES (3,'That''s What I Like','Bruno Mars','3:33','2016', '24K Magic');
#
# INSERT INTO song(id,name,author,duration,date,album)
# VALUES (4,'I''m Not Famous','AJR','3:43','2016', 'What Everyone''s Thinking');
#
# INSERT INTO song(id,name,author,duration,date,album)
# VALUES (5,'“El Chapo”','Skrillex','3:40','2015', 'The Documentary 2.5');