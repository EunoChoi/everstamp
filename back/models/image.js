module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    src: {
      type: DataTypes.STRING(500),
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  });

  Image.associate = (db) => {
    db.Image.belongsTo(db.Diary);
  };

  return Image;
}