(function () {
    console.log('Phone Fix Script Loded');
    const PHONE_REGEX = /\+972\s*54\s*633\s*3231/g; // Targeting the specific format requested or variations if needed
    // However, the user said "containing +972", so let's be slightly more robust but prioritize the specific number
    // to avoid false positives. If the user wants ALL +972 numbers, we can adjust.
    // Given the prompt: "Please search globally for all phone number displays containing "+972"" and "format: +972 54 633 3231"

    // We will look for text that looks like a phone number starting with +972
    // Regex explanation: +972 followed by optional formatting chars and digits.
    // But since the user specifically mentioned one number, let's target that one to be safe first, or a general pattern.
    // General pattern for +972 and Israeli mobile/landline:
    // \+972[- ]?5[0-9][- ]?[0-9]{3}[- ]?[0-9]{4}

    // User requested explicit format: +972 54 633 3231
    const SEARCH_REGEX = /\+972[\s-]?5[0-9][\s-]?[0-9]{3}[\s-]?[0-9]{4}/g;
    const REPLACEMENT_TEXT = "+972 54 633 3231";

    function fixPhoneNumbers(rootNode) {
        if (!rootNode) return;

        const walker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    // specific phone number check
                    if (node.nodeValue && node.nodeValue.includes('+972')) {
                        // avoid double wrapping
                        if (node.parentNode && node.parentNode.classList.contains('phone-ltr')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        // avoid script/style tags
                        if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(node.parentNode.tagName)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodesToReplace = [];
        while (walker.nextNode()) {
            nodesToReplace.push(walker.currentNode);
        }

        nodesToReplace.forEach(node => {
            const span = document.createElement('span');
            span.className = 'phone-ltr';
            span.textContent = REPLACEMENT_TEXT; // Enforce the specific format

            // If the node contains MORE than just the phone number, we need to be careful.
            // But usually phone numbers in contact sections are standalone or clearly separated.
            // For now, replacing the whole matching part is safer if it's the main content.
            // If it's mixed text like "Call us at +972...", we need to split.

            const text = node.nodeValue;
            const matches = text.match(SEARCH_REGEX);

            if (matches) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;

                // Reset regex state
                const regex = new RegExp(SEARCH_REGEX);
                let match;

                // We'll effectively split the text node
                // Note: simple replace might be easier if we just want to wrap.

                const parts = text.split(SEARCH_REGEX);
                // This is a bit complex to reconstruct perfectly with capturing groups if we want to preserve exact other text.
                // Let's use robust replacement.

                const wrapper = document.createElement('span');

                // If the text is just the number (trimmed), replace generic logic
                if (text.trim().replace(/[\s-]/g, '') === '+972546333231') {
                    node.parentNode.replaceChild(span, node);
                    return;
                }

                // Mixed content support
                const newHtml = text.replace(SEARCH_REGEX, (match) => {
                    return `<span class="phone-ltr">${REPLACEMENT_TEXT}</span>`;
                });

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newHtml;

                while (tempDiv.firstChild) {
                    node.parentNode.insertBefore(tempDiv.firstChild, node);
                }
                node.parentNode.removeChild(node);
            }
        });
    }

    // Run initially
    fixPhoneNumbers(document.body);

    // Observe for changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    fixPhoneNumbers(node);
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
