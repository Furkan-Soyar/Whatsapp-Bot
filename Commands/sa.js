export default {
    name: "sa",
    async execute (client, message, args, media) {
        (await message.getChat()).sendMessage("Aleyküm selam");
    }
}
