const cds = require("@sap/cds");

class MsgSender extends cds.ApplicationService {
    async init() {

        this.after("CREATE", "Personnels", async (req, res) => {
            await this.emit("sendMessage", req);
        });

        await super.init();
    }
}

class MsgReceiver extends cds.ApplicationService {
    async init() {
        const MsgSenderService = await cds.connect.to("MsgSender"),
            db = await cds.connect.to("db"),
            { Employees } = db.entities;

        MsgSenderService.on("sendMessage", async (msg) => {
            await INSERT.into(Employees).entries(msg.data);
        });

        await super.init();
    }
}

module.exports = { MsgSender, MsgReceiver };