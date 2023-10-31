module.exports = class OrmEntity {
    erdEntity;
    columns = [];
    relations = [];

    constructor(erdEntity, OrmColumnClass) {
        this.erdEntity = erdEntity;
        for (const erdColumn of this.erdEntity.columns) {
            this.columns.push(new OrmColumnClass(erdColumn));
        }
    }

    get _id() {
        return  this.erdEntity._id;
    }

    get name() {
        return this.erdEntity.name;
    }

    addOrmRelation(ormRelation) {
        this.relations.push(ormRelation);
    }
}