const Archetype = require('../models/archetype')

const archetypes_index = async (req, res) => {

    let uniqArchetypes = await Archetype.distinct("archetype")

    let archetypes = await Archetype.find().sort({ archetype: 1 })

    let orderedArch = []
    for (let i = 0; i < uniqArchetypes.length; i++) {
        orderedArch[i] = []

        archetypes.forEach(arc => {
            if (arc.archetype === uniqArchetypes[i]) {

                orderedArch[i].push(arc)
            }
        })
    }

    res.render('./archetypes/archetypes', 
    { orderedArch: orderedArch, archetypes: uniqArchetypes, title: 'Archetypes', user: req.user })

}

const archetype_create = async (req, res) => {

    let uniqArchetypes = await Archetype.distinct("archetype")

    res.render('./archetypes/create-archetype', 
    { archetypes: uniqArchetypes, title: 'Create Archetype', user: req.user})

}

const archetype_post = (req, res) => {
    const archetype = new Archetype(req.body)

    archetype.save()
        .then(result => res.redirect(`/archetypes/${archetype.archetype}`))
        .catch(err => console.log(err))
}


const archetypes_archetype = async (req, res) => {
    const paramArc = req.params.arc

    let requestedArc = await Archetype.find({ archetype: paramArc }).sort({ createdAt: -1 })
    let uniqArchetypes = await Archetype.distinct("archetype")

    if (requestedArc == 0) {
        res.redirect('/404')
    } else {
        res.render('./archetypes/archetype', 
        { reqArchetype: requestedArc, archetypes: uniqArchetypes, title: paramArc, user: req.user })
    }
}

module.exports = {
    archetypes_index,
    archetype_create,
    archetype_post,
    archetypes_archetype
}