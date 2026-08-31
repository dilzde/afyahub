interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  qualifications: string[];
  image: string;
  isCofounder: boolean;
}

export default function Cofounders({ doctors }: { doctors: Doctor[] }) {
  const cofounders = doctors.filter((d) => d.isCofounder).sort((a, b) => (a as any).order - (b as any).order);

  return (
    <section className="cofounders" id="cofounders">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="overline">Our Founders</p>
          <h2 className="h2">The people behind AfyaHub</h2>
          <p>
            AfyaHub was built by clinicians who believe Nairobi deserves specialist care that
            feels personal. Meet the founders who made it happen.
          </p>
        </div>
        <div className="cofounders-grid" data-reveal="">
          {cofounders.map((doctor) => (
            <div className="cofounder-card" key={doctor.id}>
              <div className="cofounder-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={doctor.image} alt={doctor.name} loading="lazy" />
              </div>
              <div className="cofounder-body">
                <p className="cofounder-role">{doctor.title}</p>
                <h3 className="cofounder-name">{doctor.name}</h3>
                <p className="cofounder-specialty">{doctor.specialty}</p>
                <p className="cofounder-bio">{doctor.bio}</p>
                <ul className="cofounder-quals">
                  {doctor.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
