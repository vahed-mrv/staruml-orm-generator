const OrmRelationType = require('./OrmRelationType');

module.exports = class OrmRelation {
    erdRelationship;
    end1;
    end2;

    constructor(erdRelationship, ormEntity1, ormEntity2) {
        this.erdRelationship = erdRelationship;
    }

    static getRelationTypeFromFirstToSecond(firstEnd, secondEnd) {
        let type;

        if(firstEnd.cardinality === '0..1' || firstEnd.cardinality === '1') {
            if(secondEnd.cardinality === '0..1' || secondEnd.cardinality === '1')
                type = "ONE_TO_ONE";
            else
                type = "ONE_TO_MANY";
        } else {
            if(secondEnd.cardinality === '0..1' || secondEnd.cardinality === '1')
                type = "MANY_TO_ONE";
            else
                type = "MANY_TO_MANY";
        }

        return type;
    }

    static getRelationEndRequired(end) {
        return end.cardinality === '1' || end.cardinality === '1..*';
    }

    get typeFromEnd1() {
        const type = OrmRelation.getRelationTypeFromFirstToSecond(this.erdRelationship.end1, this.erdRelationship.end2);
        switch (type) {
            case "ONE_TO_ONE":
                return OrmRelationType.ONE_TO_ONE_1;
            case "ONE_TO_MANY":
                return OrmRelationType.ONE_TO_MANY;
            case "MANY_TO_ONE":
                return OrmRelationType.MANY_TO_ONE;
            case "MANY_TO_MANY":
                return OrmRelationType.MANY_TO_MANY_1;
        }
    }

    get typeFromEnd2() {
        const type = OrmRelation.getRelationTypeFromFirstToSecond(this.erdRelationship.end2, this.erdRelationship.end1);
        switch (type) {
            case "ONE_TO_ONE":
                return OrmRelationType.ONE_TO_ONE_2;
            case "ONE_TO_MANY":
                return OrmRelationType.ONE_TO_MANY;
            case "MANY_TO_ONE":
                return OrmRelationType.MANY_TO_ONE;
            case "MANY_TO_MANY":
                return OrmRelationType.MANY_TO_MANY_2;
        }
    }

    get requiredEnd1() {
        return OrmRelation.getRelationEndRequired(this.erdRelationship.end1);
    }

    get requiredEnd2() {
        return OrmRelation.getRelationEndRequired(this.erdRelationship.end2);
    }

    getTypeFromEntityId(entityId) {
        if(this.erdRelationship.end1.reference._id === entityId)
            return this.typeFromEnd1;
        else if(this.erdRelationship.end2.reference._id === entityId)
            return this.typeFromEnd2;
        else
            return null;
    }

    getRequiredFromEntityId(entityId) {
        if(this.erdRelationship.end1.reference._id === entityId)
            return this.requiredEnd1;
        else if(this.erdRelationship.end2.reference._id === entityId)
            return this.requiredEnd2;
        else
            return null;
    }

    setEnd1(ormEntity) {
        this.end1 = ormEntity;
        ormEntity.addOrmRelation(this);
    }

    setEnd2(ormEntity) {
        this.end2 = ormEntity;
        ormEntity.addOrmRelation(this);
    }

    getOtherEndFromEntityId(entityId) {
        if(this.erdRelationship.end1.reference._id === entityId)
            return this.end2;
        else if(this.erdRelationship.end2.reference._id === entityId)
            return this.end1;
        else
            return null;
    }
}