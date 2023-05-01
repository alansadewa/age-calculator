const inputDiv = document.querySelectorAll("div[id='input']");
const inputValue = document.querySelectorAll("input[type='number']");
const result = document.querySelectorAll('span');
const date = new Date();

//To change the color of the element to the default in case an error occured
inputDiv.forEach(index =>{
    index.addEventListener("change", function(){
        index.children[0].style.color = "hsl(0, 1%, 44%)";
        index.children[1].style.border = "1px solid hsl(0, 0%, 86%)";
        index.children[2].style.display = "none";
    });
});

//When the button is clicked
document.getElementById("submit").onclick = function(event){
    event.preventDefault();
    
    // Error Validation
    inputDiv.forEach(index => {
        if(index.children[1].value === ""){
            index.children[0].style.color = "hsl(0, 100%, 67%)";
            index.children[1].style.border = "1px solid hsl(0, 100%, 67%)";
            index.children[2].style.display = "block";
            throw new Error("Input cannot be empty");
        }
    });

    if(inputValue[0].value > 31 || inputValue[0].value <= 0){
        inputDiv[0].children[0].style.color = "hsl(0, 100%, 67%)";
        inputDiv[0].children[1].style.border = "1px solid hsl(0, 100%, 67%)";
        inputDiv[0].children[2].style.display = "block";
        inputDiv[0].children[2].textContent = "Must be a valid day";
        throw new Error("Error: number of day is not valid");
    }

    if(inputValue[1].value <= 0 || inputValue[1].value > 12){
        inputDiv[1].children[0].style.color = "hsl(0, 100%, 67%)";
        inputDiv[1].children[1].style.border = "1px solid hsl(0, 100%, 67%)";
        inputDiv[1].children[2].style.display = "block";
        inputDiv[1].children[2].textContent = "Must be a valid month";
        throw new Error("Error: number of month is not valid");
    }

    if(inputValue[2].value != "" && inputValue[2].value > date.getFullYear() || (inputValue[2].value == date.getFullYear() && inputValue[1].value > date.getMonth() + 1 && inputValue[0].value > date.getDate())){
        inputDiv[2].children[0].style.color = "hsl(0, 100%, 67%)";
        inputDiv[2].children[1].style.border = "1px solid hsl(0, 100%, 67%)";
        inputDiv[2].children[2].style.display = "block";
        inputDiv[2].children[2].textContent = "Must be in the past";
        throw new Error("Error: year number");
    }

    // ------------------------------------------------------------------------------------

    //This is for the result content
    for(let i = 0; i < result.length; i++){
        result[i].textContent = calculateDate(inputValue[0].value, inputValue[1].value, inputValue[2].value)[i];
    }

}

function calculateDate(dateBirth, monthBirth, yearBirth){
    let currentDate = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const result = [];


    //To trick the one digit input using 0, for example : 01, 02, etc
    if(dateBirth.charAt(0) == "0"){
        dateBirth = dateBirth.charAt(1);
    }

    if(monthBirth.charAt(0) == "0"){
        monthBirth = monthBirth.charAt(1);
    }

    console.log(dateBirth + " " + monthBirth);

    for(let i = 1900; i < 2024; i += 4){
        if(currentYear == i){
            daysInMonth.splice(1, 1, 29);
        }
    }

    //Age calculation
    if(dateBirth > currentDate){
        currentDate += daysInMonth[monthBirth - 1];
        currentMonth = currentMonth - 1;
    }

    if(monthBirth > currentMonth){
        currentYear = currentYear - 1;
        currentMonth += 12;
    }

    //Push the result to an array
    result.push(currentYear - yearBirth);
    result.push(currentMonth - monthBirth);
    result.push(currentDate - dateBirth);
    
    return result;
}




