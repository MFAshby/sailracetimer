import DefaultClasses from './DefaultClasses'
import bClassStore from './BoatClassesStore'
import boatStore from './BoatsStore'
import peopleStore from './PeopleStore'
import raceStore from './RacesStore'

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

if (__DEV__) {
    // Pre-populate it with the defaults eh
    DefaultClasses.forEach(obj => bClassStore.newBoatClass(obj))

    let laserClass = bClassStore.boatClasses.find(it => it.name === "LASER")
    let soloClass = bClassStore.boatClasses.find(it => it.name === "SOLO")
    let topperClass = bClassStore.boatClasses.find(it => it.name === "TOPPER")
    let optimistClass = bClassStore.boatClasses.find(it => it.name === "OPTIMIST")

    let laser = boatStore.newBoat({sailNumber: "12345", boatClass: laserClass})
    let solo = boatStore.newBoat({sailNumber: "56789", boatClass: soloClass})
    let topper = boatStore.newBoat({sailNumber: "67891", boatClass: topperClass})
    let optimist = boatStore.newBoat({sailNumber: "23456", boatClass: optimistClass}) 

    let martin = peopleStore.newPerson({name: "Martin"})
    let georgia = peopleStore.newPerson({name: "Georgia"})
    let henry = peopleStore.newPerson({name: "Henry"})
    let dino = peopleStore.newPerson({name: "Dino"})

    let race = raceStore.newRace()
    
    let e1 = race.newEntry({helm: martin, boat: laser})
    let e2 = race.newEntry({helm: georgia, boat: solo})
    let e3 = race.newEntry({helm: henry, boat: topper})
    let e4 = race.newEntry({helm: dino, boat: optimist})

    race.start = new Date(2018, 2, 19, 10, 0)
    e1.addLap(new Date(2018, 2, 19, 10, 15, 0))
    e2.addLap(new Date(2018, 2, 19, 10, 15, 0))
    e3.addLap(new Date(2018, 2, 19, 10, 15, 0))
    e4.addLap(new Date(2018, 2, 19, 10, 15, 0))
    e1.finish = new Date(2018, 2, 19, 10, 30, 29)
    e2.finish = new Date(2018, 2, 19, 10, 30, 22)
    e3.finish = new Date(2018, 2, 19, 10, 30, 24)
    e4.finish = new Date(2018, 2, 19, 10, 30, 26)


    // Simlate a larger race
    let race2 = raceStore.newRace()
    let bearCrew = ["Freya","Hen bun","Giraffey","Little bear","Hen bee","Bea bee","Elmer","Daniel"]
    bearCrew.forEach(bear => {
        let person = peopleStore.newPerson({name: bear})
        let boat = boatStore.newBoat({sailNumber: `${getRandomInt(150000)}`, boatClass: optimistClass})
        race2.newEntry({helm: person, boat: boat})
    })
}