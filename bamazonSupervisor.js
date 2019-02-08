var connection = require("./bamazonDBConnection");
var inquirer = require("inquirer");
const cTable = require('console.table');

var COMMON = require("./common");
var common = new COMMON();
connection.connect(function (err) {

    if (err) throw err;
    //appication start
    console.log(" \n Welcome to BAMAZON-SuperVisor !!! \n");
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
                "View Product Sales by Department",
                "Create New Department",
                "exit"
            ]
        })
        .then(function (answer) {

            switch (answer.action) {

                case "View Product Sales by Department":
                    viewProductsale();
                    break;
                case "Create New Department":
                    createNewDept();
                    break;
                case "exit":
                    connection.end();
                    break;
            }

        });
}

function viewProductsale() {

    var query = 'SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) as product_sales,d.over_head_costs - SUM(p.product_sales) as total_profit from departments d JOIN products p WHERE d.department_name = p.department_name GROUP BY p.department_name';

    connection.query(query, function (err, res) {

        if (res.length > 0) {
            
            var values = [];
            for (var i = 0; i < res.length; i++) {

                values.push([
                    res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit
                ]);
            }
            console.table(['department_id', 'department_name', 'over_head_costs','product_sales','total_profit'], values);
         }
        else
            console.log('\n Nothig to ShoW!!! \n');
    });

    connection.end();
}
function createNewDept() {
    connection.end();
}