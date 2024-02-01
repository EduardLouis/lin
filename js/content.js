// Initialize the process
initializeApp();
async function initializeApp() {
    try {
        const postElements = document.querySelectorAll('.feed-shared-update-v2');
        if (!postElements.length) {
            console.error('No posts found.');
            return;
        }
        console.log('Posts are updated');
        postElements.forEach(processPost);
        new MutationObserver(pageUpdated).observe(document.body, { childList: true, subtree: true });

        //MainMenu
        const topMenu = document.querySelector('.global-nav__primary-items');
        updateTopMenu(topMenu);
    } catch (error) {
        console.error('Error in initialization:', error);
    }
}

function pageUpdated(mutations) {
    try {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(addedNode => {
                if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.matches('.feed-shared-update-v2')) {
                    console.log('Feed shared update detected');
                    processPost(addedNode);
                }
            });
        });
    } catch (error) {
        console.error('Error in page update:', error);
    }
}

function processPost(postElement) {
    try {
        console.log('Processing post:', postElement);

        if (!postElement || !(postElement instanceof Element)) throw new Error(`Invalid post element: ${postElement}`);

        const socialActionBar = postElement.querySelector('.feed-shared-social-action-bar');
        if (!socialActionBar) {
            console.error(`SocialActionBar not found for post: ${postElement}`);
            return;
        }

        socialActionBar.appendChild(createInsightsButtons(postElement));
    } catch (error) {
        console.error('Error in processing post:', error.message);
    }
}

function createInsightsButtons(postElement) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'feed-shared-social-action-bar__action-button post-buttons';

    const buttonSpan = document.createElement('span');
    buttonSpan.className = 'artdeco-hoverable-trigger artdeco-hoverable-trigger--content-placed-top artdeco-hoverable-trigger--is-hoverable ember-view';
    buttonSpan.setAttribute('tabindex', '-1');
    buttonSpan.setAttribute('id', 'custom-button');

    const getInsightsButton = createButton('Insights!', 'get-insights-button', () => findPostLink(postElement));
    buttonSpan.appendChild(getInsightsButton);

    const savePostButton = createButton('Save!', 'save-post-button', savePost);
    buttonSpan.appendChild(savePostButton);

    buttonContainer.appendChild(buttonSpan);
    return buttonContainer;
}
function createButton(text, className, onClickHandler) {
    const button = document.createElement('button');
    button.classList.add('social-actions-button', 'artdeco-button', 'artdeco-button--4', 'artdeco-button--tertiary', 'flex-wrap', 'artdeco-button--muted', className);
    button.setAttribute('aria-label', text);
    button.setAttribute('type', 'button');
    button.setAttribute('data-finite-scroll-hotkey', 's');

    const buttonTextSpan = document.createElement('span');
    buttonTextSpan.classList.add('artdeco-button__text', 'social-action-button__text');
    buttonTextSpan.textContent = text;
    buttonTextSpan.style.lineHeight = '1.8rem';

    button.appendChild(buttonTextSpan);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClickHandler();
    });
    button.classList.add('post-button');

    return button;
}

// Function to find the post link
function findPostLink(postElement) {
    // Perform your logic to find the post link
    console.log('Searching for post link:', postElement);


    // Add your code here to handle the post link
}

// Function to save the post
function savePost() {
    // Perform your logic to save the post
    console.log('Saving post...');
    // Add your code here to save the post
}

////////////TOP MENU

function createHeaderButton() {
    const buttonContainer = document.createElement('li');
    buttonContainer.className = 'global-nav__primary-item';

    const buttonAnchor = document.createElement('a');
    buttonAnchor.className = 'app-aware-link global-nav__primary-link';
    buttonAnchor.setAttribute('target', '_self');
    buttonAnchor.setAttribute('href', '#');

    const circleIcon = document.createElement('div');
    circleIcon.className = 'circle-icon';
    circleIcon.style.cssText = 'width: 16px; height: 16px; border: 3px solid; border-radius: 50%;';

    const buttonTextSpan = document.createElement('span');
    buttonTextSpan.className = 't-12 break-words block t-black--light t-normal global-nav__primary-link-text';
    buttonTextSpan.setAttribute('title', 'Insights');
    buttonTextSpan.textContent = 'Insights';

    buttonAnchor.appendChild(circleIcon);
    buttonAnchor.appendChild(buttonTextSpan);

    // Add event listener to trigger clickTopButton function when button is clicked
    buttonAnchor.addEventListener('click', clickTopButton);

    buttonContainer.appendChild(buttonAnchor);

    return buttonContainer;
}

function updateTopMenu(topMenu) {
    const topButton = createHeaderButton();
    topButton.classList.add('top-menu-button');

    const referenceNode = topMenu.children[topMenu.children.length - 2];
    topMenu.insertBefore(topButton, referenceNode);
}

function clickTopButton() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar-insights';
    sidebar.className = 'scrollable';

    // Add other sidebar content and functionality
    document.body.appendChild(sidebar);
}

