let jsondata = '[{"name" : ["skila", "scylla"], "data" : "rate1 \nrate 2\nrate 3"}, {"name" : ["fdn"], "data" : "raet fdn nih"}]';
let rate = JSON.parse(jsondata);

function getRate(name) {
    rate.map((i) => {
        if (i.name.includes(name))
            console.log(i.data)
    });

    // return rate[name];
}

getRate("fdn");