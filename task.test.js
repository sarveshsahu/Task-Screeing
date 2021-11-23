const { scheduling } = require('./task')
test("Should return []", () => {
    const result =  scheduling([], [])
        expect(result).toStrictEqual([])
})
test("Should return [ 'a', 'b' ]", () => {
    const result =  scheduling(['a','b'], [])
        expect(result).toStrictEqual([ 'a', 'b' ])
})
test("Should return [ 'b', 'a' ]", () => {
    const result =  scheduling(['a','b'], ['a => b'])
        expect(result).toStrictEqual([ 'b', 'a' ])
})
test("Should return [ 'b', 'a','d', 'c'  ]", () => {
    const result =  scheduling(['a','b','c','d'], ['a => b','c => d'])
        expect(result).toStrictEqual([ 'b', 'a','d', 'c'  ])
})
test("Should return [ 'c', 'b','a']", () => {
    const result =  scheduling(['a','b','c'], ['a => b','b => c'])
        expect(result).toStrictEqual([ 'c', 'b','a'])
})
test("Should return Error - this is a cyclic dependency", () => {
    expect(() => {
        scheduling(['a','b','c','d'], ['a => b','b => c','c => a'])
      }).toThrow('Error - this is a cyclic dependency');
})