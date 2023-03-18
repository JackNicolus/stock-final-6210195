import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://jnclxi:Jackjack88@jnclxi.o6zhxa0.mongodb.net/stock"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)

    if (req.method === 'GET') {
        const docs = await Product.find()
        res.status(200).json(docs)
    } 
    
    else if (req.method === 'POST') {
        const doc = await Product.create(req.body)
        res.status(201).json(doc)
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
    const productSchema = new Schema({
        id: String,
        code: String,
        name: String,
        price: Number
    })

    const Product = models?.product || model('product', productSchema);
    //if NextJS already uses mongoose and it is already defined, skip the new model creation (models?.Product) = check
    //otherwise, create a new model (model('product', productSchema))