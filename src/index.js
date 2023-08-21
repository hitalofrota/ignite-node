const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

//Meu middleware
function verifyIfExistAccountCPF( request, response, next ){
    const { cpf } = request.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({ error: "Customer not found" });
    }

    request.customer = customer;

    return next();
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if(customerAlreadyExists){
        return response.status(400).json({ error: "Customer already exists!"});
    }

    customers.push({
        cpf,
        name, 
        id:  uuidv4(), 
        statement: [], 
    })

    return response.status(201).send();
})

//isso vai fazer com que todas as minhas rotas abaixo usem o middleware
//app.use(verifyIfExistAccountCPF)

//esse verifyIfExistAccountCPF vai deixar somente essa rota com o middleware ativo
app.get("/statement", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request;
    
    return response.json(customer.statement);
})

//essa rota vai precisar ter no body, description e amount
//também vai ter que passar pelo middleware para validar se aquele usuário possui conta
app.post('/deposit', verifyIfExistAccountCPF, (request, response) => {
    const { description, amount } = request.body

    const { customer } = request;

    const statementOperation = {
        description, 
        amount, 
        created_at: new Date(), 
        type: "credit"
    }

    //não entendi muito bem essa parada de statement para enviar o push
    customer.statement.push(statementOperation)

    return response.status(201).send();
})

app.listen(3333);

