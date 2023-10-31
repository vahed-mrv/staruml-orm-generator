module.exports = class OrmColumn {
    erdColumn;

    constructor(erdColumn) {
        this.erdColumn = erdColumn;
    }

    get name() {
        return this.erdColumn.name;
    }

    get type() {
        return this.erdColumn.type;
    }

    get length() {
        return this.erdColumn.length;
    }

    get isNullable() {
        return this.erdColumn.nullable;
    }

    get isPrimaryKey() {
        return this.erdColumn.primaryKey;
    }

    get isForeignKey() {
        return this.erdColumn.foreignKey;
    }

    get referenceTo() {
        return this.erdColumn.referenceTo;
    }
}