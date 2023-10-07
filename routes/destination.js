const supabase = require("../db/index.js")
const {capitalize} = require("../helpers/index.js")
const router = require("express").Router();


router.get('/all', async (req, res) => {

    const {data, error} = await supabase
        .from('destinations')
        .select()
    res.send(data);
})

router.get('/:name', async (req, res) => {

    const {data, error} = await supabase
        .from('destinations')
        .select()
        .eq("name", capitalize(req.params.name))
    res.send(data);
})


module.exports = router
