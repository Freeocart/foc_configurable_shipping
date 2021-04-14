import { useCallback } from "react";

export default function ConditionValue({ value, onChange }) {
  const handleChange = useCallback((e) => onChange?.(e.target.value), [
    onChange,
  ]);

  return (
    <input className="form-control" value={value} onChange={handleChange} />
  );
}
