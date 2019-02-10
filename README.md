# bamazon

# READ ME Before:

This Bamazon is an Application that accepts the orders from customers and it maintains the inventory by depleting the ordered item from the store's inventory. It keeps track of the product sales across various departments of the store and then provide a summary of the highest-grossing departments in the store.

This App uses the MySQL and Inquirer npm packages for data input and storage.

Following are the different User Views:

### 1) Customer View:

Customer can run the bamazonCustomer.js and the application displays all of the items available, item ID and prices of each products for sale.

Application asks the customer for the ID of the product they would like to buy and then the quantity of needed product.

Customer can place the order for an Item / Multiple items from the list of items available in store and if the store does not have sufficient stock, the customer is notified by a message Insufficient quantity! and the order does not go through.
if the store has sufficient stock, the order is successfully placed and the total cost of their purchase is shown to the customer.

### 2) Manager View: 

Manager can run the bamazonManager.js and will have the below menu options:
View Products for Sale

View Low Inventory

Add to Inventory

Add New Product

If a manager selects View Products for Sale, the App lists every available items currently in stock: the item IDs, names, prices, and quantities.

If a manager selects View Low Inventory, then the App lists all items with an inventory count lower than five.

If a manager selects Add to Inventory, The App Displays a prompt that will let the manager to "add more" of any item currently in the store.

If a manager selects Add New Product, the App allows the manager to add a completely new product to the store.

### 3) Supervisor View: 

Supervisor can run the bamazonSupervisor.js. and has the below menu options:

View Product Sales by Department
Create New Department

When a supervisor selects View Product Sales by Department, the App displays a summarized table in their terminal/bash window listing the Total profit of each Department. (The total_profit column is calculated on the fly as the difference between over_head_costs and product_sales and total_profit uses a custom alias and is not stored in any database)
Supervisor can also Add a New Department to the store.

Please see the below link to the Test Results.