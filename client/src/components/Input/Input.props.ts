import { IInputProps } from 'components/Form/Form.props';

export interface IProps {
	onChange: (value: string, input: string) => void;
	inputName: IInputProps;
}
