module.exports = async (client, reaction, user) => {
    console.log(`-> Pesan dari ${reaction.message.author.tag} dengan id '${reaction.message.id}' mendapat reaction!`);

    // Ketika menerima reaction, cek jika pesan sebagian atau tidak
    if (reaction.message.partial) {
        // Jika pesan sudah dihapus, akan terjadi API error, harus dihandle
        try {
            await reaction.message.fetch();
        } catch (error) {
            console.log('Terjadi error saat fetch pesan: ', error);
        }
    }

    // Cek juka jika reaction sebagian atau tidak
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log('Terjadi error saat fetch reaction: ', error);
        }
    }

    // Filter emojinya
    const { message } = reaction;
    const { emoji } = reaction;

    if (emoji.name === '🇲') {
        message.guild.fetchMember(user.id).then((member) => {
            member.addRole('668660316036530216');
        });
    }

    if (emoji.name === '🇹') {
        message.guild.fetchMember(user.id).then((member) => {
            member.addRole('668680264096022550');
        });
    }
};
