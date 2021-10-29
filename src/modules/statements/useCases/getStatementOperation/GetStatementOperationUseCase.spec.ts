import { OperationType } from "@modules/statements/entities/Statement";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let userUseCase: CreateUserUseCase;


let statementRepositoryInMemory: InMemoryStatementsRepository;
let statementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get Statement Operation", () => {
    
    beforeEach(async () => {
          
        userRepositoryInMemory           = new InMemoryUsersRepository();
        userUseCase                      = new CreateUserUseCase(userRepositoryInMemory);
        statementRepositoryInMemory      = new InMemoryStatementsRepository();
        statementUseCase                 = new CreateStatementUseCase( userRepositoryInMemory, statementRepositoryInMemory);
        getStatementOperationUseCase     = new GetStatementOperationUseCase(userRepositoryInMemory, statementRepositoryInMemory);
    })

    it("Should be able to get Statement Operation", async () => {
        const user = await userUseCase.execute({
            name: "tester",
            email: "tester@test.com",
            password: "1234",
        })



        const statement = await statementUseCase.execute({
            user_id: user.id as string,
            type: OperationType.DEPOSIT,
            amount: 10.00, 
            description: "first deposit"
        })

        const statementOperation = await getStatementOperationUseCase.execute({user_id: user.id as string,
                                                                    statement_id: statement.id as string})

        expect(statementOperation.id).toBe(statement.id);

    });  

});