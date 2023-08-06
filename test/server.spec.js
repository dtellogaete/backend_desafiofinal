const request = require("supertest");
const server = require("../index");

describe("TEST", () => {
  
    it("GET para obtener productos del usuario con id = 1", async () => {
    const userId = "1";

    const response = await request(server).get(`/products/users/${userId}`).send();
    const status = response.statusCode;
    const productos = response.body;
    const cantidadProductos = productos.length;

    expect(status).toBe(200);
    expect(productos).toBeInstanceOf(Array);
    expect(cantidadProductos).toBeGreaterThanOrEqual(0);
    });

    it("Eliminar un producto con un id que no existe", async () => {
        const jwt = "token";
        const id = "uno";
        const response = await request(server).delete(`/products/${id}`).set("Authorization", jwt).send();
        expect(response.statusCode).toBe(500);
    });

    it('POST nuevo usuario', async () => {
        const nuevoUsuario = {
            name: 'Nuevo',
            lastname: 'Usuario',
            email: 'nuevo@gmail.com',
            rut: '12345678-9',
            address: 'Calle 123',
            city: 'Santiago',
            region: 'Metropolitana',
            password: 'password123',
            telephone: '987654321',
            role: 'Persona'
        };

        const response = await request(server)
            .post('/users')
            .send(nuevoUsuario);
        console.log(response.body)

        expect(response.body.message).toBe('Usuario creado exitosamente');
        expect(response.body.result.rowCount).toBe(1); 
    });

    it("PUT con id incorrecto", async () => {
        const id = "dos";
        const actUser = {id_users: `${id}`, name: "Jose", lastname:"lopez", email:"jose@example.com", rut:25987654-3, address:"alameda 2020", city:"santiago", region:"metropolitana de santiago", password:"20202020", telephone:123456789, role:"Persona"};
        const response = await request(server).put("/users").send(actUser);
        const status = response.statusCode;
        expect(status).toBe(500);
    });

});
