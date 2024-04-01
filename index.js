import WA from "whatsapp-web.js"
import { exec } from "node:child_process"
import { promisify } from "node:util"
import express from 'express'
import fs from "fs"

fs.unlink(".wwebjs_auth/session-client-one/SingletonLock", () => {})

const app = express()

app.listen(3000)
app.get('/', (req, res) => res.sendStatus(200))

const client = new WA.Client({ 
	puppeteer: {
		headless: false,
		args: ["--disable-gpu", "--no-sandbox", "--disable-setuid-sandbox", "--user-agent"]
	},
	authStrategy: new WA.LocalAuth({ clientId: "client-one" }),
	userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
})
client.commands = new Map()

for (let eventFile of fs.readdirSync("./Events")) {
    import(`./Events/${eventFile}`).then(file => {
		client.on(eventFile.slice(0, eventFile.indexOf(".")), (...args) => file.default(client, ...args))
	})
}

for (const commandFile of fs.readdirSync('./Commands/')) {
	import(`./Commands/${commandFile}`).then(file => {
		client.commands.set(file.default.name, file.default)
		console.log(`Whatsapp | Synchronized command > ${file.default.name[0].toUpperCase() + file.default.name.slice(1)}`)
	})
}

client.initialize()
