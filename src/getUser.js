
const AWS = require('aws-sdk');

const getUser = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();


    try {
        const result = await dynamodb.scan({
            TableName: 'usersTable'
        }).promise()

        //la resupuesta es un tipo Item
        const users = result.Items


        return {
            statusCode: 200,
            body: JSON.stringify(users)
        };

        

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Errorr" })
        };
    }

    
};

module.exports = {
    getUser,
};
