var connection = require("./bamazonDBConnection");
var inquirer = require("inquirer");
const cTable = require('console.table');

var COMMON = require("./common");
var common = new COMMON();

connection.connect(function (err) {

    if (err) throw err;
    //appication start
    console.log(" \n Welcome to BAMAZON-Manager !!! \n");
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
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {

            switch (answer.action) {

                case "View Products for Sale":
                    listavailableProducts();
                    break;
                case "View Low Inventory":
                    listLowInventory();
                    break;
                case "Add to Inventory":
                    addQuantity();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "exit":
                    connection.end();
                    break;
            }

        });
}

function listavailableProducts() {

    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";

    connection.query(query, function (err, res) {

        console.log("\n\t  ITEMS AVAILABLE FOR SALE\n\n");
        var values = [];
        for (var i = 0; i < res.length; i++) {

            values.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);

        }
        console.table(['item_id', 'product_name', 'price', 'Quantity'], values);

    });
    connection.end();

}
function listLowInventory() {


    var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5;";

    connection.query(query, function (err, res) {

        if (res.length > 0) {

            var values = [];
            for (var i = 0; i < res.length; i++) {

                values.push([res[i].item_id, res[i].product_name, res[i].stock_quantity]);

            }
            console.table(['item_id', 'product_name', 'Quantity'], values);

        }
        else
            console.log('\nNo Low Inventory\n');
    });
    connection.end();


}
function addQuantity() {


    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Do you want add more to Inventory:",
                name: "addmoreConfirm",
                default: true
            }
        ])
        .then(function (response) {
            if (response.addmoreConfirm === true) {
                addMore();
            }
            else
                init();
        });
}


function addMore() {


    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter ITEM_ID of the product:",
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
                message: "Enter quantity:",
                name: "qty",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }


            }
        ])
        .then(function (answer) {


            common.getProductById(answer.pid, function (err, data) {

                if (err)
                    console.log("ERROR : ", err);
                else {
                    var updatedStockQuantity = parseInt(data.stock_quantity) + parseInt(answer.qty);
                    if (updatedStockQuantity < 0) updatedStockQuantity = 0;
                    common.updateProductinfo(data.item_id, updatedStockQuantity, data.product_sales, 'manager');

                }
            });

        });

}
function addNewProduct() {

    var availableDepartments = [];

    common.listallDepartments(function (err, data) {

        if (err)
            console.log("ERROR : ", err);
        else {

            for (var i = 0; i < data.length; i++) {

                availableDepartments.push(data[i].department_name);

            }
            inquirer
                .prompt([
                   
                    {
                        message: "Select Department:",
                        name: "deptname",
                        type: "list",
                        choices: availableDepartments
                        
                    },
                    {
                        type: "input",
                        message: "Enter Product Name:",
                        name: "pname"
                    },
                    {
                        type: "input",
                        message: "Enter Price per unit:",
                        name: "price",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    },
                    {
                        type: "input",
                        message: "Enter quantity:",
                        name: "qty",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }

                ])
                .then(function (answer) {

                     common.insertProduct(answer.pname, answer.deptname, answer.price, answer.qty);

                });
        }
    });



}