const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });

const Person = mongoose.model('Person', {
    name: {type: String}
});

// Add a person if none exist
async function addPerson() {
    var p = await Person.findOne();
    if (!p)
        await new Person({name: 'Alice'}).save();
    await mongoose.connection.close();
}

addPerson().then(() => console.log('There is a record in the mongodb database named "demo"'));
