module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define("Komik", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sinopsis: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tahun_terbit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    penulis_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "komik",
    timestamps: true
  });

  Komik.associate = (models) => {
    // Relasi ke Penulis (satu penulis bisa punya banyak komik)
    Komik.belongsTo(models.Penulis, {
      foreignKey: "penulis_id",
      as: "penulis"
    });

    // Relasi many-to-many ke Genre lewat tabel pivot komik_genre
    Komik.belongsToMany(models.Genre, {
      through: "komik_genre",
      foreignKey: "komik_id",
      otherKey: "genre_id",
      as: "genres"   // gunakan plural agar lebih jelas
    });
  };

  return Komik;
};
