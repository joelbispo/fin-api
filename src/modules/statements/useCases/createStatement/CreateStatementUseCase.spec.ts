import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let userUseCase: CreateUserUseCase;

let statementRepositoryInMemory: InMemoryStatementsRepository;
let statementUseCase: CreateStatementUseCase;

describe("Create Statement", () => {
    
    beforeEach(async () => {
        
        userRepositoryInMemory      = new InMemoryUsersRepository();
        userUseCase                 = new CreateUserUseCase(userRepositoryInMemory);
        statementRepositoryInMemory = new InMemoryStatementsRepository();
        statementUseCase            = new CreateStatementUseCase( userRepositoryInMemory, statementRepositoryInMemory);
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

        expect(statement.amount).toBe(10.00);

    });  

});