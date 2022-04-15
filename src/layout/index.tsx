import * as React from "react";
import classNames from "classnames";
import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";
import { PageProps } from "../router/type";
import { ReactComponent as Spinner } from "../assets/spinner.svg";
import { setSession } from "../redux/slice/user";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAsync } from "../hooks/async";

const AppLayout: React.FC<PropsWithChildren<PageProps>> = ({
  title = "Experteer",
  children,
}) => {
  // =========================================
  // Init
  // =========================================
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.user.session);
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
  const loadingComponent = (
    <div className={styles.spinner}>
      <Spinner />
    </div>
  );

  // =========================================
  // Handler
  // =========================================
  const { loading } = useAsync(async () => {
    if (!session) {
      await dispatch(setSession()).unwrap();
    }
  }, [dispatch, session]);

  React.useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  // =========================================
  // Render
  // =========================================
  return loading ? loadingComponent : content;
};

export default AppLayout;
