import { useMemo } from "react";
import {
  useAllTasksQuery,
  useProjectsQuery,
} from "../../features/projects/queries";
import Badge from "../../components/ui/Badge/Badge";
import styles from "./Dashboard.module.css";
import { getBadgeLabel } from "../../utility/badge";

const Dashboard = () => {
  const { data: projects = [] } = useProjectsQuery();
  const { data: tasks = [] } = useAllTasksQuery();

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;

    const todo = tasks.filter((task) => task.status === "todo").length;
    const inProgress = tasks.filter(
      (task) => task.status === "in_progress",
    ).length;
    const done = tasks.filter((task) => task.status === "done").length;

    const completionRate = tasks.length
      ? Math.round((done / totalTasks) * 100)
      : 0;

    return {
      totalProjects,
      totalTasks,
      todo,
      inProgress,
      done,
      completionRate,
    };
  }, [projects, tasks]);

  const recentTasks = useMemo(() => {
    return [...tasks].slice(-5).reverse();
  }, [tasks]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h3>Total Projects</h3>
          <p className={styles.big}>{stats.totalProjects}</p>
        </div>

        <div className={styles.card}>
          <h3>Total Tasks</h3>
          <p className={styles.big}>{stats.totalTasks}</p>
        </div>

        <div className={styles.card}>
          <h3>To Do</h3>
          <p className={styles.big}>{stats.todo}</p>
        </div>

        <div className={styles.card}>
          <h3>In Progress</h3>
          <p className={styles.big}>{stats.inProgress}</p>
        </div>

        <div className={styles.card}>
          <h3>Completed</h3>
          <p className={styles.big}>{stats.completionRate}%</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Recent Tasks</h2>
        <ul className={styles.taskList}>
          {recentTasks.map((task) => (
            <li key={task.id} className={styles.taskRow}>
              <span>{task.title}</span>
              <Badge variant={task.status}>{getBadgeLabel(task.status)}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
