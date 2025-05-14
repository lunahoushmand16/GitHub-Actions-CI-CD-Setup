import models from '../models/index.js';
import db from '../config/connection.js';
// This function attempts to drop a collection if it already exists
export default async function cleanDB(modelName, collectionName) {
    try {
        const model = models[modelName];
        // Type check for safety
        if (!model?.db?.db) {
            throw new Error(`Model "${modelName}" or its DB connection is not defined.`);
        }
        // Check if the collection exists before trying to drop it
        const collections = await model.db.db.listCollections({
            name: collectionName
        }).toArray();
        if (collections.length) {
            await db.dropCollection(collectionName);
            console.log(`Dropped existing collection: ${collectionName}`);
        }
        else {
            console.log(`No existing collection to drop: ${collectionName}`);
        }
    }
    catch (err) {
        console.error(`Error cleaning DB for ${collectionName}:`, err);
        throw err;
    }
}
// import models from '../models/index.js';
// import db from '../config/connection.js';
// export default async (modelName: "Question", collectionName: string) => {
//   try {
//     let modelExists = await models[modelName].db.db.listCollections({
//       name: collectionName
//     }).toArray()
//     if (modelExists.length) {
//       await db.dropCollection(collectionName);
//     }
//   } catch (err) {
//     throw err;
//   }
// }
