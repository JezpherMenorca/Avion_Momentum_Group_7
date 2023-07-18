//BACKGROUND
var images = [
    "images/1.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/2.jpg",
  ];
//array of images with URL represented as strings. Each string is a relative path to an image file

  var currentIndex = 0;
  //declare variable currentIndex and initialize it with value of 0. The variable will keep track of current index of image array
  var bgImage = document.getElementById("bg-image");
  //retrieve element from HTMl document with ID 'bg-image' and assign it to variable 'bgImage'
  function changeBackground() {
    bgImage.style.backgroundImage = "url('" + images[currentIndex] + "')";
    currentIndex++;
    if (currentIndex == images.length) {
      currentIndex = 0;
    }
  }
  //changes the background by modifying 'backgroundImage' property of bgImage element's style. 'url'() function is used to specify the image URL.
  //After changing the background image, the 'currnetIndex' is incremented by 1. If 'currentIndex' reaches the length of 'images' array, it is reset to 0 to loop back to the first image

  changeBackground();
  //calls the 'changeBackground' function when the script runs.
  setInterval(changeBackground, 20000);
  //timer
  
  
  //DASHBOARD
  const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  nameElement = document.getElementById("name"),
  focusElement = document.getElementById("focus"),
  content = document.getElementById("content"),
  author = document.getElementById("author");

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  hour = addZero(hour);
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function setBg() {
  let hour = new Date().getHours();

  if (hour < 12) {
    greeting.textContent = "Good Morning, ";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon, ";
  } else {
    greeting.textContent = "Good Evening, ";
  }
}

function updateNameAndFocus() {
  nameElement.addEventListener("input", function () {
    localStorage.setItem("name", nameElement.textContent);
  });

  focusElement.addEventListener("input", function () {
    localStorage.setItem("focus", focusElement.textContent);
  });
}

function getName() {
  if (localStorage.getItem("name") === null) {
    nameElement.textContent = "[Enter Name]";
  } else {
    nameElement.textContent = localStorage.getItem("name");
  }
}

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focusElement.textContent = "[Enter Focus]";
  } else {
    focusElement.textContent = localStorage.getItem("focus");
  }
}

updateNameAndFocus();
getName();
getFocus();

if (
  localStorage.getItem("name") === null &&
  localStorage.getItem("focus") === null
) {
  Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2"],
  })
    .queue([
      {
        title: "Your Name",
      },
      {
        title: "Your Focus",
      },
    ])
    .then((result) => {
      if (result.value) {
        Swal.fire({
          title: "All done!",
          html: `
              <p>Your Name: ${result.value[0]}</p>
              <p>Your Focus: ${result.value[1]}</p>
            `,
          confirmButtonText: "Lovely!",
        });

        localStorage.setItem("name", result.value[0]);
        localStorage.setItem("focus", result.value[1]);

        getName();
        getFocus();
      }
    });
}

axios.get("https://api.quotable.io/random").then((res) => {
  content.textContent = res.data.content;
  author.textContent = res.data.author;
});

function updateQuote() {
  axios.get("https://api.quotable.io/random").then((res) => {
    content.textContent = res.data.content;
    author.textContent = res.data.author;
  });
}

updateQuote();
setInterval(updateQuote, 20000);

showTime();
setBg();

  
  
  //TODO LIST
  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");
  //declare constants (const) that store references to the input box element with the ID "input-box" and the list container element with the ID "list-container". These elements will be used to add new tasks to the todo list.
  
  function addTask() {
    if (inputBox.value === "") {
      alert("Write something");
    } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      listContainer.appendChild(li);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
  }
  
/*
 function, addTask(), is called when the user wants to add a new task. It checks if the value of the inputBox is empty. If it is, an alert message is shown. Otherwise, a new list item (li) element is created. The content of the li element is set to the value of the inputBox. The li element is then appended as a child to the listContainer. Additionally, a delete button (represented by a span element with the text "\u00d7") is created and appended as a child to the li element.

After adding the task, the inputBox value is cleared, and the saveData() function is called to save the updated todo list data.
*/
  listContainer.addEventListener(
    "click",
    function (e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
      } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
      }
    },
    false
  );
/*
This code adds a click event listener to the listContainer. When a click event occurs, the event handler function is called. It checks if the clicked element's tag name is "LI", indicating a task item is clicked. If so, it toggles the "checked" class on the clicked li element, visually marking it as checked or unchecked. After that, the saveData() function is called to save the updated todo list data.

If the clicked element's tag name is "SPAN", indicating the delete button is clicked, the parent element (li) of the clicked span is removed from the listContainer. Again, the saveData() function is called to save the updated todo list data.
*/  
  function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
  }
  //function, saveData(), is responsible for saving the todo list data to the localStorage. It uses the setItem() method to store the innerHTML content of the listContainer element with the key "data" in the localStorage.
  function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
  }
  showTask();
  //showTask() function retrieves the todo list data from the localStorage using the getItem() method and sets the innerHTML of the listContainer element to the retrieved data. This function is called immediately to display the stored todo list data when the script runs.
  const divContainer = document.querySelector("#hideBtn");
  
  let isCLicked = true;
  
  let showOrHide = function () {
    if (isCLicked) {
      divContainer.style.display = "block";
      isCLicked = false;
    } else {
      divContainer.style.display = "none";
      isCLicked = true;
    }
  };
  /*
  This code selects the element with the ID "hideBtn" using document.querySelector(). It declares a variable isClicked and initializes it to true. Then, it defines a function showOrHide(), which is responsible for toggling the display of the divContainer element between "block" and "none" on each click.

  When the function is called, it checks the value of isClicked. If it is true, the divContainer is displayed by setting its display style property to "block" and isClicked is set to false. If isClicked is false, the divContainer is hidden by setting its display style property to "none" and isClicked is set to true.
  */