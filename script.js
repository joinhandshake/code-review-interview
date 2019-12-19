const input = document.querySelector("#typeahead");
const suggestions = document.querySelector("#suggestions");
let selectedIndex = 0;

input.addEventListener("keyup", event => {
  const query = event.target.value;

  if (event.key === "ArrowDown") {
    updateSelectedUser(1);
  } else if (event.key === "ArrowUp") {
    updateSelectedUser(-1);
  } else if (event.key === "ArrowUp") {
    const username = document.querySelector(".selected").innerText;
    window.open(`http://github.com/${username}`);
  } else {
    // Makes a GET request to the following endpoint. The second .then()
    // provides the response JSON as its first argument.
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(response => response.json())
      // Shape of JSON: { items: User[] }
      .then(json => {
        selectedIndex = 0;
        suggestions.innerHTML = "";

        json.items.forEach((user, index) =>
          suggestions.appendChild(buildSuggestionHTML(user, index))
        );
      });
  }
});

function updateSelectedUser(position) {
  selectedIndex += position;
  document.querySelector(".selected").setAttribute("class", null);
  document.querySelectorAll("tr")[selectedIndex].setAttribute("class", "selected");
}

// Creates the following markup:
//
// <tr>
//   <td>
//     <img src={user.avatar_url} />
//   </td>
//   <tr>
//     {user.login}
//   </tr>
// </tr>
function buildSuggestionHTML(user, index) {
  const avatarTd = document.createElement("td");
  const avatarImg = document.createElement("img");
  avatarImg.setAttribute("src", user.avatar_url);
  avatarTd.appendChild(avatarImg);

  const nameTd = document.createElement("td");
  nameTd.textContent = user.login;

  const row = document.createElement("tr");
  row.appendChild(avatarTd);
  row.appendChild(nameTd);

  if (index === selectedIndex) {
    row.setAttribute("class", "selected");
  }

  return row;
}
