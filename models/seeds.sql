ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

-- DROP DATABASE IF EXISTS storedb;
-- CREATE DATABASE storedb;

USE storedb;
SHOW TABLES;

-- mock data for users
INSERT INTO users (firstName, lastName, userId, email, phoneNumber, photoUrl, wishList)
VALUES
("A", "A", "AA", "aa@gmail.com", "4164445555", "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png", "[1, 2, 3]"),
("B", "B", "BB", "bb@gmail.com", "4164445555", "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png", "[1, 2, 3]"),
("C", "C", "CC", "cc@gmail.com", "4164445555", "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png", "[1, 2, 3]"),
("D", "D", "DD", "dd@gmail.com", "4164445555", "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png", "[1, 2, 3]"),
("E", "E", "EE", "ee@gmail.com", "4164445555", "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png", "[1, 2, 3]");

-- mock data for messages


-- mock data for categories


-- mock data for products
