const tablelist = document.querySelector(".tableContainer");
let data;
let editform;
class App {
  #newData = [];
  constructor() {
    this._loadData();
  }
  async _loadData() {
    const kanta = await fetch("https://jsonplaceholder.typicode.com/todos");
    let arr = await kanta.json();
    arr = arr.slice(0, 10);
    data = arr;
    console.log(data);
    // this._setLocalStorage();
    this._getLocalStorage();
  }
  renderDelete(e) {
    const idAttribute = e.target.getAttribute("data-id");
    const object = data.findIndex((obj) => {
      return obj.id == idAttribute;
    });
    data.splice(object, 1);
    console.log(data);
    this._renderUser(data);
    const iconEvent = document.querySelectorAll(".iconDisplay");
    iconEvent.forEach((i) =>
      i.addEventListener("click", this.renderDelete.bind(this))
    );
    console.log(iconEvent);
    this._setLocalStorage();
  }
  edit(e) {
    const idAttribute = e.target.getAttribute("data-id");
    console.log(idAttribute);
    const idx = data.findIndex((obj) => {
      return obj.id == idAttribute;
    });
    const titleData = document.querySelector(`.title-${idx + 1}`);
    console.log(titleData);
    titleData.innerHTML = "";
    const html = `
    <input type="text" class="editform" placeholder="title" />`;
    titleData.insertAdjacentHTML("beforeend", html);
    editform = document.querySelector(".editform");
    editform.addEventListener("keydown", function (e) {
      console.log(e);
      if (e.key !== "Enter") return;
      mani.manikanta(idx);
    });
  }
  manikanta(idx) {
    data[idx].title = editform.value;
    console.log(data);
    tablelist.innerHTML = "";
    this._renderUser(data);
    this._setLocalStorage();
  }
  _renderUser(dataItems) {
    tablelist.innerHTML = "";
    const headingHTML = `
    <tr class="heading-row">
          <th class="userid">USERID</th>
          <th class="id">ID<iconify-icon class="id__sort-Ascending" icon="uil:sort-amount-down"></iconify-icon>
            <iconify-icon class="id__sort-Descending" icon="uil:sort-amount-up"></th>
          <th class="title">TITLE<iconify-icon class="title__sort-Ascending" icon="uil:sort-amount-down"></iconify-icon>
          <iconify-icon class="title__sort-Descending" icon="uil:sort-amount-up"></th>
          <th>
            DELETE
          </th>
          <th>EDIT</th>
          <th class="completed">COMPLETED</th>
        </tr>`;
    tablelist.insertAdjacentHTML("beforeend", headingHTML);
    dataItems.forEach(function (data) {
      const html = `
        <tbody class="removable">
            <tr >
                <th class="userid">${data.userId}</th>
                <th class="id">${data.id}</th>
                <th class="title-${data.id}">${data.title}</th>
              
                <th>
                <iconify-icon class="iconDisplay" data-id=${data.id} icon="ic:round-delete-outline"></iconify-icon>
                </th>
                <th>
                    <iconify-icon class="iconEdit" data-id="${data.id}" icon="material-symbols:edit"></iconify-icon>
                </th>
                <th class="completed">${data.completed}</th>
            </tr>
        </tbody>`;

      tablelist.insertAdjacentHTML("beforeend", html);
    });
    const iconEvent = document.querySelectorAll(".iconDisplay");
    const iconEdit = document.querySelectorAll(".iconEdit");
    const searchBox = document.querySelector(".searchbox");
    const idSortAscending = document.querySelector(".id__sort-Ascending");
    const idSortDescending = document.querySelector(".id__sort-Descending");
    const titleSortAscending = document.querySelector(".title__sort-Ascending");
    const titleSortDescending = document.querySelector(
      ".title__sort-Descending"
    );
    document.getElementById("createUser").onclick = this._createUser;
    iconEvent.forEach((i) =>
      i.addEventListener("click", this.renderDelete.bind(this))
    );
    iconEdit.forEach((i) => i.addEventListener("click", this.edit.bind(this)));
    searchBox.addEventListener("input", this._searchData);
    idSortAscending.addEventListener("click", this._idsortAscending);
    idSortDescending.addEventListener("click", this._idsortDescending);
    titleSortAscending.addEventListener("click", this._titlesortAscending);
    titleSortDescending.addEventListener("click", this._titlesortDescending);
  }
  _titlesortAscending() {
    //   data=data.sort();
    console.log("title Ascending");
    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
    data.sort(compare);
    mani._renderUser(data);
  }
  _titlesortDescending() {
    //   data=data.sort();
    console.log("title Descending");
    function compare(a, b) {
      if (a.title > b.title) {
        return -1;
      }
      if (a.title < b.title) {
        return 1;
      }
      return 0;
    }
    data.sort(compare);
    mani._renderUser(data);
  }
  _idsortAscending() {
    function compare(a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    }
    data.sort(compare);
    mani._renderUser(data);
  }
  _idsortDescending() {
    function compare(a, b) {
      if (a.id > b.id) {
        return -1;
      }
      if (a.id < b.id) {
        return 1;
      }
      return 0;
    }
    data.sort(compare);
    mani._renderUser(data);
  }
  _createUser(e) {
    console.log("manikantareddy");
    const userHTML = `
        <tr class="heading-row">
            <th class="userid">
                <input type="text" class="create-userid" placeholder="USERID" />
            </th>
            <th class="id">
                <input type="text" class="create-id" placeholder="ID" />
            </th>
            <th class="title">
                <input type="text" class="create-title" placeholder="TITLE" />
            </th>
            <th class="completed">
                <input type="text" class="create-completed" placeholder="COMPLETED" />
            </th>
        </tr>
    
    `;
    const searchAndCreate = document.querySelector(".createNewUser");
    searchAndCreate.insertAdjacentHTML("beforeend", userHTML);
    const completed = document.querySelector(".create-completed");
    const userId = document.querySelector(".create-userid");
    const id = document.querySelector(".create-id");
    const title = document.querySelector(".create-title");
    let newUser;
    completed.addEventListener("keydown", function (e) {
      console.log(e.key);
      if (e.key !== "Enter") return;
      newUser = {
        userId: userId.value,
        id: id.value,
        title: title.value,
        completed: completed.value,
      };
      data.push(newUser);
      mani._renderUser(data);
      mani._setLocalStorage();
      //   console.log(newUser);
      const createNew = document.querySelector(".createNewUser");
      createNew.innerHTML = "";
    });
  }
  _searchData(e) {
    let searchData = data;
    searchData = searchData.filter((user) =>
      user.title.includes(e.target.value)
    );
    mani._renderUser(searchData);
  }
  _setLocalStorage() {
    localStorage.setItem("data", JSON.stringify(data));
  }
  _getLocalStorage() {
    const todoData = JSON.parse(localStorage.getItem("data"));
    if (!todoData) return;
    data = todoData;
    this._renderUser(data);
  }
}
const mani = new App();

// console.log(data);
