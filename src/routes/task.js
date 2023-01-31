// const express = require('express');
// const { list, store, detail, updated } = require('../controllers/projectsController');
// const router = express.Router();

// const {  } = require('../controllers/taskController')

// router.get('/colaborator/add', )
// router.delete('/colaborator/removed', )
// router
//     .route('/')
//         .get(list)
//         .post(store)
// router
//     .route('/:id')
//         .get(detail)
//         .put(updated)


// module.exports = router;

const express = require('express');
const router = express.Router();

const { list, store, detail, updated, removed, changeState, } = require('../controllers/taskController')

/* /api/tasks */

router
    .route('/')
        .get(list)
        .post(store)
router
    .route('/:id')
        .get(detail)
        .put(updated)
        .delete(removed)
router
    .post('/change-state/:id', changeState)

module.exports = router;
