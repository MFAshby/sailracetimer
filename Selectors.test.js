import { peopleCountSelector, 
    racesCountSelector, 
    boatClassesCountSelector, 
    boatsCountSelector, 
    boatClassesListSelector,
    helmFilteredPeopleSelector,
    boatsFilteredSelector,
    boatClassesFilteredSelector } from './Selectors'
import { Person, Race, Boat, BoatClass } from './DataObjects'

import { putInObjectByID } from './Utils'

const zeroBoatClasses = { boatClasses: {} }
const oneBoatClass = {
    boatClasses: {
        "486453": new BoatClass({})
    }
}

const twoBoatClasses = {
    boatClasses: {
        "486453": new BoatClass({}),
        "4864634": new BoatClass({})
    }
}

test('countSelectors', () => {
    expect(peopleCountSelector({people: {}}))
        .toBe(0)

    expect(peopleCountSelector({people: { "12345": new Person({}) }}))
        .toBe(1)

    expect(peopleCountSelector({people: { 
        "12345": new Person({}),
        "456486": new Person({}) 
    }})).toBe(2)

    expect(racesCountSelector({races: {}})).toBe(0)
    
    expect(racesCountSelector({races: {
        "12345": new Race({})
    }})).toBe(1)

    expect(racesCountSelector({races: {
        "12345": new Race({}),
        "64864": new Race({})
    }})).toBe(2)

    expect(boatsCountSelector({boats: {}})).toBe(0)

    expect(boatsCountSelector({boats: {
        "486453": new Boat({})
    }})).toBe(1)

    expect(boatsCountSelector({boats: {
        "486453": new Boat({}),
        "4864634": new Boat({})
    }})).toBe(2)

    expect(boatClassesCountSelector(zeroBoatClasses)).toBe(0)

    expect(boatClassesCountSelector(oneBoatClass)).toBe(1)

    expect(boatClassesCountSelector(twoBoatClasses)).toBe(2)
})

test('list selectors', () => {
    expect(boatClassesListSelector(zeroBoatClasses)).toBeInstanceOf(Array)
    expect(boatClassesListSelector(zeroBoatClasses).length).toBe(0)
    expect(boatClassesListSelector(oneBoatClass).length).toEqual(1)
    expect(boatClassesListSelector(twoBoatClasses).length).toEqual(2)
})

test('helm & boat filter selectors', () => {
    let p1 = new Person({name: "Martin"})
    expect(helmFilteredPeopleSelector({
        people: putInObjectByID(p1),
        newRace: {
            helmSearch: "Ma",
        }
    })).toEqual([p1])

    expect(helmFilteredPeopleSelector({
        people: putInObjectByID(p1),
        newRace: {
            helmSearch: "",
        }
    })).toEqual([])

    expect(helmFilteredPeopleSelector({
        people: putInObjectByID(p1),
        newRace: {
            helmSearch: "Bo",
        }
    })).toEqual([])

    expect(helmFilteredPeopleSelector({
        people: putInObjectByID(p1),
        newRace: {
            helmSearch: "ma",
        }
    })).toEqual([p1])


    let b1 = new Boat({sailNumber: "12345"})
    expect(boatsFilteredSelector({
        boats: putInObjectByID(b1),
        newRace: {
            boatSearch: "12"
        }
    })).toEqual([b1])

    expect(boatsFilteredSelector({
        boats: putInObjectByID(b1),
        newRace: {
            boatSearch: "23"
        }
    })).toEqual([])

    expect(boatsFilteredSelector({
        boats: putInObjectByID(b1),
        newRace: {
            boatSearch: ""
        }
    })).toEqual([])
})

test('boat classes search selector', () => {
    let bc1  = new BoatClass({name: "Laser Radial"})
    
    expect(boatClassesFilteredSelector({
        boatClassSearch: "Laser",
        boatClasses: putInObjectByID(bc1)
    })).toEqual([bc1])

    expect(boatClassesFilteredSelector({
        boatClassSearch: "radial",
        boatClasses: putInObjectByID(bc1)
    })).toEqual([bc1])

    expect(boatClassesFilteredSelector({
        boatClassSearch: "Laser",
        boatClasses: {}
    })).toEqual([])

    expect(boatClassesFilteredSelector({
        boatClassSearch: "Topper",
        boatClasses: putInObjectByID(bc1)
    })).toEqual([])
})