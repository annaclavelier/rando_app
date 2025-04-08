interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DifficultyFilter = ({ value, onChange }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor="difficulty" className="form-label">
        Difficulté
      </label>
      <select
        className="form-select"
        name="difficulty"
        id="difficulty-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Toutes</option>
        <option value="Facile">Facile</option>
        <option value="Moyen">Moyen</option>
        <option value="Difficile">Difficile</option>
      </select>
    </div>
  );
};

export default DifficultyFilter;
