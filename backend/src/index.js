const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "host.docker.internal",
    port: 3306,
    user: "root",
    password: "password",
    database: "test",
  },
  log: {
    warn(message) {
      console.log(message);
    },
    error(message) {
      console.log(message);
    },
    deprecate(message) {
      console.log(message);
    },
    debug(message) {
      console.log(message);
    },
  },
  debug: true,
});

const express = require("express");
const bodyParser = require("body-parser");
cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/shops", async (req, res) => {
  res.send(await knex("shops"));
});
app.get("/shopNames", async (req, res) => {
  res.send(await knex("shops").select("id", "name"));
});
app.get("/shop/:id/items", async (req, res) => {
  res.send(
    await knex
      .from("shop_items")
      .select("id", "name")
      .where("shop_id", req.params.id)
  );
});
app.post("/checkout", async (req, res) => {
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const order = { user_id: req.body.userId, timestamp: timestamp };
  const orderId = await knex.insert(order, ["id"]).into("orders");
  const orderItems = req.body.items.map((item) => {
    return {
      count: item.count,
      shop_item_id: item.id,
      order_id: orderId,
    };
  });
  await knex.insert(orderItems).into("order_items");
  res.status(200).send();
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
