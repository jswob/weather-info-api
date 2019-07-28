const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localizationSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Localization = mongoose.model("Localization", localizationSchema);

module.exports = Localization;