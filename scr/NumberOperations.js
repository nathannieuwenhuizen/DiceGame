//This class handles mathematical calculations.
function NumberOperations()
{
    //Returns a random number in range of min and max.
    this.GetRandomNumberInRange = function(min,max)
    {
        var result = min+ Math.floor(Math.random()*(max-min+1));
        return result;
    }
}
