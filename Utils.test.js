import { listToObjectById } from './Utils'

test('List to objects by id', () => {
    let o1 = {
        id: "12345",
        a: "b"
    }
    let o2 = {
        id: "64864",
        c: "d"
    }
    let lst = [ o1, o2 ]
    let obj = listToObjectById(lst)
    expect(obj).toEqual({
        "12345": o1,
        "64864": o2,
    })
})