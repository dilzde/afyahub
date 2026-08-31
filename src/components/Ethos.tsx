export default function Ethos({ ethosImage }: { ethosImage: string }) {
  return (
    <section className="ethos">
      <div className="wrap" data-reveal="">
        <div className="ethos-inner">
          <div>
            <blockquote>
              &ldquo;We started AfyaHub so Kenyan families wouldn&apos;t have to choose between{" "}
              <strong>care that&apos;s close</strong> and care that&apos;s{" "}
              <strong>world-class</strong>.&rdquo;
            </blockquote>
            <cite>AfyaHub founding team</cite>
          </div>
          <div className="ethos-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ethosImage} alt="Healthcare professional providing care" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
