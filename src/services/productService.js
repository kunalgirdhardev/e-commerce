import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { mergeModel3D, buildModel3D } from "../constants/model3D";

const PRODUCTS_COLLECTION = "products";

export function normalizeProduct(id, data) {
  const title = data.title ?? data.name ?? "";
  const images = data.images?.length
    ? data.images
    : data.img
      ? [data.img]
      : [];

  const has3DModel = Boolean(data.has3DModel);
  let model3D = null;
  if (has3DModel && data.model3D?.url) {
    model3D = mergeModel3D(data.model3D);
  } else if (has3DModel && data.model3D) {
    model3D = mergeModel3D(data.model3D);
  }

  return {
    id,
    title,
    name: title,
    price: data.price ?? 0,
    description: data.description ?? "",
    category: data.category ?? "",
    images,
    img: images[0] || "",
    quantity: data.quantity ?? 0,
    has3DModel,
    model3D,
  };
}

export function subscribeProducts(callback) {
  return onSnapshot(collection(db, PRODUCTS_COLLECTION), (snapshot) => {
    const products = snapshot.docs.map((d) =>
      normalizeProduct(d.id, d.data())
    );
    callback(products);
  });
}

export function subscribeProduct(id, callback) {
  return onSnapshot(doc(db, PRODUCTS_COLLECTION, id), (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }
    callback(normalizeProduct(snap.id, snap.data()));
  });
}

export async function getProductById(id) {
  const snap = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
  if (!snap.exists()) return null;
  return normalizeProduct(snap.id, snap.data());
}

export function getRelatedProducts(products, category, excludeId, limit = 4) {
  return products
    .filter((p) => p.category === category && p.id !== excludeId)
    .slice(0, limit);
}

export async function addProduct(productData) {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
  return docRef.id;
}

export async function updateProduct(id, data) {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), data);
}

export async function updateProductModel3D(id, model3DPartial) {
  const product = await getProductById(id);
  if (!product) return;

  const url = model3DPartial.url ?? product.model3D?.url;
  if (!url) return;

  const model3D = buildModel3D(url, {
    ...product.model3D,
    ...model3DPartial,
    position: { ...product.model3D?.position, ...model3DPartial.position },
    rotation: { ...product.model3D?.rotation, ...model3DPartial.rotation },
    camera: { ...product.model3D?.camera, ...model3DPartial.camera },
  });

  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), {
    has3DModel: true,
    model3D,
  });
}

export function prepareProductPayload(form) {
  const imageList = form.images
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    title: form.title,
    name: form.title,
    price: Number(form.price),
    description: form.description,
    category: form.category,
    quantity: Number(form.quantity),
    images: imageList,
    img: imageList[0] || "",
    has3DModel: form.has3DModel,
  };

  if (form.has3DModel && form.modelUrl) {
    payload.model3D = buildModel3D(form.modelUrl, {
      scale: Number(form.modelScale),
      position: {
        x: Number(form.posX),
        y: Number(form.posY),
        z: Number(form.posZ),
      },
      rotation: {
        x: Number(form.rotX),
        y: Number(form.rotY),
        z: Number(form.rotZ),
      },
      camera: {
        x: Number(form.camX),
        y: Number(form.camY),
        z: Number(form.camZ),
      },
    });
  }

  return payload;
}
