var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  displayTable();
  buyItem();

});

function displayTable() {
  var query = "SELECT * FROM products";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].item_id + "|| Product Name: " + res[i].product_name + "|| Department Name: " + res[i].department_name + "|| Price: " + res[i].price + "|| Stock Quantity: " + res[i].stock_quantity);
          console.log("----------------------------")
        }
      });
}

function buyItem() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Which product would would you like to buy?"
        },
        {
          name: "count",
          type: "input",
          message: "How many would you like?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if there are enough units
        if (chosenItem.stock_quantity > parseInt(answer.count)) {
          var newQuantity = chosenItem.stock_quantity - (parseInt(answer.count));

          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order placed!");
              displayTable();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("We don't have enough for your order...");
          displayTable();
        }
      });
  });
}
