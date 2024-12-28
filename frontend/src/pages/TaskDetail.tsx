import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((result) => {
          if (result.success) {
            setTask(result.data);
          }
        })
        .catch((reason) => alert(reason));
    }
  }, [id]);
  return (
    <Page>
      <Helmet>{task && <title>{task.title} | TSE Todos</title>}</Helmet>
      <Link to="/">Back to home</Link>
      {!task && (
        <div className={styles.titleRow}>
          <span className={styles.formTitle}>This task doesn&apos;t exist!</span>
        </div>
      )}
      {task && (
        <div className={styles.titleRow}>
          <span className={styles.formTitle}>{task.title}</span>
          <Button kind="primary" type="button" data-testid="task-edit-button" label="Edit Task" />
        </div>
      )}
      {task && task.description && <span className={styles.description}> {task.description}</span>}
      {task && !task.description && <span className={styles.description}> (no descripton)</span>}
      {task && (
        <div className={styles.fieldRow}>
          <span className={styles.title}>Assignee</span>
          <span>
            {task.assignee && <span className={styles.Assignee}>{task.assignee.name}</span>}
            {!task.assignee && <span className={styles.Assignee}>Not assigned</span>}
          </span>
        </div>
      )}
      {task && (
        <div className={styles.fieldRow}>
          <span className={styles.title}>Status</span>
          {task.isChecked && <span className={styles.description}>Not done</span>}
          {!task.isChecked && <span className={styles.description}>Done</span>}
        </div>
      )}
      {task && (
        <div className={styles.fieldRow}>
          <span className={styles.title}>Date created</span>
          <span className={styles.description}>
            {new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(
              task.dateCreated,
            )}
          </span>
        </div>
      )}
    </Page>
  );
}
