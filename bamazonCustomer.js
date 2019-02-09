// Load the NPM Package inquirer
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = require("./bamazonDBConnection");
var COMMON = require("./common");
var common = new COMMON();

connection.connect(function (err) {

    if (err) throw err;
    //appication start
    console.log(" \n Welcome to BAMAZON !!! \n");
    init();
});

//initial function
function init() {

    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "List Bamazon Items",
                "exit"
            ]
        })
        .then(function (answer) {

            switch (answer.action) {
                case "List Bamazon Items":
                    listAllProducts();
                    break;

                case "exit":
                    connection.end();
                    break;
            }

        });
}

//Function to get a list of all products from table 
function listAllProducts() {


    var query = "SELECT item_id, product_name, price FROM products  WHERE stock_quantity >0;";

    connection.query(query, function (err, res) {

        console.log("\n\t  ITEMS AVAILABLE FOR SALE\n\n");

        var values = [];
        for (var i = 0; i < res.length; i++) {

            values.push([res[i].item_id, res[i].product_name, res[i].price]);

        }
        console.table(['item_id', 'product_name', 'price'], values);

        //prompting user to place an order    
        inquirer
            .prompt([
                {
                    type: "confirm",
                    message: "Would you like to place an order?:",
                    name: "placeOrder",
                    default: true
                }
            ])
            .then(function (response) {
                if (response.placeOrder === true) {
                    //Function call to place an order
                    customerAction();
                }
                else
                    init();
            });

    });

}

//Function to create an order
function customerAction() {

    //user prompt for item and quatity
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter ITEM_ID of the product to buy:",
                name: "pid",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            },
            {
                type: "input",
                message: "Enter number of units:",
                name: "units",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }


            }
        ])
        .then(function (answer) {
            //confirm the order
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        message: "Confirm your order:",
                        name: "confirmOrder",
                        default: true
                    }
                ])
                .then(function (response) {
                    if (response.confirmOrder === true) {

                        //Function call to place the order
                        placeTheOrder(answer.pid, answer.units);


                    } else {
                        init();

                    }

                });

        });
}



//Function to place an order
function placeTheOrder(itemId, units) {

    common.getProductById(itemId, function (err, data) {

        if (err)
            console.log("ERROR : ", err);
        else {
            //checking for availability
            if (data.stock_quantity >= units) {

                var updatedStockQuantity = parseInt(data.stock_quantity) - parseInt(units);
                var toatalPrice = data.price * units;
                var productSales = data.product_sales + toatalPrice;


                var orderDetails = "\nPlacing your order....\n\n Order Details \n--------------------------\n "
                    + data.product_name + '\n Quantity: ' + units + '\n Total Price: $' + toatalPrice;
                console.log(orderDetails);

                //Function call to update the DB
                common.updateProductinfo(itemId, updatedStockQuantity, productSales, 'customer');
            }
            else {
                console.log("Insufficient quantity!\n");
                init();
            }
        }

    });
}

