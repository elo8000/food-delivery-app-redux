const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST || "host.docker.internal",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DATABASE || "test",
    ssl: Boolean(process.env.POSTGRES_SSL),
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
  res.send(await knex("shops").select("id", "name", "lat", "lng"));
});
app.get("/shop/:id/items", async (req, res) => {
  res.send(
    await knex
      .from("shop_items")
      .select("id", "name", "price")
      .where("shop_id", req.params.id)
  );
});
app.post("/checkout", async (req, res) => {
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const order = { user_id: req.body.userId, timestamp: timestamp };
  console.log(order);
  const orderId = (await knex.insert(order, ["id"]).into("orders"))[0].id;
  const orderItems = req.body.items.map((item) => {
    return {
      count: item.count,
      shop_item_id: item.id,
      order_id: orderId,
      price: item.price,
    };
  });
  for (const item of orderItems) {
    const serverPrice = (
      await knex
        .from("shop_items")
        .select("price")
        .where("id", item.shop_item_id)
    )[0].price;
    if (serverPrice !== item.price) {
      throw "User attempting to buy an item listed for a different price than on a server";
    }
  }
  await knex.insert(orderItems).into("order_items");
  res.status(200).send();
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port 3000`);
});
