module.exports = rules = {
    rules: [
        {
            no: 1,
            allowed_area: ['1234'],
            disallowed_area: [],
            rules: [''],
            ban_words: ['.'],
            ban_users: [],
            desc: 'Tidak ada bot chat selain pada #bot-spam!'
        },
        {
            no: 2,
            allowed_area: [],
            disallowed_area: [],
            rules: [''],
            ban_words: ['tetew', 'lalala'],
            ban_users: [],
            desc: 'Tidak boleh mengatakan kata tersebut.'
        },
        {
            no: 3,
            allowed_area: ['1234'],
            disallowed_area: [],
            rules: [''],
            ban_words: ['hmm'],
            ban_users: ['uwuchan'],
            desc: 'Anda tidak diperbolehkan menggunakan kata tersebut.'
        }
    ]
}