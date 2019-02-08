var connection = require("./bamazonDBConnection");
var COMMON = function () {


    //Function to get details of a product by id
    this.getProductById = function (ProductId, callback) {

        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: ProductId }, function (err, result) {
            if (err)
                callback(err, null);
            else {
                if (result[0])
                    callback(null, result[0]);
                else {
                    console.log('\t SORRY !!! Invalid Item');
                    connection.end();
                }

            }

        });

    };
    //Function to update the DB
    this.updateProductinfo = function (itemId, updatedStockQuantity, productsales, user) {

        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: updatedStockQuantity,
                    product_sales: productsales
                },
                {
                    item_id: itemId
                }
            ],
            function (err, res) {

                if (user === 'customer')
                    console.log('\n THANK YOU!!! Succefully placed your order.\n--------------------------\n');
                else if (user === 'manager')
                    console.log('\n THANK YOU!!! Succefully Updated the Inventory.\n--------------------------\n');


            }
        );
        connection.end();

    };
    //Function to insert new record to product table

    this.insertProduct = function (product_name, department_name, price, stock_quantity) {

        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: product_name,
                department_name: department_name,
                price: price,
                stock_quantity: stock_quantity
            },
            function (err, res) {

                console.log('\n THANK YOU!!! Product Added To The Inventory.\n--------------------------\n');

            });

        connection.end();
    };


    this.listallDepartments = function (callback) {

        var query = "SELECT department_name FROM departments";        

        connection.query(query, function (err, result) {
            if (err)
                callback(err, null);
            else               
                callback(null, result);             
                

        });
    }
}

module.exports = COMMON;
