export default function ConditionValue({ value, type, onChange }) {
  const handleChange = (e) => onChange?.(e.target.value);
  return (
    <input className="form-control" value={value} onChange={handleChange} />
  );
}
