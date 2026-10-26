// Below the at-a-glance strip: key dates as the main column, with how to
// enter, the course and sources alongside.
export default function RaceDetailBody({ main, aside }: { main: React.ReactNode; aside: React.ReactNode }) {
  return (
    <div className="race-body">
      <div className="race-main">{main}</div>
      <div className="race-aside">{aside}</div>
    </div>
  );
}
