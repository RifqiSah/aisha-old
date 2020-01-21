module.exports = {
    getDate: () => {
        return new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    }
}