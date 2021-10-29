import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
    
    beforeEach(async () => {
        
        userRepositoryInMemory      = new InMemoryUsersRepository();
        authenticateUserUseCase     = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase           = new CreateUserUseCase(userRepositoryInMemory);
    })

    it("Should be able to authenticate an existent user", async () => {

        const user = await createUserUseCase.execute({
            name: "tester",
            email: "tester@test.com",
            password: "1234",
        })
        
        const token = await authenticateUserUseCase.execute({
            email: "tester@test.com",
            password: "1234",
        })

        expect(token).toBeDefined();

    });  

});