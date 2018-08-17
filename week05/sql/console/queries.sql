.print
.print ------------------
.print Query the database
.print ------------------


-----------------------------------------
.print
.print Who are all the people in the database?
.print

select *
  from Person;

-----------------------------------------
.print
.print Who is in New South Wales?
.print

select Person.*
  from Person, Location
 where Person.city = Location.city
   and Location.state = 'New South Wales';

-----------------------------------------
.print
.print Where is Dave?
.print

select city
  from Person
 where name = 'Dave';

 -----------------------------------------
.print
.print How many people in Queensland?
.print

select count(*)
  from Person, Location
 where Person.city = Location.city
   and Location.state = 'Queensland';
