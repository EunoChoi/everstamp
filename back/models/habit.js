module.exports = (sequelize, DataTypes) => {
  const Habit = sequelize.define('Habit', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    themeColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  //habit relationship
  //user-habit 1:N
  //post-habit N:N

  Image.associate = (db) => {
    db.Image.belongsTo(db.Diary);
  };

  return Habit;
}