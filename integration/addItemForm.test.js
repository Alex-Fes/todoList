// describe('addItemForm', ()=>{
//     it('base example, visual look correct', async () => {
//         await page.goto('http://localhost:6006/iframe.html?args=&id=additemform-component--add-item-form-base-example&viewMode=story');
//         const image = await page.screenshot();
//
//         expect(image).toMatchImageSnapshot();
//     });
// });

import path from 'path';



import initStoryshots from '@storybook/addon-storyshots';

// The required import from the @storybook/addon-storyshots-puppeteer addon
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// Function to customize the snapshot location
const getMatchOptions = ({ context: { fileName } }) => {
    // Generates a custom path based on the file name and the custom directory.
    const snapshotPath = path.join(path.dirname(fileName), 'http://localhost:6006/iframe.html?args=&id=additemform-component--add-item-form-base-example&viewMode=story');
    return { customSnapshotsDir: snapshotPath };
};

initStoryshots({
    // your own configuration
    test: imageSnapshot({
        // invoke the function above here
        getMatchOptions,
    }),
});