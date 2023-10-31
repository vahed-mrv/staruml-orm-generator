const fs = require('fs');
const path = require("path");
const { Edge } = require('edge.js');
const OrmRelationType = require('./tech/OrmRelationType');

function getAllRelationships(el) {
    if(el.ownedElements.length <= 0) {
        return [];
    } else {
        let tmp = [];
        for (const e of el.ownedElements) {
            if(e instanceof type.ERDRelationship) {
                tmp.push(e);
            } else {
                tmp.push(...getAllRelationships(e));
            }
        }
        return tmp;
    }
}

function generate(erDataModel, ormType, destinationDir) {
    const config = require(`./tech/${ormType}/config`);

    const OrmEntityClass = config.EntityClass;
    const OrmColumnClass = config.ColumnClass;
    const OrmRelationClass = config.RelationClass;
    if(!OrmEntityClass) throw new Error(`EntityClass must be specified in the config of ${ormType}.`);
    if(!OrmColumnClass) throw new Error(`ColumnClass must be specified in the config of ${ormType}.`);
    if(!OrmRelationClass) throw new Error(`RelationClass must be specified in the config of ${ormType}.`);

    const erdEntities = erDataModel.ownedElements.filter(el => el instanceof type.ERDEntity);
    const erdRelationships = getAllRelationships(erDataModel);

    // Create ORM Entities
    const ormEntities = [];
    for (const erdEntity of erdEntities) {
        const ormEntity = new OrmEntityClass(erdEntity, OrmColumnClass);
        ormEntities.push(ormEntity);
    }

    // Create ORM Relationships
    const ormRelations = [];
    for (const erdRelationship of erdRelationships) {
        const end1Entity = ormEntities.find(ent => ent._id === erdRelationship.end1.reference._id);
        const end2Entity = ormEntities.find(ent => ent._id === erdRelationship.end2.reference._id);

        const ormRelation = new OrmRelationClass(erdRelationship);
        ormRelation.setEnd1(end1Entity);
        ormRelation.setEnd2(end2Entity);

        ormRelations.push(ormRelation);
    }

    // Generate Models
    const templateFilePath = path.join(__dirname, `./tech/${ormType}/model.edge`);

    const edge = new Edge({ cache: false });
    for (const ormEntity of ormEntities) {
        const content = edge.renderSync(templateFilePath, {entity: ormEntity, RelationType: OrmRelationType});
        console.log(content);

        fs.mkdirSync(path.join(destinationDir, `${ormType}-models`), {recursive: true});
        const filePath = path.join(destinationDir, `${ormType}-models`, `${ormEntity.name}.${config.extension}`);
        fs.writeFileSync(filePath, content);
    }
}

module.exports = {generate};