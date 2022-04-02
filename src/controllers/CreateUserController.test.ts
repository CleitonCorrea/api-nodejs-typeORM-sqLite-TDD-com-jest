import { Request } from 'express';
import { getConnection } from 'typeorm';
import createConnection from '../database';
import { makeMockResponse } from '../utils/mocks/mockResponse';
import { CreateUserController } from './CreateUserController';

describe('CreateUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.query('DELETE FROM usuarios')
        await connection.close()
    })

    const createUserController = new CreateUserController();

    const response = makeMockResponse()
    it('Deve retornar status 201 quando o usuário for criado', async()=>{
        const request = {
            body: {
                nome: 'Algum usuário',
                email: 'email@email.com'
            }
        } as Request

        await createUserController.handle(request, response)

        expect(response.state.status).toBe(201)
    })

    it('O retorno será 400 caso o NOME não seja informado', async() => {
        const request = {
            body: {
                nome: '',
                email: 'email@email.com'
            }
        } as Request

        await createUserController.handle(request, response)

        expect(response.state.status).toBe(400)
    })

    it('O retorno será 400 caso o EMAIL não seja informado', async() => {
        const request = {
            body: {
                nome: 'Algum usuário',
                email: ''
            }
        } as Request

        await createUserController.handle(request, response)

        expect(response.state.status).toBe(201)
    })
    
})
