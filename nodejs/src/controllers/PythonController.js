const axios = require('axios');

module.exports = {
    async inputToPythom(req, res) {
        //const { text } = req.body;
        const id = req.params.id;
        return res.status(200).json({"message": `Teste com id: ${id}`});
    }
}