import * as React from "react";
import { Reducer } from "react";

type StatusType = "pending" | "resolved" | "rejected";
interface StateType<T> {
  loading: boolean;
  data?: T;
  error?: unknown;
}
interface ActionType<T> {
  type: StatusType;
  data?: T;
  error?: unknown;
}

/**
 * indicate that component already mounted or not
 */
function useIsMounted() {
  const mountedRef = React.useRef<boolean | undefined>(undefined);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

function asyncReducer<T>(
  state: StateType<T>,
  action: ActionType<T>
): StateType<T> {
  switch (action.type) {
    case "pending": {
      return { data: undefined, error: undefined, loading: true };
    }
    case "resolved": {
      return { data: action.data, error: undefined, loading: false };
    }
    case "rejected": {
      return { data: undefined, error: action.error, loading: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/**
 * hooks for executing async tasks manually
 * dependency change => UPDATE callback
 * @param fn
 * @param deps
 * @param initialState
 */
function useAsyncFn<T = any>(
  fn: (...args: any[]) => Promise<T>,
  deps: React.DependencyList,
  initialState: StateType<T> = {
    loading: false,
    error: undefined,
    data: undefined,
  }
) {
  const [state, dispatch] = React.useReducer<
    Reducer<StateType<T>, ActionType<T>>
  >(asyncReducer, initialState);
  const isMounted = useIsMounted();
  const handler = React.useCallback(
    (...args: any[]) => {
      if (isMounted) {
        dispatch({ type: "pending" });
        fn(args).then(
          (data) => {
            dispatch({ type: "resolved", data });
          },
          (error) => {
            dispatch({ type: "rejected", error });
          }
        );
      }
    },
    // Because eslint can't track deps list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  return { ...state, handler };
}

/**
 * hooks for executing async tasks automatically
 * dependency change => UPDATE then EXECUTE callback
 * @param fn
 * @param deps
 */
function useAsync<T = any>(
  fn: (...args: any[]) => Promise<T>,
  deps: React.DependencyList = []
) {
  const { handler, ...state } = useAsyncFn<T>(fn, deps, {
    loading: true,
  });

  React.useEffect(() => {
    handler();
  }, [handler]);

  return state;
}

export { useAsync, useAsyncFn, useIsMounted };
