// src/components/InputNota.jsx
function InputNota({ id, label, value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        step="0.1"
        min="0"
        max="10"
        required
        value={value}
        onChange={onChange}
        placeholder={`Nota da ${label}`}
      />
    </div>
  );
}

export default InputNota;