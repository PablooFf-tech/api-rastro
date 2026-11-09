import { Router } from "express";
import { ObjectId } from "mongodb";
import { listingsCollection, offersCollection, usersCollection } from "../db";
import type { Offer } from "../types";

const router = Router();

// ---------- POST /api/offers (crear oferta) ----------
router.post("/", async (req, res) => {
  const body = req.body as Record<string, unknown>;

  // 1. listingId y buyerId tienen formato de ObjectId
  if (
    typeof body.listingId !== "string" ||
    !ObjectId.isValid(body.listingId) ||
    typeof body.buyerId !== "string" ||
    !ObjectId.isValid(body.buyerId)
  ) {
    res.status(400).json({ error: "listingId y buyerId deben ser identificadores válidos" });
    return;
  }

  // 2. amount es un número mayor que 0
  if (typeof body.amount !== "number" || Number.isNaN(body.amount) || body.amount <= 0) {
    res.status(400).json({ error: "amount debe ser un número mayor que 0" });
    return;
  }

  // 3. El anuncio existe
  const listing = await listingsCollection().findOne({ _id: new ObjectId(body.listingId) });
  if (!listing) {
    res.status(400).json({ error: "No existe ningún anuncio con ese listingId" });
    return;
  }

  // 4. El comprador existe
  const buyer = await usersCollection().findOne({ _id: new ObjectId(body.buyerId) });
  if (!buyer) {
    res.status(400).json({ error: "No existe ningún usuario con ese buyerId" });
    return;
  }

  // 5. El anuncio está AVAILABLE
  if (listing.status !== "AVAILABLE") {
    res.status(409).json({ error: "El anuncio no está disponible para ofertas" });
    return;
  }

  const newOffer: Offer = {
    amount: body.amount,
    status: "PENDING",
    createdAt: new Date(),
    listing: {
      id: listing._id,
      title: listing.title,
      price: listing.price,
    },
    buyer: {
      id: buyer._id,
      name: buyer.name,
    },
  };

  const result = await offersCollection().insertOne(newOffer);

  res.status(201).json({
    _id: result.insertedId,
    ...newOffer,
  });
});

export default router;
