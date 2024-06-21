module.exports = (sequelize, DataTypes) => {
  const Diary = sequelize.define('diary', {
    email: {
      type: DataTypes.STRING(30),//최대 30자인 문자(STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME)
      allowNull: false, //빈값 허용 X, 입력 필수
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  });

  Diary.associate = (db) => {

    db.Diary.belongsTo(db.User); //Diary.addUser, Diary.setUser, Diary.getUser
    db.Diary.hasMany(db.Image); //Diary.addImages
    db.Diary.belongsToMany(db.Habit, {
      through: 'DiaryHabit'
    });
  };

  return Diary;
}