import { OperationType } from "@modules/statements/entities/Statement";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let userUseCase: CreateUserUseCase;


let statementRepositoryInMemory: InMemoryStatementsRepository;
let statementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get Balance", () => {
    
    beforeEach(async () => {
        
        userRepositoryInMemory      = new InMemoryUsersRepository();
        userUseCase                 = new CreateUserUseCase(userRepositoryInMemory);
        statementRepositoryInMemory = new InMemoryStatementsRepository();
        statementUseCase            = new CreateStatementUseCase( userRepositoryInMemory, statementRepositoryInMemory);
        getBalanceUseCase           = new GetBalanceUseCase(statementRepositoryInMemory, userRepositoryInMemory);
    })

    it("Should be able to create a new statement", async () => {
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

        const balance = await getBalanceUseCase.execute({user_id: user.id as string})

        expect(balance.balance).toBe(10.00);

    });  

});