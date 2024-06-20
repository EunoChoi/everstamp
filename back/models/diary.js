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

    // //post가 모델 다수를 가짐
    // db.Post.hasMany(db.Comment); //post.addComments

    // //post가 복수의 모델에 속함
    // db.Post.belongsToMany(db.Hashtag, {
    //   through: 'PostHashtag'
    // }); // PostHashtag 테이블 생성

    // //좋아요는 유저와 포스트가 다대다 관계를 가지는 것
    // db.Post.belongsToMany(db.User, {
    //   through: 'Like', as: 'Likers', foreignKey: "Post_id",
    //   sourceKey: "id",
    // }); //post.addLikers, post.removeLikers 가능 , Like 테이블 생성
  };

  return Diary;
}