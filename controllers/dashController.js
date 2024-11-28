import Dash from "../models/Dashboard"
const update = async (req, res) => {
    const { number } = req.body;

    try {
        const updatedCard = await Dash.save(number
        );
        res.json(updatedCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};