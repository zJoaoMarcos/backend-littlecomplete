# App

Lil Complete app.

## RFs (Requisitos funcionais)

- [x] Should be able create an Department ;
- [x] Deve ser possivel listar os Departamentos;
- [x] Deve ser possivel listar um único Departamento;
- [x] Deve ser possivel alterar propiedades do Departamento;
- [ ] Deve ser possivel listar os Usuários e os seus Equipamentos e Sistemas;
- [ ] Deve ser possivel listar Equipamentos e os seus relacionamentos se existirem;
- [ ] Deve ser possivel listar os Sistemas;
- [ ] Deve ser possivel alterar Equipamento do Usúario;
- [ ] Deve ser possivel alterar cargo do Usuário;
- [ ] Deve ser possivel alterar Usuários de setor;
- [ ] Deve ser possivel alterar Equipamento de setor;

## RNs (Regras de Negócios)

- [x] should not possible create a User with a demission date before admission date
- [ ] Department should not be created with duplicate user_name;
- [ ] o departamento não deve ser excluido
- [ ] O usuário não deve ser cadastrado como o email duplicado;
- [ ] O usuário não deve ser excluido;
- [ ] O equipamento não deve ser excluido;
- [ ] O equipamento não deve ser cadastrado com o id duplicado;

## RNFs (Requisitos não funcionais)

- [ ] Criar Logs de Auditoria no Sistema;
