module.exports = {
    getDate: () => {
        return new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    },

    getAllowedRoles: (roleid) => {
        let allowedroles = ['668660316036530216', '668680264096022550', '676221506346549251'];
        return allowedroles.includes(roleid);
    }
}