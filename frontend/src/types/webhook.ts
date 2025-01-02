export interface Request {
  id: string;
  method: string;
  url: string;
  timestamp: Date;
  headers: Record<string, string>;
  body: string;
}
