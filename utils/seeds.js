const connection = require("../config/connection"); // Importing the connection configuration
const User = require("../models/user"); // Importing the User model
const Thought = require("../models/thoughts"); // Importing the Thought model
const { usersArray, thoughtsArray } = require("./data"); // Importing user and thought data
const { createUser } = require("../controllers/userController"); // Importing the createUser function from the userController

connection.on("error", (err) => err); // Handling connection errors

connection.once("open", async () => {
    for (let i = 0; i < usersArray.length; i++) {
        // Loop through the usersArray to perform the following steps for each user

        // Step 1: Create a new user using the data from usersArray[i]
        createUser(usersArray[i]); // Pass the user data from usersArray[i] to the createUser function

        // Step 2: Create a new thought using the data from thoughtsArray[i]
        createThought(thoughtsArray[i]); // Pass the thought data from thoughtsArray[i] to the createThought function

        // Step 3: Update the user with the new thoughtId
        updateUserWithThought(userArray[i], thoughtId); // Pass the user from usersArray[i] and the thoughtId to the updateUserWithThought function

        console.log("user id error"); // Output an error message (this may need clarification or modification)

    }

    console.log("Completed"); // Output a completion message
    process.exit(0); // Exit the process
});