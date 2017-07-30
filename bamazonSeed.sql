DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon ;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("To Catch a Mockingbird", "Books", 10, 50), 
("Macbook Pro", "Electronics, Computers, & Office", 1500, 300), 
("Yeezys" , "Clothing, Shoes, & Jewelry", 350, 0),
("DAMN.", "Movies, Music, & Games", 15, 1000),
("Amazon Fire Stick", "Fire TV", 40, 400),
("Amazon Echo", "Echo & Alexa", 180 , 2000),
("Starship Troopers", "Movies, Music, & Games", 20, 225),
("Longboard", "Sports & Outdoors", 80, 710);
("", "Krewella", "Dance", ";asdjkfa");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Human", "Krewella", "Dance", ";asdjkfa");
