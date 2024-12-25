import React from "react";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  let checkedStyle = styles.textContainer;
  if (task.isChecked) {
    checkedStyle += ` ${styles.checked}`;
  }
  return (
    <div className={styles.item}>
      {/* render CheckButton here */}
      <CheckButton checked={task.isChecked} />
      <div className={checkedStyle}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
