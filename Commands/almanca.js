export default {
    name: "almanca",
    async execute (client, message, args, media) {
        if (args[1] == "ders") {
            (await message.getChat()).sendMessage(await media.fromUrl(`https://www.evvelcevap.com/wp-content/uploads/2019/01/almanca-a1-1-ders-kitabi-sayfa-${args[2]}-cevabi-meb-yayinlari-2018-2019.jpg`))
        } else if (args[1] == "calisma" | args[1] == "çalışma") {
            (await message.getChat()).sendMessage(await media.fromUrl(`https://www.evvelcevap.com/wp-content/uploads/2019/01/almanca-a1-1-calisma-kitabi-sayfa-${args[2]}-cevabi-meb-yayinlari.jpg`))
        }
    }
}
