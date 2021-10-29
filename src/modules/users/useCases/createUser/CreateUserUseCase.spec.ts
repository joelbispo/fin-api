import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let userUseCase: CreateUserUseCase;

describe("Create User", () => {
    
    beforeEach(async () => {
        
        userRepositoryInMemory      = new InMemoryUsersRepository();
        userUseCase                 = new CreateUserUseCase(userRepositoryInMemory);
    })

    it("Should be able to create a new user", async () => {
        const user = await userUseCase.execute({
            name: "tester",
            email: "tester@test.com",
            password: "1234",
        })

        expect(user).toHaveProperty("id");

    });  

});