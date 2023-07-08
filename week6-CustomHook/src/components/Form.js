import React from "react";
import { useForm } from "react-hook-form";
import useInputs from "../Hooks/UseInputs";

const Form = () => {
  const initialForm = {
    id: "",
    password: "",
    rePassword: "",
  };

  // customHook useInputs 사용해서 form, onChange, reset 가져옴
  const [form, onChange, reset] = useInputs(initialForm);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  // useForm 훅 사용
  // register -> 입력 필드 등록, 검증 규칙 설정
  // watch -> 입력 필드 값 관찰

  const password = watch("password");
  const rePassword = watch("rePassword");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          // register 입력 필드와 관련된 유효성 검사 규칙 및 기본값 설정
          {...register("id", {
            required: "아이디를 입력해주세요.",
            // 유효성 검사
            // value 정규식 패턴 전달
            // message 에러 메시지
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: "아이디는 영문 대소문자와 숫자로만 이루어져야 합니다.",
            },
          })}
          onChange={onChange}
          // form 데이터와 바인딩, 에러 표시하기 위함
          value={form.id}
        />
        {errors.id && <p>{errors.id.message}</p>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다.",
            },
          })}
          onChange={onChange}
          value={form.password}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="rePassword">비밀번호 재입력</label>
        <input
          type="password"
          id="rePassword"
          {...register("rePassword", {
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
          onChange={onChange}
          value={form.rePassword}
        />
        {errors.rePassword && <p>{errors.rePassword.message}</p>}
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default Form;
