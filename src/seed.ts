import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Falta MONGODB_URI en el archivo .env");
}

const dbName = process.env.DB_NAME ?? "rastro";
const client = new MongoClient(uri);

export async function seedDatabase() {
  await client.connect();
  const db = client.db(dbName);

  console.log(`Borrando base de datos "${dbName}"...`);
  await db.dropDatabase();

  console.log("Insertando usuarios...");
  await db.collection("users").insertMany([
    {
      _id: new ObjectId("660000000000000000000001"),
      name: "Ana García",
      email: "ana@rastro.es",
      city: "Valencia",
      joinedAt: new Date("2025-03-10"),
      favorites: [new ObjectId("670000000000000000000008")],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      _id: new ObjectId("660000000000000000000002"),
      name: "Luis Martín",
      email: "luis@rastro.es",
      city: "Valencia",
      joinedAt: new Date("2024-11-02"),
      favorites: [],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      _id: new ObjectId("660000000000000000000003"),
      name: "Marta Ruiz",
      email: "marta@rastro.es",
      city: "Alicante",
      joinedAt: new Date("2025-06-21"),
      favorites: [],
      ratingAverage: 5,
      ratingCount: 1,
    },
    {
      _id: new ObjectId("660000000000000000000004"),
      name: "Hugo Sanz",
      email: "hugo@rastro.es",
      city: "Castellón",
      joinedAt: new Date("2026-01-15"),
      favorites: [],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      _id: new ObjectId("660000000000000000000005"),
      name: "Sara López",
      email: "sara@rastro.es",
      city: "Valencia",
      joinedAt: new Date("2026-09-30"),
      favorites: [
        new ObjectId("670000000000000000000001"),
        new ObjectId("670000000000000000000003"),
        new ObjectId("670000000000000000000008"),
      ],
      ratingAverage: 0,
      ratingCount: 0,
    },
  ]);

  console.log("Insertando anuncios...");
  await db.collection("listings").insertMany([
    {
      _id: new ObjectId("670000000000000000000001"),
      title: "Seat Ibiza 2015",
      description: "Siempre en garaje, ITV pasada.",
      price: 6500,
      category: "Cars",
      status: "AVAILABLE",
      city: "Valencia",
      publishedAt: new Date("2026-10-01"),
      views: 340,
      seller: { id: new ObjectId("660000000000000000000002"), name: "Luis Martín" },
      photos: [
        { url: "https://img.rastro.es/a1-1.jpg", order: 1 },
        { url: "https://img.rastro.es/a1-2.jpg", order: 2 },
      ],
      attributes: { brand: "Seat", model: "Ibiza", year: 2015, km: 98000, fuel: "petrol" },
    },
    {
      _id: new ObjectId("670000000000000000000002"),
      title: "Ford Focus 2012",
      description: "Correa cambiada hace un año.",
      price: 4200,
      category: "Cars",
      status: "AVAILABLE",
      city: "Castellón",
      publishedAt: new Date("2026-10-12"),
      views: 95,
      seller: { id: new ObjectId("660000000000000000000004"), name: "Hugo Sanz" },
      photos: [{ url: "https://img.rastro.es/a2-1.jpg", order: 1 }],
      attributes: { brand: "Ford", model: "Focus", year: 2012, km: 165000, fuel: "diesel" },
    },
    {
      _id: new ObjectId("670000000000000000000003"),
      title: "iPhone 13 128 GB",
      description: "Con funda y cargador.",
      price: 380,
      category: "Phones",
      status: "AVAILABLE",
      city: "Valencia",
      publishedAt: new Date("2026-10-20"),
      views: 512,
      seller: { id: new ObjectId("660000000000000000000001"), name: "Ana García" },
      photos: [
        { url: "https://img.rastro.es/a3-1.jpg", order: 1 },
        { url: "https://img.rastro.es/a3-2.jpg", order: 2 },
        { url: "https://img.rastro.es/a3-3.jpg", order: 3 },
      ],
      attributes: { brand: "Apple", model: "iPhone 13", storageGB: 128, batteryPct: 87 },
    },
    {
      _id: new ObjectId("670000000000000000000004"),
      title: "Samsung Galaxy A52",
      description: "Pantalla sin rayas.",
      price: 150,
      category: "Phones",
      status: "SOLD",
      city: "Alicante",
      publishedAt: new Date("2026-09-05"),
      views: 210,
      seller: { id: new ObjectId("660000000000000000000003"), name: "Marta Ruiz" },
      photos: [{ url: "https://img.rastro.es/a4-1.jpg", order: 1 }],
      attributes: { brand: "Samsung", model: "Galaxy A52", storageGB: 128, batteryPct: 80 },
    },
    {
      _id: new ObjectId("670000000000000000000005"),
      title: "Xiaomi Redmi Note 10",
      description: "Funciona perfecto.",
      price: 90,
      category: "Phones",
      status: "AVAILABLE",
      city: "Valencia",
      publishedAt: new Date("2026-10-22"),
      views: 48,
      seller: { id: new ObjectId("660000000000000000000002"), name: "Luis Martín" },
      photos: [{ url: "https://img.rastro.es/a5-1.jpg", order: 1 }],
      attributes: { brand: "Xiaomi", model: "Redmi Note 10", storageGB: 64, batteryPct: 91 },
    },
    {
      _id: new ObjectId("670000000000000000000006"),
      title: "Chaqueta vaquera Levi's",
      description: "Poco uso.",
      price: 25,
      category: "Clothes",
      status: "AVAILABLE",
      city: "Alicante",
      publishedAt: new Date("2026-10-25"),
      views: 12,
      seller: { id: new ObjectId("660000000000000000000003"), name: "Marta Ruiz" },
      photos: [],
      attributes: { size: "M", brand: "Levi's", gender: "unisex" },
    },
    {
      _id: new ObjectId("670000000000000000000007"),
      title: "Zapatillas Nike Air",
      description: "Talla 42, como nuevas.",
      price: 40,
      category: "Clothes",
      status: "RESERVED",
      city: "Valencia",
      publishedAt: new Date("2026-10-18"),
      views: 77,
      seller: { id: new ObjectId("660000000000000000000001"), name: "Ana García" },
      photos: [{ url: "https://img.rastro.es/a7-1.jpg", order: 1 }],
      attributes: { size: "42", brand: "Nike", gender: "men" },
    },
    {
      _id: new ObjectId("670000000000000000000008"),
      title: "Mesa de comedor de roble",
      description: "Para 6 personas.",
      price: 120,
      category: "Furniture",
      status: "AVAILABLE",
      city: "Castellón",
      publishedAt: new Date("2026-10-26"),
      views: 160,
      seller: { id: new ObjectId("660000000000000000000004"), name: "Hugo Sanz" },
      photos: [{ url: "https://img.rastro.es/a8-1.jpg", order: 1 }],
      attributes: { material: "oak", width: 160, depth: 90, height: 75 },
    },
  ]);

  console.log("Insertando ofertas...");
  await db.collection("offers").insertMany([
    {
      _id: new ObjectId("680000000000000000000001"),
      amount: 340,
      status: "PENDING",
      createdAt: new Date("2026-10-27"),
      listing: {
        id: new ObjectId("670000000000000000000003"),
        title: "iPhone 13 128 GB",
        price: 380,
      },
      buyer: { id: new ObjectId("660000000000000000000005"), name: "Sara López" },
    },
    {
      _id: new ObjectId("680000000000000000000002"),
      amount: 6000,
      status: "REJECTED",
      createdAt: new Date("2026-10-05"),
      listing: {
        id: new ObjectId("670000000000000000000001"),
        title: "Seat Ibiza 2015",
        price: 6500,
      },
      buyer: { id: new ObjectId("660000000000000000000001"), name: "Ana García" },
    },
    {
      _id: new ObjectId("680000000000000000000003"),
      amount: 6200,
      status: "PENDING",
      createdAt: new Date("2026-10-26"),
      listing: {
        id: new ObjectId("670000000000000000000001"),
        title: "Seat Ibiza 2015",
        price: 6500,
      },
      buyer: { id: new ObjectId("660000000000000000000005"), name: "Sara López" },
    },
    {
      _id: new ObjectId("680000000000000000000004"),
      amount: 150,
      status: "ACCEPTED",
      createdAt: new Date("2026-09-10"),
      listing: {
        id: new ObjectId("670000000000000000000004"),
        title: "Samsung Galaxy A52",
        price: 150,
      },
      buyer: { id: new ObjectId("660000000000000000000004"), name: "Hugo Sanz" },
    },
    {
      _id: new ObjectId("680000000000000000000005"),
      amount: 35,
      status: "ACCEPTED",
      createdAt: new Date("2026-10-27"),
      listing: {
        id: new ObjectId("670000000000000000000007"),
        title: "Zapatillas Nike Air",
        price: 40,
      },
      buyer: { id: new ObjectId("660000000000000000000002"), name: "Luis Martín" },
    },
  ]);

  console.log("Insertando valoraciones...");
  await db.collection("reviews").insertOne({
    listingId: new ObjectId("670000000000000000000004"),
    author: { id: new ObjectId("660000000000000000000004"), name: "Hugo Sanz" },
    reviewedUserId: new ObjectId("660000000000000000000003"),
    stars: 5,
    comment: "Todo perfecto",
    createdAt: new Date("2026-09-15"),
  });

  console.log("Creando índices...");
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("reviews").createIndex({ "author.id": 1, listingId: 1 }, { unique: true });
  await db.collection("listings").createIndex({ category: 1, price: 1 });

  const usersCount = await db.collection("users").countDocuments();
  const listingsCount = await db.collection("listings").countDocuments();
  const offersCount = await db.collection("offers").countDocuments();
  const reviewsCount = await db.collection("reviews").countDocuments();

  console.log("Dataset cargado correctamente:");
  console.log(`- users: ${usersCount}`);
  console.log(`- listings: ${listingsCount}`);
  console.log(`- offers: ${offersCount}`);
  console.log(`- reviews: ${reviewsCount}`);

  await client.close();
}

if (process.argv[1]?.endsWith("seed.ts")) {
  seedDatabase().catch((err) => {
    console.error("Error cargando dataset:", err);
    process.exit(1);
  });
}
