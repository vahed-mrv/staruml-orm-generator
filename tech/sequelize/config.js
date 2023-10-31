const OrmEntity = require("../OrmEntity");
const OrmColumn = require("../OrmColumn");
const OrmRelation = require("../OrmRelation");

module.exports = {
    extension: 'js',
    EntityClass: OrmEntity,
    ColumnClass: OrmColumn,
    RelationClass: OrmRelation,
}