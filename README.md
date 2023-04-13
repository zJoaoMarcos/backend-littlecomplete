# App

Lil Complete app.

## RFs (Requisitos funcionais)

- [x] Should be able create an Department ;
- [x] Should be able list the Departaments;
- [x] Should be able list an unique Departament;
- [x] Should be able update Departaments props;
- [ ] Should be able list the Equipaments and your Relationship;
- [ ] Should be able listar os Usuários e os seus Equipamentos e Sistemas;
- [ ] Should be able list Systems;
- [ ] Should be able update User Equipment;
- [ ] Should be able update User title;
- [ ] Should be able update User department;
- [ ] Should be able update Equipament department;

## RNs (Regras de Negócios)

- [x] should not possible create a User with a demission date before admission date
- [x] Department should not be created with duplicate user_name;
- [x] o departamento não deve ser excluido
- [ ] O usuário não deve ser cadastrado como o email duplicado;
- [ ] O usuário não deve ser excluido;
- [ ] O equipamento não deve ser excluido;
- [ ] O equipamento não deve ser cadastrado com o id duplicado;

## RNFs (Requisitos não funcionais)

- [ ] Criar Logs de Auditoria no Sistema;

## TypeOrm

`typeorm-model-generator -h localhost -d db_patriani -u docker -x docker -e postgres -o ./src/infra/repository/typeorm -s public`
