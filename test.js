const Immutable = require('immutable');
const state1 = Immutable.Map(const map1 = Immutable.Map({ 
    name: 'Wash',
    ship: {
        name: 'Serenity',
        class: 'Firefly'
    },
    role: 'Pilot',
    favorite_thing: {
        item: "Toy",
        details: {
            type: 'Toy Tyrannosaurus Rex'
        }
    }
});
console.log(state1)

// SOLUTION
// You can do this:
const state2 = state1.set('name', 'Mal')
const state3 = state2.set('role', 'Captain')

// But Immutable also allows you to do this:
const state2 = state1.set('name', 'Mal').set('role', 'Captain')