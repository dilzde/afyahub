"use client";

interface DoctorAvatarProps {
  name: string;
  image?: string;
  className?: string;
  aspectRatio?: string;
  showBadge?: boolean;
}

function getInitials(name: string): string {
  const parts = name.replace(/^Dr\.\s+/i, "").trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "MD";
}

export default function DoctorAvatar({
  name,
  image,
  aspectRatio = "4/3",
  showBadge = true,
}: DoctorAvatarProps) {
  if (image && image.trim().length > 0) {
    return (
      <div
        style={{
          aspectRatio,
          overflow: "hidden",
          position: "relative",
          width: "100%",
          background: "var(--paper-soft)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  const initials = getInitials(name);

  return (
    <div
      style={{
        aspectRatio,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #F4F1EC 0%, #EAE5DD 100%)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Decorative background circle */}
      <div
        style={{
          position: "absolute",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: "rgba(196, 86, 58, 0.08)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Doctor Icon / Initials */}
      <div
        style={{
          width: "68px",
          height: "68px",
          borderRadius: "50%",
          background: "var(--white)",
          boxShadow: "0 8px 24px rgba(29, 29, 31, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          fontSize: "1.4rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          zIndex: 1,
          border: "2px solid rgba(196, 86, 58, 0.2)",
        }}
      >
        {initials}
      </div>

      {showBadge && (
        <span
          style={{
            marginTop: "0.8rem",
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
            padding: "0.25rem 0.65rem",
            borderRadius: "980px",
            border: "1px solid var(--line)",
            zIndex: 1,
          }}
        >
          Photo Pending
        </span>
      )}
    </div>
  );
}
