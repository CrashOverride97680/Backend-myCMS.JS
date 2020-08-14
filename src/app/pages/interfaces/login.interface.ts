// INTERFACE LOGIN
// SERVICE LOGIN
export interface accessLoginInterface
{
  auth: boolean;
  admin: boolean;
  token: string;
}

export interface postsInterface {
  title: string;
  type: string;
  date: string;
}
