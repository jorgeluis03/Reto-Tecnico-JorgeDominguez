const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addUser = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { nombre, apellido, profesion } = JSON.parse(event.body);
    const createAt = new Date();
    const id = v4();

    const newUser = {
        id,
        nombre,
        apellido,
        profesion,
        createAt
    };

    try {
        await dynamodb.put({
            TableName: 'usersTable',
            Item: newUser
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(newUser)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};

module.exports = {
    addUser,
};
