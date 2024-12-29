import { useState } from "react";
import { Link } from "react-router-dom";
import { Task, updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    // your code here
    setLoading(true);
    updateTask({ ...task, assignee: task.assignee?._id, isChecked: !task.isChecked })
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          alert(result.error);
        }
        setLoading(false);
      })
      .catch((reason) => alert(reason));
  };

  let checkedStyle = styles.textContainer;
  if (task.isChecked) {
    checkedStyle += ` ${styles.checked}`;
  }
  return (
    <div className={styles.item}>
      {/* render CheckButton here */}
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div className={styles.boarder}>
        <div className={checkedStyle}>
          <Link to={`/task/${task._id}`} className={styles.title}>
            {task.title}
          </Link>
          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>
        <div className={styles.width}>
          <UserTag assignee={task.assignee} />
        </div>
      </div>
    </div>
  );
}
