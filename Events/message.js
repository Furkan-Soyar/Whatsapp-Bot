import WA from "whatsapp-web.js"

export default (client, message) => {
    if (message.type == "chat") {
        if (message.body.startsWith("!")) {
            const args = message.body.slice(1).trim().split(/ +/)
            const command = client.commands.get(args[0])

            if (command) {
                try {
                    command.execute(client, message, args, WA.MessageMedia)
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }
}
