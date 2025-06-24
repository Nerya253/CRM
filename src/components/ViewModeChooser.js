import React from "react";
import styles from "./ViewModeChooser.module.css";
import { Table, Grid } from "../Pages/Settings";
import { useParams } from "react-router-dom";

export default function ViewModeChooser() {
  const { view } = useParams();

  return (
    <div className={styles.wrapper}>
      {view === "table" && <Table />}
      {view === "grid" && <Grid />}
    </div>
  );
}
