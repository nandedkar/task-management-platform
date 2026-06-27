import {UserRepository} from "./user.repository";

export class UserService {
    private readonly userRepository = new UserRepository();

    async getUserByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }
}