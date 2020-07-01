const express = require('express')
const router = express.Router()

const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

// Aquí los endpoints

router.get('/', (req, res) => {

    Coaster.find()
        .populate('park')
        .then(allCoasters => res.render('coasters/coasters-index', { allCoasters }))
        .catch(err => console.log("Error in BBDD", err))
}
)


router.get('/new', (req, res) => {

    Park.find()
        .then(allParks => res.render("coasters/new-coaster", { allParks }))
        .catch(err => console.log("Error in BBDD", err))
})


router.post('/new', (req, res) => {
    const { name, description, length, inversions, active } = req.body

    Coaster.create({ name, description, length, inversions, active })
        .then(newCoaster => {
            console.log("New coaster created", newCoaster)
            res.redirect("/")
        })
        .catch(err => console.log("Error creating new coaster", err))

})





router.get('/:id', (req, res) => {
    Coaster.findById(req.params.id)
        .populate('park')
        .then(oneCoaster => res.render('coasters/coaster-details', oneCoaster))
        .catch(err => console.log('Error while showing coaster', err))
})


router.post('/:id/delete', (req, res) => {

    Coaster
        .findByIdAndRemove(req.params.id)
        .then(res.redirect('/'))
        .catch(err => console.log("Error while deleting coaster", err))
})





router.get('/:id/edit', (req, res) => {
    const coasterId = Coaster.findById(req.params.id)
    const allParks = Park.find()

    Promise.all([coasterId, allParks])
        .then(coasters => {
            res.render('coasters/edit-coaster', { coaster: coasters[0], park: coasters[1] })
        })
        .catch(err => console.log("Error en la BBDD", err))
})




router.post('/:id', (req, res) => {
    const { name, description, length, inversions, active } = req.body

    Coaster
        .findByIdAndUpdate(req.params.id, { name, description, length, inversions, active }, { new: true })
        .then(() => res.redirect("/")
            .catch(err => console.log("Error editing coaster", err)))

})



module.exports = router