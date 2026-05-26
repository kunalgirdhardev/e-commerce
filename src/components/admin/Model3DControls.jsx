import { useCallback, useRef } from "react";
import { DEFAULT_MODEL_3D, buildModel3D } from "../../constants/model3D";

function SliderControl({ label, value, min, max, step, onChange }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-ink-muted font-medium">{label}</span>
        <span className="text-ink font-mono">{Number(value).toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
      />
    </div>
  );
}

function Model3DControls({ model3D, onChange, disabled = false }) {
  const debounceRef = useRef(null);

  const m = {
    scale: model3D?.scale ?? DEFAULT_MODEL_3D.scale,
    position: { ...DEFAULT_MODEL_3D.position, ...model3D?.position },
    rotation: { ...DEFAULT_MODEL_3D.rotation, ...model3D?.rotation },
    camera: { ...DEFAULT_MODEL_3D.camera, ...model3D?.camera },
  };

  const emit = useCallback(
    (partial) => {
      if (disabled) return;
      const next = {
        ...model3D,
        scale: partial.scale ?? m.scale,
        position: { ...m.position, ...partial.position },
        rotation: { ...m.rotation, ...partial.rotation },
        camera: { ...m.camera, ...partial.camera },
      };
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onChange(next), 200);
    },
    [model3D, m, onChange, disabled]
  );

  return (
    <div className="space-y-6 p-5 rounded-xl bg-surface border border-border">
      <div>
        <h4 className="text-sm font-semibold text-ink mb-3">Scale & Camera</h4>
        <div className="space-y-3">
          <SliderControl
            label="Scale"
            value={m.scale}
            min={0.1}
            max={5}
            step={0.1}
            onChange={(v) => emit({ scale: v })}
          />
          <SliderControl
            label="Camera distance (Z)"
            value={m.camera.z}
            min={1}
            max={12}
            step={0.1}
            onChange={(v) => emit({ camera: { ...m.camera, z: v } })}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-ink mb-3">Position</h4>
        <div className="space-y-3">
          {["x", "y", "z"].map((axis) => (
            <SliderControl
              key={`pos-${axis}`}
              label={`Position ${axis.toUpperCase()}`}
              value={m.position[axis]}
              min={-5}
              max={5}
              step={0.1}
              onChange={(v) =>
                emit({ position: { ...m.position, [axis]: v } })
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-ink mb-3">Rotation</h4>
        <div className="space-y-3">
          {["x", "y", "z"].map((axis) => (
            <SliderControl
              key={`rot-${axis}`}
              label={`Rotation ${axis.toUpperCase()}`}
              value={m.rotation[axis]}
              min={-3.14}
              max={3.14}
              step={0.05}
              onChange={(v) =>
                emit({ rotation: { ...m.rotation, [axis]: v } })
              }
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          onChange(
            buildModel3D(model3D?.url || "", DEFAULT_MODEL_3D)
          )
        }
        className="text-xs text-ink-muted hover:text-ink underline"
      >
        Reset to defaults
      </button>
    </div>
  );
}

export default Model3DControls;
