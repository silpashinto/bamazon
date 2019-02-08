drop database if exists bamazon ;
create database bamazon ;

USE bamazon;

drop table if exists products;
create table products(item_id integer(11)  auto_increment not null,
product_name varchar(100) not null,
department_name varchar(100) not null,
price  DECIMAL(11,4) not NULL,
stock_quantity integer(11) not null,
product_sales DECIMAL(11,4) NULL,
primary key(item_id)
);

insert into products(product_name,department_name,price,stock_quantity) 
value('Digital Slow Cooker','Appliances',49.99,400,1300),
('Electric Griddle','Appliances',59.99,500,1200),
('Food Processor','Appliances',99.34,350,1000),
('Waffle Maker','Appliances',19.84,450,1000);
insert into products(product_name,department_name,price,stock_quantity) 
value('Microwave Oven','Appliances',77.97,300),
('Refrigerator','Appliances',1799,40);

select * from products where stock_quantity >0;
select * from products;

drop table if exists departments;
create table departments(department_id integer(11)  auto_increment not null,
department_name varchar(100) not null,
over_head_costs DECIMAL(11,4) not NULL,
primary key(department_id)
);

insert into departments(department_name,over_head_costs) value('Appliances',10000);
select * from departments;
