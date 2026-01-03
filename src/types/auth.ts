export interface AuthStateInterface {
  user: {
    id: string | undefined;
    email: string | undefined;
  };
  error: string | null;
}
