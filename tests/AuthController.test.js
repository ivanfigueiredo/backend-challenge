const app = require('../server');
const { mockReq, mockRes } = require('../src/util/interceptor');
const AuthController = require('../src/Controllers/AuthController');


describe("Testando AuthController", () => {
    test("1 - Testando método userUpdate() por ID válido - OK", async () => {
        let req = mockReq();
        //Adicionar um uuid válido do banco de dados.
        //Exemplo: ;userId=e0587b1f-e07d-4ad0-98c2-c31b21b6ed0c
        req.params = {                        
            userId: ';userId='
        }
        req.body = {
            email: "exemplo@dominio.com"
        }        
        const res = mockRes();

        await AuthController.userUpdate(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("2 - Testando método userUpdate() por ID inválido- Falha", async () => {
        let req = mockReq();
        req.params = {
            userId: ';userId=11012025'
        }
        req.body = {
            email: "exemplo@dominio.com"
        }

        const res = mockRes();

        await AuthController.userUpdate(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });  
    
    test("3 - Testando método info() por ID válido - OK", async () => {
        let req = mockReq();
        //Adicionar um uuid válido do banco de dados.
        //Exemplo: ;userId=e0587b1f-e07d-4ad0-98c2-c31b21b6ed0c
        req.params = {                        
            userId: ';userId='
        }        

        const res = mockRes();

        await AuthController.info(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("4 - Testando método info() por ID válido - OK", async () => {
        let req = mockReq();
        req.params = {                        
            userId: ';userId=110120202'
        }        

        const res = mockRes();

        await AuthController.info(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("5 - Testando método remove() por ID válido - OK", async () => {
        let req = mockReq();
        //Adicionar um uuid válido do banco de dados.
        //Exemplo: ;userId=e0587b1f-e07d-4ad0-98c2-c31b21b6ed0c
        req.params = {                        
            userId: ';userId='
        }        

        const res = mockRes();

        await AuthController.remove(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("6 - Testando método remove() por ID válido - OK", async () => {
        let req = mockReq();
        req.params = {                        
            userId: ';userId=11293988484'
        }        

        const res = mockRes();

        await AuthController.remove(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("7 - Testando método getUsers() - OK", async () => {
        let req = mockReq();
        req.query = {                        
            page: 1,
            perPage: 10 
        }        

        const res = mockRes();

        await AuthController.getUSers(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });
        
});

