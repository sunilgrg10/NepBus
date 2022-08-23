const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51D9ybxG1hGhZmBxsXKTXZ2VMP721dPDl4O1rd3FDyj7X0A9Ffhc3NFt4MhRob20DahnErmtteUwrvY4x9QnSNVx100IXgNpFlI"
); // add a stripe key, (this test key will expire on 18th march 2021)

mongoose.pluralize(null);
app.use(express.json());
app.use(cors());
const busRoutes = require("./routes/bus");
const bookingRoutes = require("./routes/booking");
const customerRoutes = require("./routes/customer");
const routeRoutes = require("./routes/route");

app.post("/v1/api/stripe-payments", async (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempontencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
        },
        { idempontencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});

app.use(busRoutes);
app.use(bookingRoutes);
app.use(customerRoutes);
app.use(routeRoutes);
const bookingHireRoutes = require("./routes/bookinghire");
app.use(bookingHireRoutes);

const busServiceRoutes = require("./routes/busservice");
app.use(busServiceRoutes);

const connect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://sunil:sunil@pawsclaws.8e4pm.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDb Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const port = process.env.PORT || 3020;
const start = async () => {
  await connect();
  app.listen(port, console.log("Server running"));
};
start();
