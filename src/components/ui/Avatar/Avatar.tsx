import { useState } from "react";
import styles from "./Avatar.module.css";

type Size = "sm" | "md" | "lg";

type Props = {
  email?: string | null;
  src?: string | null;
  size?: Size;
  title?: string;
};

const getInitials = (email?: string | null) => {
  if (!email) return "?";
  const name = email.split("@")[0] || "";
  const parts = name.split(/[.\-_]/).filter(Boolean);

  const first = parts[0]?.[0] ?? name[0] ?? "?";
  const second = parts[1]?.[0] ?? name[1] ?? "";

  return (first + second).toUpperCase();
};

const Avatar = ({ email, src, size = "md", title }: Props) => {
  const [imgError, setImgError] = useState(false);

  const showImage = Boolean(src && !imgError);

  return (
    <span
      className={`${styles.avatar} ${styles[size]}`}
      title={title ?? email ?? ""}
    >
      {showImage ? (
        <img
          src={src!}
          alt={email ?? "User avatar"}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.initials}>{getInitials(email)}</span>
      )}
    </span>
  );
};

export default Avatar;
