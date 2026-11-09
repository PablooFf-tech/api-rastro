import { Router } from "express";
import { ObjectId, type Filter } from "mongodb";
import { listingsCollection, usersCollection } from "../db";
import type { Listing } from "../types";

const router = Router();

// Lo que se enseña de cada anuncio en un listado
const LIST_FIELDS = { title: 1, price: 1, category: 1, city: 1, status: 1 };

// ---------- GET /api/listings (listado y filtros) ----------
router.get("/", async (req, res) => {
  const filter: Filter<Listing> = {};

  if (typeof req.query.category === "string") {
    filter.category = req.query.category;
  }

  if (typeof req.query.city === "string") {
    filter.city = req.query.city;
  }

  if (req.query.maxPrice !== undefined) {
    const maxPrice = Number(req.query.maxPrice);
    if (Number.isNaN(maxPrice)) {
      res.status(400).json({ error: "maxPrice debe ser un número válido" });
      return;
    }
    filter.price = { $lte: maxPrice };
  }

  const listings = await listingsCollection()
    .find(filter)
    .project(LIST_FIELDS)
    .sort({ publishedAt: -1 })
    .toArray();

  res.json(listings);
});

// ---------- GET /api/listings/:id (ficha detallada) ----------
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "El id no tiene un formato válido" });
    return;
  }

  const listing = await listingsCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $inc: { views: 1 } },
    { returnDocument: "after" },
  );

  if (!listing) {
    res.status(404).json({ error: "No existe ningún anuncio con ese id" });
    return;
  }

  res.json(listing);
});

// ---------- POST /api/listings (crear anuncio) ----------
router.post("/", async (req, res) => {
  const body = req.body as Record<string, unknown>;

  if (typeof body.title !== "string" || body.title.trim() === "") {
    res.status(400).json({ error: "title es obligatorio y debe ser un texto no vacío" });
    return;
  }

  if (typeof body.description !== "string" || body.description.trim() === "") {
    res.status(400).json({ error: "description es obligatorio y debe ser un texto no vacío" });
    return;
  }

  if (typeof body.category !== "string" || body.category.trim() === "") {
    res.status(400).json({ error: "category es obligatorio y debe ser un texto no vacío" });
    return;
  }

  if (typeof body.city !== "string" || body.city.trim() === "") {
    res.status(400).json({ error: "city es obligatorio y debe ser un texto no vacío" });
    return;
  }

  if (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0) {
    res.status(400).json({ error: "price es obligatorio y debe ser un número mayor o igual que 0" });
    return;
  }

  if (typeof body.sellerId !== "string" || !ObjectId.isValid(body.sellerId)) {
    res.status(400).json({ error: "sellerId no tiene un formato válido" });
    return;
  }

  const seller = await usersCollection().findOne({ _id: new ObjectId(body.sellerId) });
  if (!seller) {
    res.status(400).json({ error: "No existe ningún usuario con ese sellerId" });
    return;
  }

  const attributes =
    typeof body.attributes === "object" && body.attributes !== null && !Array.isArray(body.attributes)
      ? (body.attributes as Record<string, unknown>)
      : {};

  const newListing: Listing = {
    title: body.title.trim(),
    description: body.description.trim(),
    price: body.price,
    category: body.category.trim(),
    status: "AVAILABLE",
    city: body.city.trim(),
    publishedAt: new Date(),
    views: 0,
    seller: {
      id: seller._id,
      name: seller.name,
    },
    photos: [],
    attributes,
  };

  const result = await listingsCollection().insertOne(newListing);

  res.status(201).json({
    _id: result.insertedId,
    ...newListing,
  });
});

// ---------- PATCH /api/listings/:id (cambiar precio) ----------
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "El id no tiene un formato válido" });
    return;
  }

  const body = req.body as Record<string, unknown>;
  if (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0) {
    res.status(400).json({ error: "price debe ser un número mayor o igual que 0" });
    return;
  }

  const updatedListing = await listingsCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { price: body.price } },
    { returnDocument: "after" },
  );

  if (!updatedListing) {
    res.status(404).json({ error: "No existe ningún anuncio con ese id" });
    return;
  }

  res.json(updatedListing);
});

// ---------- DELETE /api/listings/:id (borrar anuncio) ----------
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "El id no tiene un formato válido" });
    return;
  }

  const result = await listingsCollection().deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    res.status(404).json({ error: "No existe ningún anuncio con ese id" });
    return;
  }

  res.status(204).send();
});

export default router;
