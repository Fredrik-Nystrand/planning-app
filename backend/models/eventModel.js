const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: 'string',
        required: true,
    },
    desc: {
      type: 'string',
      required: true,
    },
    dateTime: {
      type: 'string',
      required: true,
    },
    color: {
      type: 'string',
      default: '#2bcb5e'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)