                            //User Stories\\

1. Select Dice Type
   As a user, I should be able to select the type of dice I want to roll, such as D6, D10, or D20, from a dropdown menu.

The default selection should be D6.

2. Roll the Dice
   As a user, I should be able to click a button to roll the selected dice and get a random outcome.

The button should be labeled "Roll Dice".

When clicked, the result of the roll should appear below the button.

3. View Roll Outcome
   As a user, I should be able to see the result of the dice roll on the page after clicking the button.

The result should display a random number between 1 and the number of faces on the selected dice (e.g., 1-6 for D6, 1-10 for D10).

The result should be displayed in a clear, readable format.

4. Reuse Roll Dice Functionality
   As a developer, I want to create a reusable rollDice function that can take the number of sides of the dice as an argument.

The rollDice function should accept a parameter for the number of sides of the dice and return a random value between 1 and that number.

The function should be invoked whenever the user clicks the "Roll Dice" button.

                         //Simple Storyboard of the User Using the System\\

Step 1: Landing Page
User opens the webpage (e.g., in a browser).

The page shows a header with the title "Tabletop Dice Roller".

A dropdown menu allows the user to select the dice type (D6, D10, or D20).

A "Roll Dice" button is visible.

There is an area where the result of the dice roll will be displayed (initially showing a placeholder like "-").

Step 2: Selecting Dice
The user selects a dice type from the dropdown menu (e.g., D6).

Step 3: Rolling the Dice
The user clicks the "Roll Dice" button.

The dice rolls and a random number between 1 and the selected dice type (e.g., 1-6 for D6) is shown on the screen.

Step 4: Result Display
The user sees the result below the button (e.g., "Result: 4").
