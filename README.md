# bamazon

Pre-requisite:
- Navigate to repo location and run npm install

For this application, the user runs the program by nagivating to the file location.

![alt command line showing node app typed](https://raw.githubusercontent.com/pcfilicetti/bamazon/master/bamazonPics/bam1.PNG)

After the user runs the application, the 10 items will be loaded in and logged to the console, directly followed by an inquirer prompt to enter the ID of the item they wish to purchase.

![alt command prompt displaying 10 items and prompt](https://raw.githubusercontent.com/pcfilicetti/bamazon/master/bamazonPics/bam2.PNG)

Upon selecting a *VALID* item ID, the user is prompted to enter the amount of units of the product they wish to purchase.
If the requested amount of the product is less than the current stock quantity of the product, the order quantity is deducted from the stock quantity, and the user is charged the price of the product multiplied by the order quantity.
The remaining quantity of the product and the amount due are logged to the console, and the database connection comes to a close.

![alt successful order example](https://raw.githubusercontent.com/pcfilicetti/bamazon/master/bamazonPics/bam3.PNG)

Otherwise, the user will receive a logged message that the stock for that product is insufficient, but they can check again "on Thursday after a restock."

![alt unsuccessful order example](https://raw.githubusercontent.com/pcfilicetti/bamazon/master/bamazonPics/bam4.PNG)

Here is an image that shows the current stock of the products in the dummy-data database:

![alt image of database in MySQL Workbench](https://raw.githubusercontent.com/pcfilicetti/bamazon/master/bamazonPics/bam5.PNG)
