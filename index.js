import WA from "whatsapp-web.js"
import { MongoStore } from "wwebjs-mongo"
import mongoose from "mongoose"
import express from 'express'
import fs from "fs"

fs.unlink(".wwebjs_auth/session-client-one/SingletonLock", () => {})

const app = express()
app.listen(3000)

let uptime = 0
setInterval(() => {
	app.get('/', (req, res) => res.send(`Bot ${uptime} minutes online`))
	uptime++
}, 60000)

mongoose.connect(process.env.MONGODB_URI).then(() => {
    const client = new WA.Client({ authStrategy: new WA.RemoteAuth({ store: new MongoStore({ mongoose }), backupSyncIntervalMs: 300000 }) })

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
})