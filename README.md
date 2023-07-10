# App

Lil Complete app.

## FRs (Functional Requirements)

- [x] Should be able create an Department ;
- [x] Should be able list the Departaments;
- [x] Should be able list an unique Departament;
- [x] Should be able update Departament props;
- [x] Should be able update Department of Equipment;
- [x] Should be able list the Equipaments and your Owner;
- [x] Should be able list Users and your Equipaments e Systems;
- [ ] Should be able list Systems;
- [x] Should be able update title of User;
- [x] Should be able update Department of User;
- [x] Should be able remove Equipment of User;
- [x] Should be able remove assignment of Equipment;
- [x] Should be able remove all assignments of User;

## BRs (Business Rules)

- [x] Should not be able create an Equipment with Department not registered;
- [x] Should not be able create an new User with Department not registered;
- [x] Should not be able create an new User with duplicate user_name;
- [x] Should not be able create an new User with duplicate smtp (email);
- [x] Should not be able delete Department;
- [ ] Should not possible create a User with a demission date before admission date;
- [x] Should not be able delete User;
- [x] Should not be able delete Equipment;
- [x] Should not be able create Equipment with name twice;

## NFRs (Non-Functional Requirements)

- [ ] Create Auditory Logs in System;

## TypeOrm

`typeorm-model-generator -h localhost -d dev -u docker -x docker -e postgres -o ./ -s public`
