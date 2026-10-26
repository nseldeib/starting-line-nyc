// A static, clearly labelled example of the saved-races season timeline.
const MONTHS = [
  ['Nov', 2.8],
  ['Dec', 16.6],
  ['Jan', 30.9],
  ['Feb', 45.2],
  ['Mar', 58.1],
  ['Apr', 72.4],
  ['May', 86.2],
] as const;

type Lane = { name: string; train: [number, number]; reg?: number; race: number };

const LANES: Lane[] = [
  { name: 'Great Gobble 5K', train: [0, 9.4], race: 9.4 },
  { name: 'Big Apple Half', train: [2.8, 17.4], reg: 3.8, race: 20.2 },
  { name: 'Big Bear Half', train: [31.2, 41.7], reg: 28.4, race: 72.9 },
];

export default function SeasonPreview() {
  return (
    <figure className="preview" aria-label="Example season view">
      <div className="head"><b>Your season</b><span>Example</span></div>
      <div className="goal"><span>Goal</span> Half marathon under 1:50 by spring</div>
      <div className="panel">
        <div className="axis">
          {MONTHS.map(([m, left]) => (
            <span key={m} style={{ left: `${left}%` }}>{m}</span>
          ))}
        </div>
        {LANES.map((lane) => (
          <div className="lane" key={lane.name}>
            <b>{lane.name}</b>
            <div className="track">
              <div className="trainbar" style={{ left: `${lane.train[0]}%`, width: `${lane.train[1]}%` }} />
              {lane.reg !== undefined && <div className="regpt" style={{ left: `${lane.reg}%` }} />}
              <div className="raceday" style={{ left: `${lane.race}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="legend">
        <span><i style={{ width: 16, height: 10, background: 'var(--train)' }} />Training</span>
        <span><i style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--route)' }} />Registration deadline</span>
        <span><i style={{ width: 3, height: 12, background: 'var(--ink)' }} />Race day</span>
      </div>
    </figure>
  );
}
