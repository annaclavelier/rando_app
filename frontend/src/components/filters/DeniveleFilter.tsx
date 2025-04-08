interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DeniveleFilter = ({ value, onChange }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor="denivele" className="form-label">
        Dénivelé +
      </label>
      <select
        className="form-select"
        name="denivele"
        id="denivele-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Tous</option>
        <option value="moins de 300m">moins de 300m</option>
        <option value="300 à 500m">300 à 500m</option>
        <option value="500 à 800m">500 à 800m</option>
        <option value="800 à 1000m">800 à 1000m</option>
        <option value="plus de 1000m">plus de 1000m</option>
      </select>
    </div>
  );
};

export default DeniveleFilter;
