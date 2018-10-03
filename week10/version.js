const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });

const Person = mongoose.model('Person', {
    name: {type: String}
});

var person = null;
Person.findOne().then((p) => { person = p; })

function get() {
	return person;
}

module.exports = { Person, get };
