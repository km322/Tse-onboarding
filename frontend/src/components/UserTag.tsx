import { User } from "src/api/users";
import styles from "src/components/UserTag.module.css";

export interface UserTagProps {
  assignee?: User;
  className?: string;
}

export function UserTag({ assignee, className }: UserTagProps) {
  return (
    <div className={`${styles.userTag} ${className || ""}`.trim()}>
      {assignee ? (
        <>
          <img
            className={styles.image}
            src={assignee?.profilePictureURL || "/userDefault.svg"}
            alt="User Profile"
            onError={(e) => (e.currentTarget.src = "/userDefault.svg")}
          />
          <span className={styles.userName}>{assignee.name}</span>
        </>
      ) : (
        <span className={styles.userName}>Not assigned</span>
      )}
    </div>
  );
}
