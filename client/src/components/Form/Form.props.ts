export interface IFormState {
  username: IInputProps;
  email: IInputProps;
  birthday: IInputProps;
  phone: IInputProps;
  message: IInputProps;
}

export interface IInputProps {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
  label: string;
  valide: boolean;
  touched: boolean;
}

export interface IUserDto {
  username: string;
  email: string;
  birthday: string;
  phone: string;
  message: string;
}

export interface IMessage {
  text: string;
  status: boolean;
}
