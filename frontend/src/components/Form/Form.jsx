import { useState } from 'react';
import Button from '../Button/Button';
import './Form.css';

function buildInitialState(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? '';
    return acc;
  }, {});
}

export default function Form({
  fields,
  submitText,
  onSubmit,
  loading = false,
  error = null,
  success = false,
  successMessage = 'Готово!',
  resetOnSuccess = true,
}) {
  const [values, setValues] = useState(() => buildInitialState(fields));
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const errors = {};
    for (const field of fields) {
      const value = values[field.name];
      if (field.required && (!value || String(value).trim() === '')) {
        errors[field.name] = 'Поле обязательно';
        continue;
      }
      if (field.validate) {
        const message = field.validate(value);
        if (message) errors[field.name] = message;
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    try {
      await onSubmit(values);
      if (resetOnSuccess) {
        setValues(buildInitialState(fields));
      }
    } catch {
      // сообщение покажем из пропса error
    }
  }

  return (
    <form noValidate className="form" onSubmit={handleSubmit}>
      {fields.map((field) => {
        const invalid = Boolean(fieldErrors[field.name]);
        const inputId = `field-${field.name}`;
        const InputTag = field.as === 'textarea' ? 'textarea' : 'input';

        return (
          <div className="form__field" key={field.name}>
            <label htmlFor={inputId} className="form__label">
              {field.label}
              {field.required && <span className="form__required">*</span>}
            </label>
            <InputTag
              id={inputId}
              className={`form__input${invalid ? ' form__input--error' : ''}`}
              type={field.type ?? 'text'}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(event) => handleChange(field.name, event.target.value)}
              disabled={loading}
              rows={field.as === 'textarea' ? 4 : undefined}
            />
            {invalid && (
              <span className="form__error">{fieldErrors[field.name]}</span>
            )}
          </div>
        );
      })}

      {error && <div className="form__alert form__alert--error">{error}</div>}
      {success && (
        <div className="form__alert form__alert--success">{successMessage}</div>
      )}

      <Button type="submit" size="full" disabled={loading}>
        {loading ? 'Отправляем…' : submitText}
      </Button>
    </form>
  );
}
