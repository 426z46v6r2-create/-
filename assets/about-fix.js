(function () {
    console.log('About Fix Script Loaded (Strict Replacement)');

    // Text to find the container
    const TARGET_SNIPPET = "של למעלה מ-16 שנה";

    // Exact requested content
    const NEW_CONTENT_HTML = `
        <div class="about-fixed-content space-y-4 text-justify" dir="rtl">
            <p>
                עו"ד יפית שמעון טואטי מביאה עימה ניסיון משפטי ומקצועי עשיר של למעלה מ- 16 שנה, בדיני חוזים, נדל"ן (מקרקעין), הקמה וליווי של חברות פרטיות ועסקים, צוואות, ירושות וייפוי כוח מתמשך - היא פועלת מתוך שילוב של הבנה משפטית עמוקה וראייה רחבה של מכלול האינטרסים והרגשות המלווים כל לקוח.
            </p>
            <p>
                המסלול המקצועי של עו"ד שמעון - טואטי כלל עבודה במשרד עורכי דין מוביל, תפקיד כעו"ד ברשם החברות וניסיון רב שנים כיועצת משפטית למשרדי עורכי דין מובילים בתחום הליטיגציה המסחרית - תפקיד בו היא ממשיכה לכהן גם כיום.
            </p>
            <p>
                עו"ד שמעון - טואטי השלימה את לימודיה לתואר במשפטים בשנת 2008 במסגרת תוכנית מצטייני דיקאן ורקטור עם מלגת הצטיינות, וסיימה אותו במקום הראשון מתוך כ- 120 בוגרים.
            </p>
            <p>
                במהלך השנים המשיכה להתמקצע והשלימה מגוון הכשרות מתקדמות:
            </p>
            
            <h3 class="font-bold text-lg mt-2 mb-1">הכשרות וקורסים מקצועיים:</h3>
            <ul class="list-disc list-inside space-y-1 pr-2">
                <li>קורס דירקטורים – כולל הסמכה כדירקטורית</li>
                <li>קורס הייטק לעורכי דין ללווי חברות סטארט-אפ</li>
                <li>קורס גישור ויישוב סכסוכים</li>
                <li>קורס תכנון ובניה</li>
                <li>קורס יזמות הייטק</li>
                <li>קורס ייצוג במקרקעין ומיסוי</li>
                <li>הסמכה להכנת ייפוי כוח מתמשך</li>
                <li>ועוד הכשרות מקצועיות מגוונות</li>
            </ul>

            <p class="mt-4">
                הניסיון הרחב שצברה במגזר הפרטי והציבורי מעניק לעו"ד יפית שמעון - טואטי, פרספקטיבה רחבה ומעמיקה בניהול תיקים משפטיים. בכל תיק היא מביאה לא רק ידע משפטי מקצועי, אלא גם גישה אנושית ופרגמטית המתמקדת בהשגת התוצאה הטובה ביותר עבור לקוחותיה.
            </p>
            <p>
                המשרד מייצג לקוחות הן בסכסוכים משפטיים והן בליווי עסקאות ויוזמות חיוביות – כגון רכישה ומכירה של דירות ועסקים, הקמת חברות, ניסוח וחתימה על חוזים מסחריים והסכמים בין מייסדים, בעלי מניות ושותפים.
            </p>
            <p>
                עו"ד שמעון - טואטי מודעת לכך שגם בעסקאות חיוביות ומרגשות מתעוררים לעיתים מתחים, לחצים וחששות – בין היתר בשל מעורבות כלכלית גבוהה או מאחר ומדובר בצעד משמעותי בחיים. ברגעים האלו, היא מביאה איתה לא רק ניסיון וידע מקצועי, אלא גם נחישות, יצירתיות, רוגע ויכולת להתמודד עם כל בעיה עד לפתרונה.
            </p>

            <h3 class="font-bold text-lg mt-2 mb-1">תחומי התמחות:</h3>
            <ul class="list-disc list-inside space-y-1 pr-2">
                <li>דיני חוזים</li>
                <li>דיני מקרקעין (נדל"ן)</li>
                <li>צוואות וירושות</li>
                <li>ייפוי כוח מתמשך</li>
                <li>הקמה וליווי חברות פרטיות</li>
                <li>ליווי עסקים קטנים ובינוניים</li>
                <li>ליטיגציה מסחרית</li>
                <li>ייעוץ משפטי בתחום האזרחי על כל גווניו</li>
            </ul>
        </div>
    `;

    function updateAboutContent(rootNode) {
        if (!rootNode) return;

        const walker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    if (node.nodeValue && node.nodeValue.includes(TARGET_SNIPPET)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const matches = [];
        while (walker.nextNode()) {
            matches.push(walker.currentNode);
        }

        matches.forEach(node => {
            const container = node.parentNode;
            if (!container) return; // Already processed/removed?

            // Loop up to find a safe container to replace?
            // Usually valid text is inside a P or similar block. 
            // We want to replace THE container that holds this text.

            // Check if we already fixed this one specific instance
            if (container.classList.contains('about-fixed-content') || container.closest('.about-fixed-content')) return;

            // STRATEGY: 
            // 1. Identify valid container (P or DIV)
            // 2. Wipe it clean.
            // 3. Insert NEW content.
            // 4. If we find ANY other matches later, we wipe them too (but don't insert, ensuring uniqueness).
            //    Wait, if we assume duplication, we should only insert ONCE globally or once per logical "section"?
            //    Given the "Massive Duplication" report, it's safer to likely have only ONE About section on the page.
            //    But if the site renders desktop/mobile views separately, we might need two.
            //    Let's inject into EVERY occurrence found, but `NEW_CONTENT_HTML` is self-contained. 
            //    So if we replace the OLD text block with NEW text block, duplicates are just duplicates of the new text.
            //    The user asked to "clear all... and replace".
            //    If duplicates exist, replacing them all updates them all. 
            //    BUT step 172 asked to REMOVE duplicates.
            //    "Task: CLEAN UP ... REMOVE ALL DUPLICATES".
            //    So we should only have ONE.

            // GLOBAL FLAG CHECK
            if (window._aboutFixedApplied) {
                // We already applied it once on this page.
                // This must be a duplicate. REMOVE IT.
                console.log('Removing duplicate About section');
                // Remove the container
                // Try to remove the paragraph or the immediate parent if it seems to be just text wrapper
                if (container.tagName === 'P' || container.tagName === 'DIV' || container.tagName === 'SPAN') {
                    container.style.display = 'none'; // Safer than removeChild sometimes for layout
                } else {
                    node.nodeValue = '';
                }
                return;
            }

            // FIRST OCCURRENCE - REPLACE IT
            console.log('Replacing About section (First occurrence)');

            // We want to replace the logic.
            // If the parent contains "אודות" (the Title), we can't wipe the parent.
            if (container.textContent.includes('אודות') && container.textContent.length < 500) {
                // Suspiciously short, might be title + snippet.
                // But the snippet is ~20 chars.
                // Replace matching text node with DIV.
                const wrapper = document.createElement('div');
                wrapper.className = 'about-fixed-content';
                wrapper.innerHTML = NEW_CONTENT_HTML;
                node.parentNode.replaceChild(wrapper, node);
            } else {
                // Replace the container contents?
                // Replacing the node is usually safest to avoid killing siblings like titles.
                const wrapper = document.createElement('div');
                wrapper.className = 'about-fixed-content';
                wrapper.innerHTML = NEW_CONTENT_HTML;

                // If container is P, we replace the P with our DIV
                if (container.tagName === 'P') {
                    // Check if P has other important stuff? unlikely.
                    container.parentNode.replaceChild(wrapper, container);
                } else {
                    node.parentNode.replaceChild(wrapper, node);
                }
            }

            window._aboutFixedApplied = true;

            // BONUS: Look for siblings that are "Duplicate" parts or "Show Less" buttons and hide them.
            // This handles the "residual" parts of the old text that didn't match the snippet.
            // We can't easily traverse without knowing structure.
            // But the MutationObserver + global flag will handle them if they contain the snippet later.
            // What if the "Duplicate" text (Part 2) appears but doesn't contain "Part 1" snippet?
            // We need a secondary scan for "Part 2" snippet.
        });

        // Scan for "Part 2" (Duplicate snippet) and "Show Less" and REMOVE them universally
        const CLEANUP_SNIPPETS = ["וניסיון נרחב כיועצת משפטית", "הצג פחות", "קרא עוד"];

        const cleanupWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    if (CLEANUP_SNIPPETS.some(s => node.nodeValue && node.nodeValue.includes(s))) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const cleanupNodes = [];
        while (cleanupWalker.nextNode()) cleanupNodes.push(cleanupWalker.currentNode);

        cleanupNodes.forEach(node => {
            // Check if this node is inside our NEW content?
            if (node.parentNode && node.parentNode.closest('.about-fixed-content')) return;

            // If not, it's garbage. Remove it.
            console.log('Cleaning up residual/duplicate node:', node.nodeValue.substring(0, 20));
            const p = node.parentNode;
            if (p) {
                p.removeChild(node);
                if (p.childNodes.length === 0) p.style.display = 'none';
            }
        });
    }

    // Reset flag on full reload? No, JS reloads.
    window._aboutFixedApplied = false;

    // Run
    updateAboutContent(document.body);

    // Observe
    const observer = new MutationObserver((mutations) => {
        let shouldRun = false;
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) shouldRun = true;
        });
        if (shouldRun) {
            updateAboutContent(document.body);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
