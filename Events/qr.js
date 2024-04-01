import qrcode from "qrcode-terminal"

export default (client, qr) => {
    qrcode.generate(qr, { small: true })
}
