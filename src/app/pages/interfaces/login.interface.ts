// INTERFACE LOGIN
export interface loginForm
{
    email: String;
    password: String;
    session: Boolean;
    debug: Boolean;
}

// SERVICE LOGIN
export interface accessLogin
{
  auth: Boolean;
  admin: Boolean;
  token: String;
}
