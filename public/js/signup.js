const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const signUpResult = await axios({
      method: "POST",
      url: "https://musicity.herokuapp.com/api/v1/users/signup",
      data: { name, email, password, passwordConfirm },
    })
    if (signUpResult.data.status === "success") {
      alert("signed up successfully!")
      window.setTimeout(() => {
        location.assign("/")
      }, 1500)
    }
  } catch (err) {
    alert(err.response.data)
  }
}

document.querySelector(".signup_form").addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("signup_email").value
  const password = document.getElementById("signup_password").value
  const passwordConfirm = document.getElementById("confirm__password").value

  signUp(name, email, password, passwordConfirm)
})
