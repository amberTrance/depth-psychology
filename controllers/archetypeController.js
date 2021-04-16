const Archetype = require('../models/archetype')

// Takes in the result of Archetype Query and returns an array containing
// the unique archetypes (not repeated)
function uniqueArc(result) {
    let array = []

    result.forEach(arc => {
        array.push(arc.archetype)
    })

    let uniqArchetypes = [...new Set(array)]
    
    return uniqArchetypes
}

const archetypes_index = (req, res) => {
    Archetype.find().sort({ archetype: 1 })
        .then(result => {

            let uniqArchetypes = uniqueArc(result)

            let orderedArch = []
            for (let i = 0; i < uniqArchetypes.length; i++) {
                orderedArch[i] = []

                result.forEach(arc => {
                    if (arc.archetype === uniqArchetypes[i]) {

                        orderedArch[i].push(arc)
                    }
                })
            }

            res.render('./archetypes/archetypes', { orderedArch: orderedArch, archetypes: uniqArchetypes, title: 'Archetypes' })
        })
        .catch(err => console.log(err))
}

const archetype_create = (req, res) => {
    Archetype.find().sort({ archetype: 1 })
        .then(result => {
            let uniqArchetypes = uniqueArc(result)

            res.render('./archetypes/create-archetype', { archetypes: uniqArchetypes, title: 'Create Archetype'})
        })
        .catch(err => console.log(err))
}

const archetype_post = (req, res) => {
    const archetype = new Archetype(req.body)

    archetype.save()
        .then(result => res.redirect(`/archetypes/${archetype.archetype}`))
        .catch(err => console.log(err))
}


const archetypes_archetype = (req, res) => {
    const paramArc = req.params.arc

    Archetype.find().sort({ archetype: 1 })
        .then(result => {
            let uniqArchetypes = uniqueArc(result)

            let requestedArc = result.filter(item => item.archetype == paramArc)

            res.render('./archetypes/archetype', { reqArchetype: requestedArc, archetypes: uniqArchetypes, title: paramArc })
        })
        .catch(err => console.log(err))
}


module.exports = {
    archetypes_index,
    archetype_create,
    archetype_post,
    archetypes_archetype
}