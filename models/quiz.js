// Definición del modelo de quiz (la tabla)
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Quiz',
            {
              pregunta: DataTypes.STRING,
              respuesta: DataTypes.STRING,
            });
}
