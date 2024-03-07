const YAML = require('yamljs');
const fs = require('fs');

module.exports.handler = async (event, context) => {
  const swaggerDocument = YAML.parse(fs.readFileSync('./swagger_doc.yaml', 'utf8'));
  
  return {
    statusCode: 200,
    body: JSON.stringify(swaggerDocument),
  };
};
