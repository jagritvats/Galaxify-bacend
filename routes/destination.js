const Router = require('express').Router;
const supabase = require('../db/index.js');
const { capitalize } = require('../helpers/index.js');

const router = Router();

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

    const {data: places} = await supabase
        .from('places')
        .select()
        .in('id', destination[0].places)

    destination[0].activities = activities
    destination[0].places = places

    res.send(destination[0]);
})


module.exports = router
