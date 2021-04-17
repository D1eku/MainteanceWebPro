create table usuario(
    email text primary key,
    password text  not null
);

insert into usuario(email, password) values('dieku@gmail.com','1234');


select * from usuario where email='dieku@gmail.com' and password='1234'

