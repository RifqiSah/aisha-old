/* eslint-disable array-callback-return */
const { readFileSync } = require('fs');

function loadData(file) {
    const rawdata = readFileSync(`./data/${file}`);
    return JSON.parse(rawdata);
}

const dndrop = loadData('dndrop.json');
const dnhp = loadData('dnhp.json');
const dninfo = loadData('dninfo.json');
const dnrate = loadData('dnrate.json');

module.exports = {
    getDate: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),

    getAllowedRoles: (roleid) => {
        const allowedroles = ['668660316036530216', '668680264096022550', '676221506346549251'];
        return allowedroles.includes(roleid);
    },

    getServerIP: (name) => {
        const serverIp = [
            { name: 'NA', ip: '211.43.155.163', port: 14300 },
            { name: 'KO', ip: '211.233.18.72', port: 14300 },
            { name: 'SEA', ip: '202.14.200.67', port: 14301 },
        ];

        return serverIp.find((x) => x.name === name);
    },

    formatData: (name) => {
        let fmt;

        switch (name) {
        case 'dndrop':
            fmt = dndrop.map((item) => '> '.concat(item.name.join(', '))).join('\n');
            break;

        case 'dnhp':
            fmt = dnhp.map((item) => '> '.concat(item.name.join(', '))).join('\n');
            break;

        case 'dninfo':
            fmt = dninfo.map((item) => '> '.concat(item.name.join(', '))).join('\n');
            break;

        case 'dnrate':
            fmt = dnrate.map((item) => '> '.concat(item.name.join(', '))).join('\n');
            break;

        default:
            return null;
        }

        return fmt;
    },

    // Data
    getDNDropData: (name) => {
        const itemData = [];
        const d = dndrop.find((item) => {
            const itemReg = new RegExp(item.name.join('|'), 'g');
            if (!name.match(itemReg)) return null;

            return item;
        });

        if (!d) return null;

        d.data.map((id) => {
            itemData.push(id);
        });

        return itemData;
    },

    getDNHpData: (name) => {
        const itemData = [];
        const d = dnhp.find((item) => {
            const itemReg = new RegExp(item.name.join('|'), 'g');
            if (!name.match(itemReg)) return null;

            return item;
        });

        if (!d) return null;

        d.data.map((id) => {
            itemData.push(id);
        });

        return itemData;
    },

    getDNInfoData: (name) => {
        const itemData = [];
        const d = dninfo.find((item) => {
            const itemReg = new RegExp(item.name.join('|'), 'g');
            if (!name.match(itemReg)) return null;

            return item;
        });

        if (!d) return null;

        d.data.map((id) => {
            itemData.push(id);
        });

        return itemData;
    },

    getDNRateData: (name) => {
        const itemData = [];
        const d = dnrate.find((item) => {
            const itemReg = new RegExp(item.name.join('|'), 'g');
            if (!name.match(itemReg)) return null;

            return item;
        });

        if (!d) return null;

        d.data.map((id) => {
            itemData.push(id);
        });

        return itemData;
    },
};
