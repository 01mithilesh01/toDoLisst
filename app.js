const bodyParser = require("body-parser");

const express = require("express");

const mongoose = require("mongoose");

const app = express();

// for using ejs and it will search list.ejs in views folder.
app.set("view engine", "ejs"); 


// connecting mongoose to mongodb
mongoose.connect("mongodb+srv://admin-mithilesh:YY3s9yzkfiUr7uC3@cluster0.054ls.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = { 
    name : String,
    date : String
};
var Item;
// var Item = mongoose.model("Item", itemsSchema);
// Item = mongoose.model("Itttems", itemsSchema);
// Model like above is created in app.post("/") line no. 45





// We will append the each element in this array which the user want to add.
var items = ["Buy food", "Cook Food", "Eat Food"];
var workItems = [];

// it is used to entertain the post request.
app.use(bodyParser.urlencoded({extended: true}));

// it used when we want to use CSS and JAVASRIPT folders which are stored in public folder.
app.use(express.static("public"));



app.get("/", function(req, res){
    res.render("username");
});

app.post("/", function(req, res){
    Item = mongoose.model("Item", itemsSchema);
    var addusername = req.body.usersUserName;
    Item = mongoose.model(addusername, itemsSchema);
    console.log(typeof(username));
    
    res.redirect("/addNewItem");
});




// it is used to showcase the list.ejs to the user .ie the home page.
var dateInFormat;
app.get("/addNewItem", function(req, res){

    // below fews lines are used to print the day, data, month on the list.ejs
    var today = new Date();
    var currentDay = today.getDay();
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };
    dateInFormat = today.toLocaleDateString("en-US", options); 


    Item.find({}, function(err, foundItems){
        res.render("toDoList", {listTitle : dateInFormat, newListItem:foundItems}); // toDoList 
    });


    

    // use to showcase the list.ejs page to the user. a dictionary is send to the list.ejs. So, the elements
    // of dictionary can be used in list.ejs
    


});



// When the user fills the form of list.ejs 
app.post("/addNewItem", function(req, res){
    // newItem contains the data which the user inputed and itemName is added to the array.
    var itemName = req.body.newItem;
    if(itemName!=="")
    {
        const item = new Item({
            name : itemName,
            date : dateInFormat
        });
    item.save();
    }
    
    res.redirect("/addNewItem");
});




app.post("/delete", function(req, res){
    const itemID = req.body.itemWantToDelete;
    Item.findByIdAndRemove(itemID, function(err){
        if (!err)
        {
            console.log("Succesfully deleted");
        }
        // redirecting to "/" so that after the checkbox is cicked the webpage show refresh and show the existing items
        res.redirect("/addNewItem");
    })
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function(){
    console.log("Server started successfully");
});










// YY3s9yzkfiUr7uC3