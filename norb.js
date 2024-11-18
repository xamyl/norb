#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');  // Correct import for v12.x

const dataFile = 'norb_data.json'; // File where data will be saved

// Function to load existing data from the JSON file
function loadData() {
  try {
    // If the file exists, read and parse the content
    if (fs.existsSync(dataFile)) {
      const fileData = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(fileData); // Return the parsed data
    } else {
      // If the file doesn't exist, return an empty array
      return [];
    }
  } catch (error) {
    console.error('Error loading data:', error);
    return []; // Return an empty array in case of error
  }
}

// Function to save data to the JSON file
function saveData(data) {
  try {
    // Write the data to the file in a nicely formatted JSON
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Create the prompt using createPromptModule
const prompt = inquirer.createPromptModule();

// Make the function asynchronous
async function promptUser() {
  try {
    // Prompt the user for input (name and age)
    const answers = await prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'age',
        message: 'How old are you?'
      }
    ]);

    // Load the existing data
    const existingData = loadData();

    // Add new user data to the array
    existingData.push(answers);

    // Save the updated data to the file
    saveData(existingData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the async function to run the prompt
promptUser();
