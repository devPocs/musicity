const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://musicity.herokuapp.com/api/v1/logout",
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
