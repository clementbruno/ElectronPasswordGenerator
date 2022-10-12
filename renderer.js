const func = async () => {
  const response = await window.versions.ping();
  console.log(response);

  document
    .querySelector(".btn-generator")
    .addEventListener("click", insertPassword);

  document.querySelector(".btn-save").addEventListener("click", savePassword);
};

function insertPassword() {
  const password = generatePassword();

  document.querySelector("input").value = password;
}

function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()";
  const majChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 14;
  let password = "";

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  const allAuthorizedChars = shuffle([chars, numbers, specialChars, majChars]);
  console.log(allAuthorizedChars);

  while (true) {
    for (let i = 0; i < allAuthorizedChars.length; i++) {
      password +=
        allAuthorizedChars[i][
          array[password.length] % allAuthorizedChars[i].length
        ];
      if (password.length === length) {
        return password;
      }
    }
  }
}

function savePassword() {
  const password = document.querySelector("input").value;

  navigator.clipboard
    .writeText(password)
    .then((_res) =>
      alert(`Your password was successfully copied to the clipboard!`)
    );
}

// Fisher-Yates Shuffle - Copied from https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

func();
