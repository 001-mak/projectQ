import type * as TestFunctions from "./sum"

const {sum} = jest.requireActual<typeof TestFunctions> ("./sum.ts")

const successCases = [
    {
        id:0,
        input: {a:1,b:2},
        output: 3
    },
    {
        id:1,
        input: {a:1,b:1},
        output: 2
    },
]

describe("test", ()=>{
    it.each(successCases)("success case $id", (input:any, output)=>{
        const {a ,b} = input;

        expect(sum(a,b)).toBe(output)
    })

})