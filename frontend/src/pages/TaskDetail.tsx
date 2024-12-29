import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      getTask(id)
        .then((result) => {
          if (result.success) {
            setTask(result.data);
          }
          setLoading(false);
        })
        .catch((reason) => alert(reason));
    }
  }, [id]);

  const handleSubmit = () => {
    setEditing(true);
  };

  const handleSave = (updateTask: Task) => {
    setLoading(true);
    setTask(updateTask);
    window.location.reload();
    setEditing(false);
    setLoading(false);
  };

  return (
    <Page>
      <Helmet>{task && <title>{task.title} | TSE Todos</title>}</Helmet>
      <Link to="/">Back to home</Link>
      {!isEditing && !task && (
        <div className={styles.titleRow}>
          <span className={styles.formTitle}>This task doesn&apos;t exist!</span>
        </div>
      )}
      {!isEditing && task && (
        <div className={styles.titleRow}>
          <span className={styles.formTitle}>{task.title}</span>
          <Button
            kind="primary"
            type="button"
            data-testid="task-edit-button"
            label="Edit Task"
            disabled={isLoading}
            onClick={handleSubmit}
          />
        </div>
      )}
      {!isEditing && task && task.description && (
        <span className={styles.description}> {task.description}</span>
      )}
      {!isEditing && task && !task.description && (
        <span className={styles.description}> (no descripton)</span>
      )}
      {!isEditing && task && (
        <div className={styles.fieldRow}>
          <span className={styles.title}>Assignee</span>
          <UserTag assignee={task.assignee} />
        </div>
      )}
      {!isEditing && task && (
        <div className={styles.fieldRow}>
          <span className={styles.title}>Status</span>
          {task.isChecked && <span className={styles.description}>Done</span>}
          {!task.isChecked && <span className={styles.description}>Not done</span>}
        </div>
      )}
      {!isEditing && task && (
        <div className={styles.fieldRow}>
          <span className={styles.title}>Date created</span>
          <span className={styles.description}>
            {new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(
              task.dateCreated,
            )}
          </span>
        </div>
      )}
      {isEditing && task && <TaskForm mode="edit" task={task} onSubmit={handleSave} />}
    </Page>
  );
}
