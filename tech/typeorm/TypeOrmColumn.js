const OrmColumn = require("../OrmColumn");

module.exports = class TypeOrmColumn extends OrmColumn {
    get type() {
        switch(super.type.toLowerCase()) {
            case "varchar":
            case "string":
                return "string";

            case "int":
            case "integer":
            case "number":
                return "number";

            case "bool":
            case "boolean":
            case "bit":
                return "boolean";

            default:
                return super.type;
        }
    }
}