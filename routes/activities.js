const Router = require("express").Router;
const supabase = require("../db/index.js");
const { capitalize } = require("../helpers/index.js");

const router = Router();

router.get("/all", async (req, res) => {
  const { data, error } = await supabase.from("activities").select();
  res.send(data);
});

router.post("/planet", async (req, res) => {
  const { data, error } = await supabase
    .from("activities")
    .select()
    .in("id", req.body.activities);
  res.send(data);
});

router.get("/:name", async (req, res) => {
  const { data, error } = await supabase
    .from("activities")
    .select()
    .eq("activityName", capitalize(req.params.name));
  res.send(data);
});

module.exports = router;
