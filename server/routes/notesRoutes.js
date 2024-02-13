const router = require("express").Router()

router.get('notes', (req,res) => {
  res.redirect('/notes')
})


module.exports = router