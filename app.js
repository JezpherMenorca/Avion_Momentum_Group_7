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
  setInterval(changeBackground, 10000);
  //timer
  
  
  //DASHBOARD
  const time = document.getElementById("time"),
    greeting = document.getElementById("greeting"),
    name = document.getElementById("name"),
    focus = document.getElementById("focus"),
    content = document.getElementById("content"),
    author = document.getElementById("author");

    //declare constants (const) that store references to various HTML elements using document.getElementById(). The elements are retrieved based on their respective IDs and assigned to the corresponding variables. These variables will be used to update and display data on the webpage.
  
  function showTime() {
    let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
  //function, showTime(), is responsible for displaying the current time on the webpage. It uses the Date object to retrieve the current hour, minute, and second.
    hour = addZero(hour);
  //The addZero() function is called to ensure the time components have leading zeros if necessary. The formatted time is then assigned to the innerHTML property of the time element.
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
      sec
    )}`;
  
    setTimeout(showTime, 1000);
  }
  // setTimeout() to schedule itself to run every 1000 milliseconds (1 second).
  
  


  function addZero(n) {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  }
  // function, addZero(n), is a utility function that adds a leading zero to a number if it is less than 10. It helps ensure the time components are displayed in a consistent format.
  
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
  //The setBg() function is responsible for setting the appropriate greeting message based on the current time. It retrieves the current hour using the getHours() method of the Date object. Depending on the hour, it sets the textContent of the greeting element accordingly.
  

  function updateNameAndFocus() {
    const nameElement = document.getElementById("name");
    const focusElement = document.getElementById("focus");
  
    nameElement.addEventListener("input", function () {
      localStorage.setItem("name", nameElement.textContent);
    });
  
    focusElement.addEventListener("input", function () {
      localStorage.setItem("focus", focusElement.textContent);
    });
  }
  //This function, updateNameAndFocus(), adds event listeners to the name and focus elements. When the user inputs their name or focus, the event listeners trigger and update the corresponding values in the localStorage.

  function getName() {
    const nameElement = document.getElementById("name");
  
    if (localStorage.getItem("name") === null) {
      nameElement.textContent = "[Enter Name]";
    } else {
      nameElement.textContent = localStorage.getItem("name");
    }
  }
  
  function getFocus() {
    const focusElement = document.getElementById("focus");
  
    if (localStorage.getItem("focus") === null) {
      focusElement.textContent = "[Enter Focus]";
    } else {
      focusElement.textContent = localStorage.getItem("focus");
    }
  }
  //These functions, getName() and getFocus(), retrieve the stored name and focus from the localStorage. If the values are present, they update the corresponding elements' textContent with the retrieved values. Otherwise, they set default text.
  
  updateNameAndFocus();
  
  
  getName();
  getFocus();
  
  if (
    localStorage.getItem("name") === null &&
    localStorage.getItem("focus") === null
  ) {
    //This if statement checks if the name and focus values in the localStorage are null, indicating that the user has not entered their name and focus yet.
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      progressSteps: ["1", "2"],
    })
    //initializes a SweetAlert2 (Swal) instance with custom settings. It configures the Swal instance to display two input fields of type "text" for user input. The "Next" button is displayed with a right arrow (&rarr;) as the confirmation button text. The progressSteps option indicates the progress steps of the Swal instance and is set to ["1", "2"].
      .queue([
        {
          title: "Your Name",
        },
        {
          title: "Your Focus",
        },
      ])
      //The queue() function is called on the Swal instance, providing an array of objects as input. Each object represents a step in the Swal sequence. In this case, there are two steps: one for entering the name and one for entering the focus. Each step is defined with a title property specifying the title of the step.
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
          /*
          The then() function is chained to the queue() function. It specifies a callback function that will be executed when the user submits the Swal sequence by clicking the confirmation button. The callback function receives the result object as a parameter.
          Within the callback function, an if statement checks if result.value is truthy, indicating that the user has entered values in both input fields.

          If the user has entered values, this code displays another Swal alert using the Swal.fire() function. The alert shows a title of "All done!" and the user's entered name and focus as paragraphs in the html option. The confirmation button text is set to "Lovely!".
          */
  
          localStorage.setItem("name", result.value[0]);
          localStorage.setItem("focus", result.value[1]);
          //These lines store the user's entered name and focus in the localStorage using the setItem() method. The first parameter specifies the key ("name" and "focus") under which the values are stored, and the second parameter provides the corresponding values from result.value.
          
          getName();
          getFocus();
          //calling the getName and getFocus function.
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
  setInterval(updateQuote, 6000);
  
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