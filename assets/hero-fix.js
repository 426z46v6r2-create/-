(function () {
    console.log('Hero Fix Script Loaded');
    const TARGET_TEXTS = ["Yafit Shimon Touati", "יפית שמעון טואטי"];
    const WRAPPED_HTML = '<span class="nowrap-name">Yafit Shimon Touati</span>';

    function fixHeroTitle(rootNode) {
        if (!rootNode) return;

        // Efficient TreeWalker to find the text node.
        const walker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    if (node.nodeValue && TARGET_TEXTS.some(t => node.nodeValue.includes(t))) {
                        // Avoid re-wrapping
                        if (node.parentNode && node.parentNode.classList.contains('nowrap-name')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        // Avoid script/style tags
                        if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(node.parentNode.tagName)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodesToFix = [];
        while (walker.nextNode()) {
            nodesToFix.push(walker.currentNode);
        }

        nodesToFix.forEach(node => {
            let text = node.nodeValue;
            let fragment = document.createDocumentFragment();
            let lastIndex = 0;

            // Simple search and replace for all target texts
            TARGET_TEXTS.forEach(target => {
                if (text.includes(target)) {
                    const parts = text.split(target);
                    const newFragment = document.createDocumentFragment();
                    parts.forEach((part, i) => {
                        if (part) newFragment.appendChild(document.createTextNode(part));
                        if (i < parts.length - 1) {
                            const span = document.createElement('span');
                            span.className = 'nowrap-name';
                            span.textContent = target;
                            newFragment.appendChild(span);
                        }
                    });
                    // This only works for the first target found in this implementation, 
                    // but for our purposes it's usually one or the other.
                    fragment = newFragment;
                }
            });

            if (fragment.childNodes.length > 0) {
                node.parentNode.replaceChild(fragment, node);
            }
        });
    }

    // Run initially
    fixHeroTitle(document.body);

    // Observe for changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    fixHeroTitle(node);
                });
            }
            // Be careful with characterData changes to avoid infinite loops if we change it ourselves
            // But usually replacing the node avoids this for that specific node.
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
