const generator = require("./generator");
const pkgjson = require("./package.json");

function showAbout() {
    app.dialogs.showInfoDialog(`About ORM Generator: version ${pkgjson.version}`);
}

function erdToOrm(ormType) {
    var selectedDirs = app.dialogs.showOpenDialog("Select a path to save generated classes ...", null, null, {properties: ['openDirectory']});
    if (!selectedDirs || selectedDirs.length <= 0) return;
    const destinationDir = selectedDirs[0];

    app.elementPickerDialog.showDialog("Select An ERD Data Model", null, type.ERDDataModel)
        .then(({buttonId, returnValue: diagram}) => {
            if (buttonId === 'ok') {
                generator.generate(diagram, ormType, destinationDir);
                app.dialogs.showInfoDialog("Models Generated Successfully!");
            }
        });
}

function erdToTypeOrm() {
    erdToOrm('typeorm');
}

function erdToSequelize() {
    erdToOrm('sequelize');
}

function init() {
    app.commands.register("ormgenerator:show-about", showAbout);
    app.commands.register("ormgenerator:erd-to-typeorm", erdToTypeOrm);
    app.commands.register("ormgenerator:erd-to-sequelize", erdToSequelize);
}

exports.init = init;