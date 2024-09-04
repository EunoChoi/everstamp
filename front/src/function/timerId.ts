let timerId: NodeJS.Timeout | null = null;

export const setTimerId = (id: NodeJS.Timeout | null) => {
  timerId = id;
};
export const getTimerId = () => timerId;