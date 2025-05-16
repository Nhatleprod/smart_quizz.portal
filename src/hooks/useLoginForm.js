import { useState } from "react";

export function useLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e, callback) => {
    e.preventDefault();
    if (username && password) {
      callback();
    } else {
      alert("Vui lòng nhập username và password");
    }
  };

  return { username, password, setUsername, setPassword, handleSubmit };
}
