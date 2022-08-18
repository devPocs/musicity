const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:4040/api/v1/users/login",
      data: { email, password },
    })
    if ((result.data.status = "success")) {
      alert("logged in successfully")
      window.setTimeout(() => {
        location.assign("/")
      }, 1500)
    }
  } catch (err) {
    console.log(err.response.data)

    document.write(err.response.data)
  }
}

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  login(email, password)
})
