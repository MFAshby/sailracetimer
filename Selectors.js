import { createSelector } from 'reselect'
import { Person, Boat, BoatClass, Race, RaceEntry} from './DataObjects'
import { addPerson, addBoat, addBoatClass, addRace } from './Actions'
const racesSelector = (state) => state.races

const racesListSelector = createSelector(
    racesSelector, 
    (races) => Object.values(races)
)

const racesCountSelector = createSelector(
    racesSelector,
    (races) => Object.keys(races).length
)


const selectedRaceIdSelector = (state) => state.selectedRaceId

const selectedRaceSelector = createSelector(
    [selectedRaceIdSelector, racesSelector],
    (raceId, races) => races[raceId]
)

const peopleSelector = (state) => state.people

const peopleCountSelector = createSelector(
    peopleSelector,
    (people) => Object.keys(people).length
)

const peopleListSelector = createSelector(
    peopleSelector,
    (people) => Object.values(people)
)

const boatsSelector = (state) => state.boats

const boatsCountSelector = createSelector(
    boatsSelector,
    (boats) => Object.keys(boats).length
)

const boatsListSelector = createSelector(
    boatsSelector,
    (boats) => Object.values(boats)
)

const boatClassesSelector = (state) => state.boatClasses

const boatClassesCountSelector = createSelector(
    boatClassesSelector,
    (boatClasses) => Object.keys(boatClasses).length
)

const boatClassesListSelector = createSelector(
    boatClassesSelector,
    (boatClasses) => Object.values(boatClasses)
)

const helmSearchSelector = (state) => state.newRace.helmSearch

const helmFilteredPeopleSelector = createSelector(
    [helmSearchSelector, peopleListSelector],
    (helmSearch, people) => {
        return helmSearch.length > 0 ? 
            people.filter((person) => person.name.toLowerCase().startsWith(helmSearch.toLowerCase()))
            : [] 
    }
)

const boatSearchSelector = (state) => state.newRace.boatSearch

const boatsFilteredSelector = createSelector(
    [boatSearchSelector, boatsListSelector],
    (boatSearch, boats) => {
        return boatSearch.length > 0 ? 
            boats.filter((boat) => boat.sailNumber.startsWith(boatSearch))
            : [] 
    }
)

const boatClassesSearchSelector = (state) => state.boatClassSearch

const boatClassesFilteredSelector = createSelector(
    [boatClassesSearchSelector, boatClassesListSelector],
    (search, classes) => {
        return search.length > 0 ? 
            classes.filter(bClass => bClass.name.toLowerCase().includes(search.toLowerCase()))
            : []
    }
)

export {
    racesSelector,
    racesCountSelector,
    racesListSelector,
    peopleCountSelector,
    peopleListSelector,
    boatsListSelector,
    boatsCountSelector,
    boatClassesSelector,
    boatClassesCountSelector,
    boatClassesListSelector,
    helmFilteredPeopleSelector,
    boatsFilteredSelector,
    boatClassesFilteredSelector,
    selectedRaceSelector,
}