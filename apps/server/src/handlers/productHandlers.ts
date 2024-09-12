import { Request, Response } from 'express';
import { PrismaClient, Variant, Collection} from '@repo/db';

const prisma = new PrismaClient();

interface ProductRequestBody {
  name: string;
  price: number;
  image: string;
  description: string;
  variants?: Variant[];
  collections?: Collection[];
}

// Getting all Products
export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
        collections: true,
      },
    });
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching products' });
  }
};

// Getting a product by his ID
export const getProductById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        variants: true,
        collections: true,
      },
    });
    if (product) {
      return res.json({ product });
    } else {
      return res.status(404).json({ error: 'Product Not Found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching product' });
  }
};


// Create new Products
export const createProduct = async (req: Request<{}, {}, ProductRequestBody>, res: Response): Promise<Response> => {
  const { name, price, image, description, variants = [], collections = [] } = req.body;
  try {
    const collectionConnections = await Promise.all(
      collections.map(async (collection) => {
        if (collection.id) {
          return { id: collection.id };
        } else {
          const newCollection = await prisma.collection.create({
            data: {
              name: collection.name,
              description: collection.description,
            },
          });
          return { id: newCollection.id };
        }
      })
    );
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        image,
        description,
        variants: {
          create: variants.map((variant) => ({
            capacity: variant.capacity,
            color: variant.color,
            price: variant.price,
          })),
        },
        collections: {
          connect: collectionConnections,
        },
      },
    });

    return res.status(201).json({ message: 'Product created successfully', newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
};

// Update a product 
export const updateProduct = async (req: Request<{ id: string }, {}, ProductRequestBody>, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name, price, image, description, variants, collections } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        image,
        description,
        variants: variants
          ? {
              upsert: variants.map((variant) => ({
                where: { id: variant.id || 0 },
                update: {
                  capacity: variant.capacity,
                  color: variant.color,
                  price: variant.price,
                },
                create: {
                  capacity: variant.capacity,
                  color: variant.color,
                  price: variant.price,
                },
              })),
            }
          : undefined,
        collections: collections
          ? {
              set: collections.map((collection) => ({
                id: collection.id,
              })),
            }
          : undefined,
      },
    });

    return res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'An error occurred while updating the product.' });
  }
};


// Delete a Product by his ID
export const deleteProduct = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    // getting the product by his ID if the ID does not exist it will give us an error
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.variant.deleteMany({
      where: { productId: Number(id) },
    });

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
};