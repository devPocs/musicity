const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:4040/api/v1/logout",
    })
    if ((res.data.status = "success")) {
      location.replace("/")
    }
  } catch (error) {
    alert("an error occured")
    console.log(error)
  }
}

document.querySelector(".logout_button").addEventListener("click", () => {
  logout()
})
