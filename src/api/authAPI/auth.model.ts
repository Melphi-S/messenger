export interface SignUpDTO extends Record<string, string> {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignInDTO extends Pick<SignUpDTO, "email" | "password"> {}
