const supabase = require("../db/index.js")
const {capitalize} = require("../helpers/index.js")
const router = require("express").Router();



router.get('/all', async (req, res) => {

    const {data: destinations, error} = await supabase
        .from('destinations')
        .select("*")

    res.send(destinations);
})

router.get('/:name', async (req, res) => {

    const {data: destination, error} = await supabase
        .from('destinations')
        .select()
        .eq("name", capitalize(req.params.name))

    if(error){
        res.send({error: error})
    }
    
    const {data: activities} = await supabase
        .from('activities')
        .select()
        .in('id', destination[0].activities)

    if(!!destination[0].places){
        const {data: places} = await supabase
            .from('places')
            .select()
            .in('id', destination[0].places)
        
        destination[0].places = places
    }

    destination[0].activities = activities

    res.send(destination[0]);
})


module.exports = router
