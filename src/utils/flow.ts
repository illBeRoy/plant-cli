export class TerminationError {}

export const terminate = () => {
  throw new TerminationError();
};
