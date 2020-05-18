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
};
