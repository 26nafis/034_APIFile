module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define("Genre", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: "genre",   // gunakan huruf kecil agar konsisten dengan tabel
    timestamps: true
  });

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Komik, {
      through: "komik_genre",
      foreignKey: "genre_id",
      otherKey: "komik_id",
      as: "komiks"
    });
  };

  return Genre;
};
