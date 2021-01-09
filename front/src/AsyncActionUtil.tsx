import { ToDoState } from "./TodoContext";

function createAsyncDispatcher(type: string, promiseFn: Function) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  async function actionHandler(dispatch: Function, ...rest: object[]) {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest);
      dispatch({
        type: SUCCESS,
        data,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e,
      });
    }
  }
  return actionHandler;
}

type StateForm = {
  loading: boolean;
  data: any;
  error: null | Error;
};

const initialAsyncState: StateForm = {
  loading: false,
  data: null,
  error: null,
};

const loading = (): StateForm => ({
  loading: true,
  data: null,
  error: null,
});

const success = (data: any): StateForm => ({
  loading: false,
  data,
  error: null,
});

const error = (error: Error): StateForm => ({
  loading: false,
  data: null,
  error: error,
});

function createAsyncHandler(type: string, key: string) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  function handler(state: ToDoState, action: any) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loading(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error),
        };
      default:
        return state;
    }
  }
  return handler;
}

export { initialAsyncState, createAsyncDispatcher, createAsyncHandler };
export type { StateForm };
