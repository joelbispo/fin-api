import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Authenticate User", () => {
    
    beforeEach(async () => {
        
        userRepositoryInMemory      = new InMemoryUsersRepository();
        createUserUseCase           = new CreateUserUseCase(userRepositoryInMemory);
        showUserProfileUseCase      = new ShowUserProfileUseCase(userRepositoryInMemory);
    })

    it("Should be able to show a profile of an existent user", async () => {

        const user = await createUserUseCase.execute({
            name: "tester",
            email: "tester@test.com",
            password: "1234",
        })
        
        const user_profile = await showUserProfileUseCase.execute(user.id);
        console.log( user_profile);

        expect(user_profile).toBeDefined();

    });  

});