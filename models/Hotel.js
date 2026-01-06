import Sequelize from "sequelize";
import db from "../config/db.js"

export const Hotel = db.define("hoteles", {
    nombre: {
        type: Sequelize.STRING,
    },
    precio_noche: {
        type: Sequelize.STRING,
    },
    ciudad: {
        type: Sequelize.STRING,
    },
    estrellas: {
        type: Sequelize.STRING,
    },
    habitaciones_disponibles: {
        type: Sequelize.STRING,
    },
    imagen: {
        type: Sequelize.STRING,
    },
    descripcion: {
        type: Sequelize.STRING,
    },
    slug: {
        type: Sequelize.STRING,
    },
},{
    freezeTableName: true,
    timestamps: false,
});