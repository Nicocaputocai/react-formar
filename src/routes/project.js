const express = require('express');
const router = express.Router();

const { list, store, detail, updated, removed, addColaborator, removedColarator } = require('../controllers/projectsController')

router.get('/colaborator/add', addColaborator)
router.delete('/colaborator/removed', removedColarator)
router
    .route('/')
        .get(list)
        .post(store)
router
    .route('/:id')
        .get(detail)
        .put(updated)
        .delete(removed)


module.exports = router;