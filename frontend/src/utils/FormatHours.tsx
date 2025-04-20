export function formatHeuresDecimal(heures: number): string {
    const h = Math.floor(heures); // partie entière = heures
    const m = Math.round((heures - h) * 60); // partie décimale convertie en minutes
    if (m === 0) {
        return `${h}h`;
      }
    
    return `${h}h${m.toString().padStart(2, "0")}`;
  }
  