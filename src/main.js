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
    <p>readonly</p>
    <input type="checkbox" id='item_${i}' ${item.readonly ? "checked" : ""}/>
    <label for='item_${i}' class="label">${item.tag}</label>
    <button id='button_${i}' onclick="removeTag(${i})" class="button__remove">✖</button>
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

  tagList.forEach(function (item, i) {
    if (item.tag === valueLabel) {
      item.readonly = !item.readonly;

      let button = document.querySelectorAll("button");
      if (item.readonly === true) {
        button[i + 1].disabled = true;
      } else button[i + 1].disabled = false;

      localStorage.setItem("tag", JSON.stringify(tagList));
    }
  });
});

function removeTag(i) {
  tagList.splice(i, 1);
  localStorage.setItem("tag", JSON.stringify(tagList));
  displayTagList();
}
