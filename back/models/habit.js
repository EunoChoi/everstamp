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
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  });

  //habit relationship
  //user-habit 1:N
  //post-habit N:N
  Habit.associate = (db) => {
    db.Habit.belongsTo(db.User);
    db.Habit.belongsToMany(db.Diary, { //diary.addHabit
      through: 'DiaryHabit'
    });
  };

  return Habit;
}