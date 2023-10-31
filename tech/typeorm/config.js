const OrmEntity = require("../OrmEntity");
const TypeOrmColumn = require("./TypeOrmColumn");
const OrmRelation = require("../OrmRelation");

module.exports = {
    extension: 'ts',
    EntityClass: OrmEntity,
    ColumnClass: TypeOrmColumn,
    RelationClass: OrmRelation,
}