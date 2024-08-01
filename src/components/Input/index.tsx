import React, { InputHTMLAttributes, useState, useCallback } from "react";
import { IconBaseProps } from 'react-icons';
import { Container, Error } from "./styles";
import { FieldProps } from 'formik';
import { FiAlertCircle } from "react-icons/fi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps & FieldProps> = ({
  field,
  form: { touched, errors },
  icon: Icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(!!field.value);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!field.value);
  }, [field.value]);

  const hasError = touched[field.name] && errors[field.name];

  return (
    <Container isFilled={isFilled} isFocused={isFocused} hasError={!!hasError}>
      {Icon && <Icon size={20} />}
      <input
        {...field}
        {...rest}
        className={hasError ? 'is-invalid' : ''}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {hasError && (
        <Error>
          <div>
            <FiAlertCircle size={20} />
            <span>
              {String(errors[field.name])}
              <div></div>
            </span>
          </div>
        </Error>
      )}
    </Container>
  );
}

export default Input;
