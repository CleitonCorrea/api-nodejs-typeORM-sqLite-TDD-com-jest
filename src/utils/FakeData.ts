import { v4 as uuid } from 'uuid';
import { CreateUserService } from '../services/CreateUserService';

class FakeData{
    createUserService = new CreateUserService();

    async execute(){
        await this.createUserService.execute({
            id: uuid(),
            nome: 'Cleiton Correa',
            email: 'cleitoncorreadeveloper@gmail.com',
        })
    }

    async createUser(){
        const user = await this.createUserService.execute({
            id: uuid(),
            nome: 'Cleiton Correa',
            email: 'cleitoncorreadeveloper@gmail.com',
        })

        return user
    }
}

export { FakeData };

