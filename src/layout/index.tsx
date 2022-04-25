import * as React from "react";
import classNames from "classnames";
import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";
import { PageProps } from "../router/type";

const AppLayout: React.FC<PropsWithChildren<PageProps>> = ({
  title = "Experteer",
  children,
}) => {
  // =========================================
  // Init
  // =========================================
  const content = (
    <div
      className={classNames(
        styles.container,
        "d-flex justify-content-center align-items-center"
      )}
    >
      <div className={styles.bg}/>
      <div className={styles.content}>{children}</div>
    </div>
  );

  React.useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  // =========================================
  // Render
  // =========================================
  return content;
};

export default AppLayout;
