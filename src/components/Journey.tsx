const steps = [
  { num: "1", title: "Request", desc: "Send your booking request with your details and preferred service. Takes under two minutes." },
  { num: "2", title: "Confirmation", desc: "Our team confirms your slot by email or phone — typically within one working day." },
  { num: "3", title: "Consultation", desc: "Meet your consultant, get assessed, and receive any preparation instructions in writing." },
  { num: "4", title: "Procedure & follow-up", desc: "Your procedure, your recovery plan, and a scheduled follow-up to close the loop." },
];

export default function Journey() {
  return (
    <section className="journey" id="visit">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="overline">Your visit</p>
          <h2 className="h2">From request to recovery</h2>
          <p>Four steps, no mystery. Here&apos;s exactly what happens after you press send.</p>
        </div>
        <div className="steps" data-reveal="">
          {steps.map((s) => (
            <div className="step" key={s.num}>
              <div className="step-dot">{s.num}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
