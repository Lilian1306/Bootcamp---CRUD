import request from 'supertest';
import express  from 'express';
import productRoutes from './productRoutes'

const app = express();
app.use(express.json());
app.use('/api', productRoutes);

describe('products routes', () => {
    test('Should get all the products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
    } )

});

describe('POST /api/products', () => {
    test('should create new product', async () => {
        const response = await request(app).post('/api/products').send({
            name: 'Samsung',
            price: 300,
            image: 'url',
            description: 'skaoeang'
        })

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('newProduct');
        expect(response.body.newProduct).toHaveProperty('id');
        expect(response.body.newProduct).toHaveProperty('name', 'Samsung');
        expect(response.body.newProduct).toHaveProperty('price', 300);
        expect(response.body.newProduct).toHaveProperty('image', 'url');
        expect(response.body.newProduct).toHaveProperty('description', 'skaoeang');
    })
    
    describe('PUT /api/products/:id', () => {
        test('should update a product', async () => {
    
            const productId = 37; 
    
            const response = await request(app).put(`/api/products/${productId}`).send({
                name: 'Updated Samsung',
                price: 350,
                image: 'url',
                description: 'updated description'
            });
    
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('updatedProduct');
            expect(response.body.updatedProduct).toHaveProperty('id', productId);
            expect(response.body.updatedProduct).toHaveProperty('name', 'Updated Samsung');
            expect(response.body.updatedProduct).toHaveProperty('price', 350);
            expect(response.body.updatedProduct).toHaveProperty('image', 'url');
            expect(response.body.updatedProduct).toHaveProperty('description', 'updated description');
        });
    });


}); 



