interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DurationFilter = ({ value, onChange }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor="duration" className="form-label">
        Durée
      </label>
      <select className="form-select" name="duree" id="duree-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Toutes</option>
        <option value="moins d'1h">moins d'1h</option>
        <option value="1h à 2h">1h à 2h</option>
        <option value="2h à 3h">2h à 3h</option>
        <option value="plus de 3h">plus de 3h</option>
      </select>
    </div>
  );
};

export default DurationFilter;
