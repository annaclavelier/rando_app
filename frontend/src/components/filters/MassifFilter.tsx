interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MassifFilter = ({ value, onChange }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor="massif" className="form-label">
        Massif
      </label>
      <select
        className="form-select"
        name="massif"
        id="massif-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Tous</option>
        <option value="Chartreuse">Chartreuse</option>
        <option value="Vercors">Vercors</option>
        <option value="Oisan">Oisan</option>
      </select>
    </div>
  );
};

export default MassifFilter;
