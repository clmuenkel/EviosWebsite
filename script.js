/**
 * EVIOS HQ - Polished Blue UI
 * Professional, Smooth, Premium
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initScrollAnimations();
    initFlowSection();
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    // Observe flow nodes
    document.querySelectorAll('.flow-node').forEach(node => {
        observer.observe(node);
    });
}

// ========================================
// FLOW SECTION
// ========================================
function initFlowSection() {
    const flowSection = document.querySelector('.flow-section');
    const flowDetail = document.querySelector('.flow-detail');
    
    if (!flowSection || !flowDetail) return;

    // State
    let isZoomed = false;
    let activeStage = null;
    let demoTimer = null;

    // Stage Data
    const stages = [
        {
            id: 1,
            name: 'GET FOUND',
            product: 'Referral Engine',
            icon: 'users',
            problem: 'Word-of-mouth is your best lead source, but you never ask for referrals consistently. Happy customers forget to tell their friends.',
            solution: 'Automated SMS referral requests sent after every completed job. Customers share with one tap. You get notified instantly.',
            tags: ['Referral Engine', 'Marketing Automation']
        },
        {
            id: 2,
            name: 'ANSWER FAST',
            product: 'AI Receptionist',
            icon: 'phone',
            problem: "You're on a roof when the phone rings. By the time you call back, they've hired someone else. 78% of customers hire whoever responds first.",
            solution: 'AI answers every call in 2 rings, 24/7. Qualifies the lead, books the appointment, sends confirmation—all automatically.',
            tags: ['AI Receptionist', 'Speed-to-Lead']
        },
        {
            id: 3,
            name: 'BOOK & REMIND',
            product: 'Smart Scheduling',
            icon: 'calendar',
            problem: 'Customers book, then forget. No-shows cost you $200+ per missed appointment. Reminder calls eat your admin time.',
            solution: 'Online booking synced to your calendar. Automatic reminders at 24h, 2h, and "on the way." No-shows drop by 60%.',
            tags: ['Online Booking', 'Auto-Reminders']
        },
        {
            id: 4,
            name: 'QUOTE & CLOSE',
            product: 'Quote Follow-Up',
            icon: 'file-text',
            problem: 'You send quotes that go silent. Following up feels pushy. 40% of quotes die from no response—not rejection.',
            solution: 'Automated follow-up sequence: Day 2, Day 5, Day 10. Polite, persistent, and stops the moment they reply.',
            tags: ['Quote Follow-Up', 'CRM Integration']
        },
        {
            id: 5,
            name: 'DELIVER & COLLECT',
            product: 'Payment System',
            icon: 'credit-card',
            problem: 'Chasing payments is awkward and time-consuming. Invoices get "lost." Average collection time: 30+ days.',
            solution: 'Job complete → payment link sent automatically. One-tap pay with Apple/Google Pay. Average collection: same day.',
            tags: ['On-My-Way Texts', 'Payment Links']
        },
        {
            id: 6,
            name: 'GROW & REPEAT',
            product: 'Review Booster',
            icon: 'star',
            problem: 'Happy customers rarely leave reviews unprompted. One bad review tanks your rating. New customers check Google first.',
            solution: 'Rating request sent 1 hour after job. 5-star? Direct link to Google. Less than 5? Private feedback form.',
            tags: ['Review Requests', 'Retention Campaigns']
        }
    ];

    // Elements
    const nodes = document.querySelectorAll('.flow-node');
    const backBtn = flowDetail.querySelector('.detail-back');
    const pickerBtns = flowDetail.querySelectorAll('.picker-btn');
    const demoScreen = document.getElementById('demo-screen');
    const currentStageEl = document.getElementById('current-stage');

    // Open Stage
    function openStage(stageId) {
        if (isZoomed) return;
        
        const stage = stages.find(s => s.id === stageId);
        if (!stage) return;

        isZoomed = true;
        activeStage = stageId;

        updateContent(stage);
        updatePicker(stageId);
        playDemo(stageId);

        flowSection.classList.add('zoomed');
        document.body.style.overflow = 'hidden';
    }

    // Close Stage
    function closeStage() {
        if (!isZoomed) return;

        stopDemo();
        flowSection.classList.remove('zoomed');
        document.body.style.overflow = '';

        setTimeout(() => {
            isZoomed = false;
            activeStage = null;
        }, 350);
    }

    // Navigate to Stage
    function goToStage(stageId) {
        if (!isZoomed || stageId === activeStage || stageId < 1 || stageId > 6) return;

        const stage = stages.find(s => s.id === stageId);
        if (!stage) return;

        activeStage = stageId;
        
        // Quick fade transition
        const card = flowDetail.querySelector('.detail-card');
        card.style.opacity = '0.7';
        
        setTimeout(() => {
            updateContent(stage);
            updatePicker(stageId);
            playDemo(stageId);
            card.style.opacity = '1';
        }, 150);
    }

    // Update Content
    function updateContent(stage) {
        document.getElementById('detail-icon').innerHTML = `<i data-lucide="${stage.icon}"></i>`;
        document.getElementById('detail-name').textContent = stage.name;
        document.getElementById('detail-product').textContent = stage.product;
        document.getElementById('detail-problem').textContent = stage.problem;
        document.getElementById('detail-solution').textContent = stage.solution;
        
        document.getElementById('detail-tags').innerHTML = stage.tags
            .map(t => `<span class="tag">${t}</span>`)
            .join('');

        if (currentStageEl) currentStageEl.textContent = stage.id;

        lucide.createIcons();
    }

    // Update Picker
    function updatePicker(stageId) {
        pickerBtns.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.stage) === stageId);
        });
    }

    // Demo Functions
    function playDemo(stageId) {
        stopDemo();
        if (!demoScreen) return;

        demoScreen.innerHTML = getDemoHTML(stageId);
        lucide.createIcons();

        const duration = stageId === 2 ? 8500 : 7000;
        demoTimer = setTimeout(() => playDemo(stageId), duration);
    }

    function stopDemo() {
        if (demoTimer) {
            clearTimeout(demoTimer);
            demoTimer = null;
        }
    }

    function getDemoHTML(stageId) {
        const demos = {
            1: `<div class="demo-screen"><div class="demo-msgs">
                <div class="msg out" style="animation-delay:0.2s">Thanks for choosing ABC Plumbing! 🔧</div>
                <div class="msg out" style="animation-delay:1.2s">Know anyone who needs help?</div>
                <div class="msg out" style="animation-delay:2.2s">Get $50 for every referral 💰</div>
                <div class="msg in" style="animation-delay:3.5s">My neighbor Mike needs help!</div>
                <div class="msg out" style="animation-delay:4.5s">Great! We'll reach out today 👍</div>
                <div class="msg ok" style="animation-delay:5.5s">✓ $50 bonus credited!</div>
            </div></div>`,
            
            2: `<div class="demo-screen"><div class="demo-msgs">
                <div class="msg out" style="animation-delay:0.3s">Thanks for calling! How can I help?</div>
                <div class="msg in" style="animation-delay:1.5s">My sink is leaking badly</div>
                <div class="msg out" style="animation-delay:2.8s">I can get someone out Tuesday at 2pm. Book it?</div>
                <div class="msg in" style="animation-delay:4s">Yes please!</div>
                <div class="msg out" style="animation-delay:5s">Done! Confirmation on the way 📅</div>
                <div class="msg ok" style="animation-delay:6.5s">✓ New job booked!</div>
            </div></div>`,
            
            3: `<div class="demo-screen"><div class="demo-msgs">
                <div class="msg out" style="animation-delay:0.3s">Reminder: Appointment tomorrow at 2pm</div>
                <div class="msg in" style="animation-delay:1.5s">Thanks! I'll be ready</div>
                <div class="msg out" style="animation-delay:3s">Tech is on the way! ETA 15 min 🚗</div>
                <div class="msg in" style="animation-delay:4.2s">Perfect, see you soon!</div>
                <div class="msg ok" style="animation-delay:5.5s">✓ No-shows reduced 60%</div>
            </div></div>`,
            
            4: `<div class="demo-screen"><div class="demo-msgs">
                <div class="msg out" style="animation-delay:0.3s">Quote sent: Kitchen remodel - $2,400</div>
                <div class="msg out" style="animation-delay:1.5s">Day 2: Any questions on the quote?</div>
                <div class="msg out" style="animation-delay:2.5s">Day 5: Still interested?</div>
                <div class="msg out" style="animation-delay:3.5s">Day 10: Should I close this out?</div>
                <div class="msg in" style="animation-delay:4.5s">Actually yes, let's do it!</div>
                <div class="msg ok" style="animation-delay:5.5s">✓ Quote accepted - $2,400</div>
            </div></div>`,
            
            5: `<div class="demo-screen"><div class="demo-msgs">
                <div class="msg out" style="animation-delay:0.3s">Job complete! ✓</div>
                <div class="msg out" style="animation-delay:1.3s">Total: $450</div>
                <div class="msg out" style="animation-delay:2.3s">Tap here to pay securely 💳</div>
                <div class="msg in" style="animation-delay:3.5s">*Paid with Apple Pay*</div>
                <div class="msg ok" style="animation-delay:4.8s">✓ $450 received instantly!</div>
            </div></div>`,
            
            6: `<div class="demo-screen"><div class="demo-msgs">
                <div class="msg out" style="animation-delay:0.3s">How was your service today?</div>
                <div class="msg in" style="animation-delay:1.5s">⭐⭐⭐⭐⭐ Excellent!</div>
                <div class="msg out" style="animation-delay:2.5s">Thanks! Mind leaving a Google review?</div>
                <div class="msg in" style="animation-delay:4s">Just posted it!</div>
                <div class="msg ok" style="animation-delay:5.2s">✓ New 5-star review!</div>
            </div></div>`
        };
        
        return demos[stageId] || demos[1];
    }

    // Event Listeners
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            openStage(parseInt(node.dataset.stage));
        });
    });

    backBtn?.addEventListener('click', closeStage);

    pickerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            goToStage(parseInt(btn.dataset.stage));
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isZoomed) return;
        
        if (e.key === 'Escape') closeStage();
        if (e.key === 'ArrowLeft' && activeStage > 1) goToStage(activeStage - 1);
        if (e.key === 'ArrowRight' && activeStage < 6) goToStage(activeStage + 1);
    });

    // Click outside to close
    flowDetail.addEventListener('click', (e) => {
        if (e.target === flowDetail) closeStage();
    });

    // Touch swipe
    let touchStartX = 0;
    flowDetail.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    flowDetail.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && activeStage > 1) goToStage(activeStage - 1);
            if (diff < 0 && activeStage < 6) goToStage(activeStage + 1);
        }
    }, { passive: true });
}
