const express = require('express');
const gemData = require('./dataParser.js')

// req will be
// linkSets = [
//     {
//         id: 1,
//         linkCount: 6,
//         gems: [1,2,3,4,5,6],

//     },
//     {
//         id: 2, 
//         linkCount: 4,
//         gems: [7,3,4]
//     }
// ],
// weaponType: axe,
// startingMan: 'Shadow'

app.get('/gemData', (req, res) => {
    let data = {
        actives: gemData.activeList,
        supports: gemData.supportList
    }
    res.json(data)
});

app.get('/plan', (req, res) => {

    linkSets = [{ id: 1, linkCount: 6, }]
    actData = {
        act1: {
            questChoices: [],
            linksRequired: ["1g2b", "3g1b"],
            additionalCurrency: [],
            AvailableWeapons: "Siege Axes"
        }
    }
    let data = {}
    res.json(data)
});
const port = 1234
app.listen(port, () => console.log(`listening on port ${port}`));