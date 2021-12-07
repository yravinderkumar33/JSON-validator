module.exports = {
    JSON: [
        {name: 'one', age: 22},
        {name: 'two', age: 31},
        {name: 'three', age: '100'}
    ],
    conditions: [
        {
            value: 'name',
            schema: {
                type: 'string'
            }
        },
        {
            value: 'age',
            schema: {
                type: 'number',
                minimum: 18,
                maximum: 100
            }
        }
    ]
}