const express = require('express')
const router = express.Router()
const archController = require('../controllers/archetypeController')
const { ensureAuthenticated } = require('../config/auth')

router.get('/archetypes', archController.archetypes_index)
router.get('/archetype/create', ensureAuthenticated, archController.archetype_create)
router.post('/archetypes', archController.archetype_post)
router.get('/archetypes/:arc', archController.archetypes_archetype)

module.exports = router
