const fuc = async function () {
  await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      id: 12,
      title: "foo",
      completed: "bar",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((json) => console.log(json));
  // console.log(fuc);
};
fuc();
newUser = {
  userId: userId.value,
  id: id.value,
  title: title.value,
  completed: completed.value,
};
data.push(newUser);
app._renderUser(data);
app._setLocalStorage();
//   console.log(newUser);
const createNew = document.querySelector(".createNewUser");
createNew.innerHTML = "";
