import getStreamer from 'js/twitchApiRequsts/getStreamer';

let filterDeadChannels = (channels) => {
    let onlyUndead = [];
    channels.map(channel => {
        if (
            channel.name !== undefined 
            && channel.logo !== undefined 
            && channel.id !== undefined
            && channel.followers !== undefined 
            ) {
            onlyUndead.push(channel);
        }
        return null
    })
    return onlyUndead
};

//заменить на запрос из БД
let list = [{name: "RIKKIDI", id: "46947742"}, {name: "y0nd", id: "32536070"}, {name: "pashadizel", id: "63813769"}, {name: "MissAlina23", id: "148602448"}, {name: "finargot", id: "44442348"}, {name: "ybicanoooobov", id: "68950614"}, {name: "Stray228", id: "40488774"}, {name: "qSnake", id: "71558231"}, {name: "Insize", id: "136398715"}, {name: "GENSYXA", id: "81623587"}, {name: "Denly", id: "118970121"}, {name: "buster", id: "86277097"}, {name: "steel", id: "195675197"}, {name: "rxnexus", id: "32184566"}, {name: "Dmitry_Lixxx", id: "188890121"}, {name: "GN_GG", id: "95793204"}, {name: "A1taOda", id: "51435464"}, {name: "NekrPain", id: "40974672"}, {name: "modestal", id: "112619759"}, {name: "AIMLUL", id: "63828424"}, {name: "TaeRss", id: "36948149"}, {name: "CeMka", id: "118263259"}, {name: "Spt083", id: "116780430"}, {name: "XBOCT", id: "39176452"}, {name: "TpaBoMaH", id: "265940345"}, {name: "egorkreed", id: "451634552"}, {name: "ksun41k", id: "68147611"}, {name: "GeneraL_HS_", id: "62651386"}, {name: "follentass", id: "230768385"}, {name: "SOSEDATEL", id: "218598381"}]

let getList = () => (
    new Promise ((resolve, reject) => (
        Promise.all(
            list.map(channel => (getStreamer(channel.id)))
        )
        .then(allChannels => filterDeadChannels(allChannels))
        .then(onlyLiveChannels => resolve(onlyLiveChannels))        
    ))
    .catch(err => console.log(err))
);

export default getList;