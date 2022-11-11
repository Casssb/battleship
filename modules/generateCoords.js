/* Hasbro website lists 5 ships for Battleship game
carrier- length 5
battleship- length 4
cruiser- length 3
submarine- length 3
destroyer- length 2 
grid is 100 tiles (0-99) so any horizontal coord will be num + 1
any veritcal coord will be num + 10
a vertical carrier starting at the botoom left will be [0,1,2,3,4]
1- will need to generate a random direction choice (maybe using 0/1 or true/false)
2- will need an array of ships with 2 choices for horiz/vert offsets
3- will need a result ship array that will be eventually returned
4- start by creating a temp array and pushing first coord from first ship
5- then create a loop to push other coords with validation checks to make sur ethey are
not going out of bounds on grid or duplicating current coords (seems like this
    function should be recursive)
6- push this into results array and then repeat for 4 other ships
7- when array.length is equal to 5 return results.*/