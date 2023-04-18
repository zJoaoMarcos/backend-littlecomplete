# App

Lil Complete app.

## FRs (Functional Requirements)

- [x] Should be able create an Department ;
- [x] Should be able list the Departaments;
- [x] Should be able list an unique Departament;
- [x] Should be able update Departaments props;
- [x] Should be able update Equipament department;
- [ ] Should be able list the Equipaments and your Relationship;
- [ ] Should be able listar os Usuários e os seus Equipamentos e Sistemas;
- [ ] Should be able list Systems;
- [ ] Should be able update User Equipment;
- [ ] Should be able update User title;
- [ ] Should be able update User department;

## BRs (Business Rules)

- [x] Should not be able create an Equipment with department not registered;
- [ ] Department should not be created with duplicate user_name;
- [x] Should not be able delete Department;
- [ ] Should not possible create a User with a demission date before admission date;
- [ ] Should not be able delete User;
- [ ] Should not be able create a User with email twice;
- [x] Should not be able delete Equipment;
- [ ] Should not be able create Equipment with id prefix wrong;
- [x] Should not be able create Equipment with name twice;

## NFRs (Non-Functional Requirements)

- [ ] Create Auditory Logs in System;

## TypeOrm

`typeorm-model-generator -h localhost -d db_patriani -u docker -x docker -e postgres -o ./src/infra/repository/typeorm -s public`
