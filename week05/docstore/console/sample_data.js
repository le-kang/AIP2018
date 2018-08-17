db = new Mongo().getDB('demo');

db.people.drop();
db.people.createIndex({name: 1});

print('Inserting people');
db.people.insert({name: 'Alice', age: 34, location: ['Sydney', 'New South Wales']});
db.people.insert({name: 'Bob', age: 23, location: ['Bondi', 'New South Wales']});
db.people.insert({name: 'Carol', age: 41, location: ['Brisbane', 'Queensland']});
db.people.insert({name: 'Dave', age: 30, location: ['Cairns', 'Queensland']});
