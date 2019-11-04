module.exports = {
    desc: "Menguji coba fitur baru pada Aisha.",
    enabled: false,
    func: (cmd, message, args) => {
        message.channel.send('Dalam perbaikan!');
    }
}