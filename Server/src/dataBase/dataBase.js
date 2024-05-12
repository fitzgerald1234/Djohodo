import {MongoClient} from "mongodb";

export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }
  //let mongoClient = await connectToCluster('mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority');

export async function getAllUser()
{
   const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
   let mongoClient;
   let users;
   try {
       mongoClient = await connectToCluster(uri);
       const db = mongoClient.db('AREA');
       const collection = db.collection('USERS');
       users = await collection.find({}).toArray();
   } finally {
       await mongoClient.close();
   }
   return users;
}

 export async function getAllAreaOfUser(id)
 {
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, area;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('AREAS');
        area = await collection.find({user: id}).toArray();
    } finally {
        await mongoClient.close();
    }
    return area;
 }

 export async function getAllArea()
 {
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, area;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('AREAS');
        area = await collection.find({}).toArray();
    } finally {
        await mongoClient.close();
    }
    return area;
 }

export async function addUserInBase(Username, passWord, email) {
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, insert;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('USERS');
        const User = {
            username: Username,
            password: passWord,
            mail: email
        };
        insert = await collection.insertOne(User);
        //console.log(await findDataInCollectionWithName(collection, 'noGbev'));
    } finally {
        await mongoClient.close();
    }
    return insert.insertedId;
 }

 export async function addUser(collection, Username, passWord, email) {
    const User = {
        username: Username,
        password: passWord,
        mail: email
    };
    await collection.insertOne(User);
 }

 export async function updateData(collection, name, updating)
{
   await collection.updateOne(
    {name},
    {$set: updating}
   );
}

export async function putElemInBase(id, updating)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('USERS');
        await collection.updateOne(
            {_id: id},
            {$set: updating}
           );
    } finally {
        await mongoClient.close();
    }
}

export async function deleteUserInBase(Username)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('USERS');
        await collection.deleteOne({username: Username});
    } finally {
        await mongoClient.close();
    }
}

 export async function findUserWithNameandEmail(Username, email)
 {
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;
    let user;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('USERS');
        user = await collection.find({username: Username, mail: email}).toArray();
    } finally {
        await mongoClient.close();
    }
    return user;
 }

export async function findUserWithName(Username)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;
    let user;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('USERS');
        user = await collection.find({username: Username}).toArray();
    } finally {
        await mongoClient.close();
    }
    return user;
}

export async function findUserWithiD(id)
 {
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;
    let user;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('USERS');
        user = await collection.find({_id: id}).toArray();
    } finally {
        await mongoClient.close();
    }
    return user;
}
 
export async function createAction(actionName, Params)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, obj;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('ACTIONS');
        const Action = {
            name: actionName,
            params: Params,
        };
        obj =  await collection.insertOne(Action);
    } finally {
        await mongoClient.close();
    }
    return obj.insertedId;
}



export async function findActionWithid(actionId)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, action;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('ACTIONS');
        action = await collection.find({_id: actionId}).toArray();
    } finally {
        await mongoClient.close();
    }
    return action
}

export async function findReactionWithid(reactionId)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, reaction;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('REACTIONS');
        reaction = await collection.find({_id: reactionId}).toArray();
    } finally {
        await mongoClient.close();
    }
    return reaction;
}


 export async function createReaction(reactionName, Params)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, obj;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('REACTIONS');
        const Reaction = {
            name: reactionName,
            params: Params,
        };
        obj = await collection.insertOne(Reaction);
    } finally {
        await mongoClient.close();
    }
    return obj.insertedId;
 }

 export async function createArea(areaName, actions, reactions, userId)
 {
     const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
     let mongoClient;
 
     try {
         mongoClient = await connectToCluster(uri);
         const db = mongoClient.db('AREA');
         const collection = db.collection('AREAS');
         const area = {
             name: areaName,
             action: actions,
             reaction: reactions,
             status: true,
             user: userId
         };
         await collection.insertOne(area);
     } finally {
         await mongoClient.close();
     }
}

export async function findAreaWithName(areaName)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient, area;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('AREAS');
        area = await collection.find({name: areaName}).toArray();
    } finally {
        await mongoClient.close();
    }
    return area;
}

export async function changeAreaStatus(areaname, updating)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('AREAS');
        await collection.updateOne(
            {name: areaname},
            {$set: {status: updating}});
    } finally {
        await mongoClient.close();
    }
}


export async function getAreaWithName(areaname)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;
    let area;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('USERS');
        area = await collection.find({name: areaname}).toArray();
    } finally {
        await mongoClient.close();
    }
    return area;
}

export async function deleteAreaWithName(Areaname)
{
    const uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AREA');
        const collection = db.collection('AREAS');
        await collection.deleteOne({name: Areaname});
    } finally {
        await mongoClient.close();
    }
}
 