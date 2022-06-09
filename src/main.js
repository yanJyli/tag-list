let addTag = document.querySelector(".input");
let addButton = document.querySelector(".button");
let tag = document.querySelector(".tag");

let tagList = [];

if (localStorage.getItem("tag")) {
  tagList = JSON.parse(localStorage.getItem("tag"));
  displayTagList();
}

function displayTagList() {
  let displayTag = "";
  if (tagList.length === 0) tag.innerHTML = "";
  tagList.forEach(function (item, i) {
    displayTag += `
    <li class="tag_item">
    <input type="checkbox" id='item_${i}' ${item.readonly ? "checked" : ""}/>
    <label for='item_${i}'>${item.tag}</label>
    <button id='button_${i}' onclick="removeTag(${i})">x</button>
    </li>
    `;
    tag.innerHTML = displayTag;
  });
}

addButton.addEventListener("click", () => {
  let newTag = {
    tag: addTag.value,
    readonly: false,
  };
  tagList.push(newTag);
  displayTagList();
  localStorage.setItem("tag", JSON.stringify(tagList));
  addTag.value = "";
});

tag.addEventListener("change", (event) => {
  let idInput = event.target.getAttribute("id");
  let forLabel = document.querySelector("[for=" + idInput + "]");
  let valueLabel = forLabel.innerHTML;

  tagList.forEach(function (item) {
    if (item.tag === valueLabel) {
      item.readonly = !item.readonly;
      localStorage.setItem("tag", JSON.stringify(tagList));
      //readonly - нельзя удалить
      disabledButton();      
    }
  });
});

function removeTag(i) {
  tagList.splice(i, 1);
  localStorage.setItem("tag", JSON.stringify(tagList));
  displayTagList();
}

function disabledButton (e) {
  // let button = document.querySelectorAll("button");

  // for (let i = 0; i < button.length; i++) {
  // button[i].addEventListener("click", function (e) {
  //   console.log(e.target.getAttribute("id"));
  //   let deleteTag = e.target.getAttribute("id");

  //   tagList.forEach(function (item, i) {
  //     if (`button_${i}` === deleteTag) {
  //       button[i].disabled = true
  //     }
  //   });
  // });
  // }
}