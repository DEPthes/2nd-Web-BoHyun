import { useState, useCallback } from "react";

const UseInputs = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  // useCallback -> memoization
  const onChange = useCallback((e) => { 
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
};

export default UseInputs;
