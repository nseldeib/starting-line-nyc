export default function CourseNote({ text }: { text: string }) {
  return (
    <section className="course" aria-labelledby="course">
      <h2 id="course">The course</h2>
      <p>{text}</p>
    </section>
  );
}
