db = new Mongo().getDB('demo');

print('Who are all the people in the database?');
result = db.people.find();

while (result.hasNext())
    printjson(result.next());


print('Who is in New South Wales?');
result = db.people.find({location: 'New South Wales'});

while (result.hasNext())
    printjson(result.next());


print('Where is Dave?');
result = db.people.findOne({name: 'Dave'});
print(result.location);

print('How many people in Queensland?');
result = db.people.count({location: 'Queensland'});
print(result);
