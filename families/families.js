import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';
import { renderBunny } from './render-utils.js';
checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';

    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const familyEl = document.createElement('div');
        const nameEl = document.createElement('p');
        const bunniesEl = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        bunniesEl.classList.add('bunnies');
        familyEl.classList.add('family');
        // put the family name in the name element
        nameEl.textContent = family.name;
        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
        // make an element with the css class 'bunny', and put the bunny's name in the text content
            const bunnyEl = await renderBunny(bunny);

            
            // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            bunnyEl.addEventListener('click', async() => {
                await deleteBunny(bunny.id);

                await displayFamilies();
            });
        // append this bunnyEl to the bunniesEl
            bunniesEl.append(bunnyEl); 
        }
     // append the bunniesEl and nameEl to the familyEl    
        familyEl.append(bunniesEl, nameEl);
     // append the familyEl to the familiesEl   
        familiesEl.append(familyEl);   
    }
}

window.addEventListener('load', async() => {
    await getFamilies();

    displayFamilies();
});