"use server";

async function registerAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const data = { email, password, username };
  //   console.log("formDataAAAAAAAAAAA", data);

  const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await res.json();
  return resData;
}
export { registerAction };
