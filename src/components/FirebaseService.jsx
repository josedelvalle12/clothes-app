import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const addReservation = async (service) => {
  try {
    await addDoc(collection(db, "reservations"), {
      name: service.name,
      price: service.price,
      image: service.image,
      description: service.description,
      createdAt: new Date(),
    });
    console.log("Reserva guardada en Firestore ✅");
  } catch (error) {
    console.error("Error al guardar reserva ❌", error);
  }
};
