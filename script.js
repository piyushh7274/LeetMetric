document.addEventListener("DOMContentLoaded", function(){
    
    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

// RETURN TRUE OR FALSE BASED ON REGEX--->
    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("username invalid");
        }
        return isMatching;
    }


      async function fetchUserDetails(username){
        
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' ;

            const targetUrl = 'https://leetcode.com/graphql/';
    
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");
    
            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
                const requestOptions = {
                    method : "POST",
                    headers: myHeaders,
                    body: graphql,
                    // redirect: "follow"
                };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok){
                throw new Error("unable to fetch data");
            }
            const parsedData = await response.json();
            console.log("Logging data", parsedData);

            displayUserData(parsedData)
        }
        catch(error) {
            progress.innerHTML = `<p>${error.message}</p>`;
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
      }

    function displayUserData(parsedData){
        const totalHardQues = parsedData.Data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.Data.allQuestionsCount[0].count;
        const totalmedigambling = parsedData.Data.allQuestionsCount[0].count;
        // const totalHardQues = parsedData.Data.allQuestionsCount[0].count;



    }



    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("logIn username:", username);
        if(validateUsername(username)){
            fetchUserDetails(username);

        }

    })
})