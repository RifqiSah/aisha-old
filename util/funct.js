module.exports = {
    getDate: () => {
        return new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    },

    getAllowedRoles: (roleid) => {
        let allowedroles = ['668660316036530216', '668680264096022550', '676221506346549251'];
        return allowedroles.includes(roleid);
    },

    getServerIP: (name) => {
        let serverIp = [
            { 'name': 'NA', 'ip': '211.43.155.163', 'port': 14300 },
            { 'name': 'KO', 'ip': '211.233.18.72', 'port': 14300 },
            { 'name': 'SEA', 'ip': '202.14.200.67', 'port': 14301 },
        ];

        let sname = name[0].toUpperCase();
        return serverIp.find(x => x.name === sname);
    }
}