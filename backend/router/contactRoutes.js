const express = require("express");
const router = express.Router();

const {
        grtContacts,
        createContacts,
        grtContact,
        updateContact,
        deleteSContact
    } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route('/').get(grtContacts).post(createContacts);
router.route('/:id').get(grtContact).put(updateContact).delete(deleteSContact);




module.exports = router;