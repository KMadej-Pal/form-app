import React, { useState, useCallback, useEffect } from 'react';

type FormData = {
  name: string;
  email: string;
  surname: string;
  photo: string;
  age: number;
  workoutDate: string;
};

export const useFormHook = <T extends FormData>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
  const [touched, setTouched] = useState<{ [key in keyof T]?: boolean }>({});

  const validate = useCallback(() => {
    const newErrors: { [key in keyof T]?: string } = {};

    if (!formData['name']) {
      newErrors['name'] = 'First name is required';
    }
    if (!formData['surname']) {
      newErrors['surname'] = 'Last name is required';
    }
    if (!formData['email']) {
      newErrors['email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData['email'])) {
      newErrors['email'] = 'Email is invalid';
    }
    if (!formData['photo']) {
      newErrors['photo'] = 'Photo is required';
    }

    if (!formData['age']) {
      newErrors['age'] = 'Age is required';
    }

    if (!formData['workoutDate']) {
      newErrors['workoutDate'] = 'Date is required';
    }


    setErrors(newErrors);
  }, [formData]);

  const onChange = useCallback(
    (path: keyof T, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [path]: value,
      }));
    },
    []
  );

  const onBlur = useCallback(
    (path: keyof T) => {
      setTouched((prev) => ({
        ...prev,
        [path]: true,
      }));
    },
    []
  );

  useEffect(() => {
    validate();
  }, [formData, validate]);

  const onUpdate = useCallback((newState: T) => {
    setFormData(newState);
  }, []);

  return [formData, errors, touched,{ onChange, onBlur }] as const;
};
