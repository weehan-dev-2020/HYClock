const validateEmail = (email) => {
  const matchRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  if (!matchRe) {
    return "error";
  }
  return null;
};

const checkInput = () => {
  const emailElement = document.getElementById("cs-email");
  const contentElement = document.getElementById("cs-content");

  if (contentElement.value === "") {
    return { data: {}, err: "내용을 입력해주세요." };
  }

  if (emailElement.value === "") {
    return { data: {}, err: "이메일을 입력해주세요." };
  } else if (validateEmail(emailElement.value)) {
    return { data: {}, err: "이메일형식에 맞게 입력해주세요." };
  }

  return {
    data: {
      email: emailElement.value,
      content: contentElement.value,
      name: localStorage.getItem("univclock-userName"),
      student_id: localStorage.getItem("univclock-userGrade"),
    },
    err: "",
    inputs: {
      email: emailElement,
      content: contentElement,
    },
  };
};

const submitCS = (e) => {
  const submitButton = document.getElementById("cs-button");
  submitButton.disabled = true;
  const { data, err, inputs } = checkInput();

  if (err) {
    alert(err);
    submitButton.disabled = false;
    return;
  }

  fetch("http://127.0.0.1:8000/suggestion", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    setTimeout(() => {
      alert(
        "학우님의 소중한 의견이 접수되었습니다. 입력해주신 이메일로 진행상황을 보내드리겠습니다."
      );
      inputs.email.value = "";
      inputs.content.value = "";
      submitButton.disabled = false;
    }, 1000);
  });
};

const setCS = () => {
  const submitButton = document.getElementById("cs-button");
  submitButton.addEventListener("click", submitCS);
};

window.addEventListener("load", setCS);
