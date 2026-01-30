module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    provider: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    currentStreakDays: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    longestStreakDays: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  });

  User.associate = (db) => {
    db.User.hasMany(db.Diary);
    db.User.hasMany(db.Habit);
  };

  return User;
}