const jsonschema = require('jsonschema');
const csvtojson = require('csvtojson');
const path = require('path');
const Validator = require('jsonschema').Validator;

const csvToJSON = async (csvPath) => csvtojson().fromFile(csvPath)

/**
 * Description - Validator Reducer Fn to validate each document against the schema
 * @param {*} schema
 */
const validateReducerFn = schema => (output, document, index) => {
    const validator = new Validator();
    validator.addSchema(schema);
    const { valid, errors } = validator.validate(document, schema);
    output.result[index] = { valid, errors };
    output.valid = valid;
    return output;
}

/**
 * @param {*} JSON - JSON Input
 * @param {*} config - config which has the validations  {conditions: [{value: '', schema: {}}]}
 * @return {*} 
 */
const validate = (JSON, config) => {
    const { conditions = [] } = config;

    const result = { valid: false, result: {} };
    const validatorSchema = { type: 'object', properties: {} };

    validatorSchema.properties = conditions.reduce((keyToSchemaMapping, condition) => {
        const { value, schema } = condition;
        keyToSchemaMapping[value] = schema;
        return keyToSchemaMapping;
    }, {});

    return JSON.reduce(validateReducerFn(validatorSchema), result);
}

const main = () => {

    const { JSON, conditions } = require('./Assets/config');

    //Call to validate method
    const validatorResult = validate(JSON, { conditions });
    console.log(validatorResult);

    /*
    validatorResult is in the format
    {
        valid: boolean, // if whole JSON is valid or not
        result: {
            [rowNumber]: {
                valid: boolean // row is valid or not
                errors: [] // array of error object if any else empty
            }
        }
    }   

    */
}

main();




