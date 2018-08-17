.print
.print ----------------------
.print Create database tables
.print ----------------------
.echo on

create table Person(
    name text primary key, 
    age numeric, 
    city text
);

create table Location(
    city text primary key, 
    state text
);
