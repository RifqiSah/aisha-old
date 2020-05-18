module.exports = async (message, client) => {
    if (message.author.bot || message.channel.type === "dm") return; // Jangan hiraukan chat dari sesama bot dan pastikan chat berasal dari guild

    // == Awal pengecekan mention BOT ==
    if (message.isMemberMentioned(client.bot.user)) {
        let text = message.content;

        // Parse text ke DialogFlow
        let request = client.apiAI.textRequest(text, {
            sessionId: 'aisha-api-ai-session'
        });

        // Dapatkan respon dari DialogFlow
        request.on('response', (response) => {
            message.channel.send(response.result.fulfillment.speech);
        });
    
        // Error listener
        request.on('error', (error) => {
            message.reply("Oops! Aku pusing :(")
        });

        request.end(); // Akhiri request untuk menghemat memory
        return;
    }
    // == Akhir pengecekan mention BOT ==

    // == Awal pengecekan user ==
    const users = message.mentions.users.map(user => {
        if (user.presence.status === "offline") return `**${user.tag}** sedang offline.`;
        else if (user.presence.status === "idle") return `**${user.tag}** sedang away.`;
        else if (user.presence.status === "dnd") return `**${user.tag}** sedang tidak dapat diganggu.`;
    });
    
    if (users.length > 0) message.channel.send(users).then(msg => {msg.delete(5000)}).catch();
    // == Akhir pengecekan user ==

    let regex   = null;
    let args    = null;
    let command = null;

    // == Monitor main channel ==
    if (message.channel.id === "372926591849988096") { // peraturan
        if (!message.content.startsWith('.setuju')) {
            console.log("-> Pesan baru terdeteksi pada channel #peraturan dan akan segera dihapus!");

            message.delete();
        }
    }
    // == End monitor main channel ==

    // == Awal regex checker ==
    // Cek apakah diawali prefix
    if (message.content.indexOf(client.config.PREFIX) !== 0) {
        // Apakah ada di regex?
        if (regex = message.content.match(client.regexList)) command = regex[0]; // Isi command dengan hasil regexnya
        else return; // Jika tidak selesaikan
    }
    // Jika ya
    else {
        args = message.content.slice(client.config.PREFIX.length).trim().split(/ +/g); // Mensplit string dengan " " agar didapatkan argumen
        command = args.shift().toLowerCase(); // Mengambil command
    }
    // == Akhir regex checker ==

    if (command !== 'bot') {
        let isexist = await client.chsvc.getChannel(message.channel.id);
        if (isexist) return;
    }

    // == Awal command manager ==
    let commandfile = client.commands.get(command) || client.commands.get(client.commandsAlias.get(command)); // Cari file command yang ditunjuk
    if (commandfile) {
        // Cek apakah command ada cooldownnya
        if (commandfile.cooldown > 0) {
            // Cek dulu apakah user sudah menjalankan command sebelumnya?
            if (client.cmdcd.has(message.author.id))
                return message.reply(`Anda harus menunggu selama \`${commandfile.cooldown} detik\` sebelum menggunakan command \`${commandfile.name}\` kembali!`).then(msg => {msg.delete(10000)}).catch();
            
            // Kalau tidak
            client.cmdcd.add(message.author.id); // Tambahkan user kedalam list cooldown
            
            // Hapus user setelah timeout habis
            setTimeout(() => {
                client.cmdcd.delete(message.author.id);
            }, commandfile.cooldown * 1000);
        }

        console.log(`-> Command '${commandfile.name}' executed! (Regex: ${(regex ? "YES" : "NO")})`);
        
        // Cek apakah command sedang aktif atau tidak
        if (commandfile.enable) {
            // Apakah command mempunya role (role != null)
            if (commandfile.role.length > 0) {
                // Apakah role pengguna ada pada command ini?
                if (message.member.roles.some(role => commandfile.role.includes(role.id))) {
                    // Jalankan
                    commandfile.func(client, message, args);
                }
                // Tidak ada? Tampilkan pesan error
                else {
                    message.delete().catch(O_o=>{});
                    message.channel.send(`Anda tidak mempunyai ijin untuk menggunakan command \`${commandfile.name}\`!`).then(msg => {msg.delete(5000)}).catch();
                }
            // Jika role tidak ada jalankan saja
            } else {
                commandfile.func(client, message, args);
            }
        }
        // Command tidak aktif
        else {
            message.delete().catch(O_o=>{});
            message.channel.send(`Command \`${commandfile.name}\` sedang tidak aktif!`).then(msg => {msg.delete(5000)}).catch();
        }
    }
    // == Akhir command manager ==
}