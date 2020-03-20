const questData = require('./questData.json')
const gems = require('./gems.json')
const vendorData = require('./vendorRewards.json')

const questActiveGems = [];
const questSupportGems = [];

let gemFlavourList = collectGemFlavourData()
getGemRewards(questData)

function getGemRewards(data) {
    let unknowntype = 0
    for (i in data) {
        let currency = ""
        if (i[1] === 1) {
            currency = "Transmute"
        } else if (i[1] === 2) {
            currency = "Alteration"
        } else {
            currency = "Chance"
        }
        Object.values(data[i].rewards).forEach((reward) => {
            if (reward.type == "Active Skill Gem") {
                setAndPushGemData(questActiveGems, reward, "Active Skill Gem", currency)
            } else if (reward.type == "Support Skill Gem") {
                setAndPushGemData(questSupportGems, reward, "Support Skill Gem", currency)
            } else { unknowntype++ }
        })
    }
    console.log(`created ${questActiveGems.length} active gems and ${questSupportGems.length} support gems`)
    console.log(`there were a total of ${unknowntype} rewards of unkown type`)
    console.log(questActiveGems[0])
}



// Object.values(vendorData).forEach((obj) => {
//     Object.values(obj).forEach((act) => {
//         Object.values(act).forEach((reward) => { console.log(reward.name) })
//     })
// });


function setAndPushGemData(list, gem, type, currency) {
    let obj = { type: type, cost: currency }

    obj.name = gem.name
    obj.classReward = gem.classes

    let flav = getFlavaData(obj.name)
    obj.flav = flav.flavour
    list.push(obj)
}

function getFlavaData(name) {
    for (i in gemFlavourList) {
        if (gemFlavourList[i].name === name) {
            return gemFlavourList[i]
        }
    }
    console.log("couldn't find flava")
}

function collectGemFlavourData() {
    let gemFlavourList = []
    for (gem in gems) {
        let thisGem = {}
        if (gems[gem].tags) {
            thisGem.name = gems[gem].base_item.display_name;
            tags = gems[gem].tags
            if (tags.includes('active_skill')) {
                thisGem.type = 'active'
            } if (tags.includes('support')) {
                thisGem.type = 'support'
            } if (tags.includes('strength')) {
                thisGem.flavour = 'strength'
            } if (tags.includes('dexterity')) {
                thisGem.flavour = 'dexterity'
            } if (tags.includes('intelligence')) {
                thisGem.flavour = 'intelligence'
            }
            gemFlavourList.push(thisGem)
        }
    }
    console.log(`Calculated the flavour of ${gemFlavourList.length} gems`)
    return gemFlavourList
}

module.exports = {
    activeList: function getActives() {
        return questActiveGems
    },
    supportList: function getSupports() {
        return questSupportGems
    },
}