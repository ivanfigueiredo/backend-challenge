const { mockReq, mockRes } = require('../src/util/interceptor');
const Auth = require('../src/middlewares/auth');

describe("Testando AuthController", () => {
    test("1 - Testando Middleware com chave correta - OK", async () => {
        const API_KEY = '1101202526';
        let req = mockReq();
        req.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${API_KEY}` 
        }

        const res = mockRes();

        await Auth.private(req, res)
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("2 - Testando Middleware com chave vazia ", async () => {        
        let req = mockReq();
        req.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':  ''
        }

        const res = mockRes();

        await Auth.private(req, res)
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("3 - Testando Middleware com Authorization invalido ", async () => {        
        let req = mockReq();
        req.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':  '33344555667'
        }

        const res = mockRes();

        await Auth.private(req, res)
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });

    test("4 - Testando Middleware sem Authorization ", async () => {        
        let req = mockReq();
        req.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'            
        }

        const res = mockRes();

        await Auth.private(req, res)
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });
});