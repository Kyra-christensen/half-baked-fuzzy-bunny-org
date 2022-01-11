// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderBunny } from '../families/render-utils.js';
const test = QUnit.test;

test('renderBunny should take in an object and return a DOM element', async(expect) => {
    //Arrange
    const bunny = {
        name: 'sara',
        family_id: 1
        
    };
    
    // Set up your arguments and expectations
    const expected = 	
    '<p class="bunny">sara</p>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = await renderBunny(bunny);
    console.log(actual);
    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});
