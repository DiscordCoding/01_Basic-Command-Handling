module.exports = class Commando {
    constructor(client, opciones) {
        this.client = client;
        this.name = opciones.name;
        this.aliases = opciones.alias;
        this.description = opciones.description;
        this.args = opciones.args | false;
        this.usage = opciones.usage
    }
}