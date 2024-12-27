// ==UserScript==
// @name           Facebook Public Profile Action Remover
// @namespace      OSINTools
// @description    Remove (hide) Facebook elements which could cause the current user to affect the target profile. Disclaimer: Doesn't remove all actionable buttons/links.
// @grant          none
// @run-at         document-end
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
// @version        1.3.0
// ==/UserScript==

(function () {
    'use strict';

    /**
     * Remove DOM elements based on CSS selectors.
     * @param {Array<string>} selectors - An array of CSS selectors.
     */
    function removeElements(selectors) {
        selectors.forEach((selector) => {
            try {
                document.querySelectorAll(selector).forEach((element) => {
                    element.remove();
                });
            } catch (error) {
                console.error(`Error removing elements for selector: ${selector}`, error);
            }
        });
    }

    /**
     * Remove Facebook interactive elements and actions.
     */
    function removeFacebookInteractions() {
        const selectors = [
            '[aria-label="Like"]', // Like button
            '[aria-label="Comment"]', // Comment button
            '[aria-label="Share"]', // Share button
            '.UFIReplyLink', // Reply links
            '.uiMentionsInput', // Mentions input
            '.UFIAddCommentInput', // Comment input
            '.actions._70j', // Actions menu
            '.FriendRequestAdd', // Add Friend button
            '.share_action_link', // Share action link
            '.addButton', // Add buttons
            '.UFICommentCloseButton', // Close button for comments
            '.PageLikeButton', // Like page button
            '.UFILikeLink', // Like link in posts
            '.comment_link', // Links to comment
            '.friendInviterContainer', // Friend invite
            '.like_link', // Like links
            '#pages_actions_pagelet', // Page actions section
            '.commentable_item', // Commentable item sections
            '[role="button"][data-testid*="like"]', // General like buttons
            '[role="button"][data-testid*="react"]', // Reaction buttons
            '[data-pagelet="RightRail"]', // Right sidebar
            '[data-pagelet="ProfileActions"]', // Profile action buttons
            '[data-testid="post_chevron_button"]', // Post action menu
        ];

        removeElements(selectors);
    }

    /**
     * Debounce function to limit the rate at which a function executes.
     * @param {Function} func - The function to debounce.
     * @param {number} timeout - The debounce timeout in milliseconds.
     * @returns {Function} - A debounced version of the function.
     */
    function debounce(func, timeout = 200) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), timeout);
        };
    }

    // Initial cleanup on page load
    removeFacebookInteractions();

    // Set up a MutationObserver to monitor dynamic content
    const observer = new MutationObserver(
        debounce(() => {
            removeFacebookInteractions();
        }, 200)
    );

    // Start observing the document for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Log observer start for debugging
    console.info("Facebook Public Profile Action Remover is running.");
})();
