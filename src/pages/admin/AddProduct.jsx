import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, prepareProductPayload } from "../../services/productService";
import { buildModel3D, DEFAULT_MODEL_3D } from "../../constants/model3D";
import Model3DControls from "../../components/admin/Model3DControls";
import Button from "../../components/common/Button";

function AddProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [has3DModel, setHas3DModel] = useState(false);
  const [modelUrl, setModelUrl] = useState("/models/fashion/checkshirt.glb");
  const [model3D, setModel3D] = useState({
    ...DEFAULT_MODEL_3D,
    url: "/models/fashion/checkshirt.glb",
  });
  const [saving, setSaving] = useState(false);

  const inputClass =
    "border border-border p-3 rounded-xl focus:ring-2 focus:ring-accent/40 outline-none w-full bg-white";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !category || !quantity) return;

    setSaving(true);
    try {
      const form = {
        title,
        price,
        description,
        images,
        category,
        quantity,
        has3DModel,
        modelUrl,
        modelScale: model3D.scale,
        posX: model3D.position.x,
        posY: model3D.position.y,
        posZ: model3D.position.z,
        rotX: model3D.rotation.x,
        rotY: model3D.rotation.y,
        rotZ: model3D.rotation.z,
        camX: model3D.camera.x,
        camY: model3D.camera.y,
        camZ: model3D.camera.z,
      };
      const payload = prepareProductPayload(form);
      if (has3DModel && modelUrl) {
        payload.model3D = buildModel3D(modelUrl, model3D);
      }
      await addProduct(payload);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <h1 className="text-3xl font-bold text-ink tracking-tight">Add Product</h1>
      <p className="text-ink-muted mt-1 mb-8">
        3D models use professional defaults — fine-tune with sliders below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="premium-card p-6 space-y-4">
          <select
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
          </select>
          <input
            className={inputClass}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className={inputClass}
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              className={inputClass}
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              className={inputClass}
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <input
            className={inputClass}
            placeholder="Image URLs (comma-separated)"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
        </div>

        <div className="premium-card p-6">
          <label className="flex items-center gap-2 text-ink font-medium">
            <input
              type="checkbox"
              checked={has3DModel}
              onChange={(e) => {
                setHas3DModel(e.target.checked);
                if (e.target.checked) {
                  setModel3D(buildModel3D(modelUrl, DEFAULT_MODEL_3D));
                }
              }}
            />
            Enable 3D model
          </label>

          {has3DModel && (
            <div className="mt-4 space-y-4">
              <input
                className={inputClass}
                placeholder="Model path e.g. /models/fashion/checkshirt.glb"
                value={modelUrl}
                onChange={(e) => {
                  setModelUrl(e.target.value);
                  setModel3D((m) => ({ ...m, url: e.target.value }));
                }}
              />
              <Model3DControls
                model3D={{ ...model3D, url: modelUrl }}
                onChange={(next) =>
                  setModel3D({ ...next, url: modelUrl })
                }
              />
            </div>
          )}
        </div>

        <Button type="submit" variant="primary" disabled={saving} className="w-full sm:w-auto">
          {saving ? "Saving..." : "Add product"}
        </Button>
      </form>
    </div>
  );
}

export default AddProduct;
