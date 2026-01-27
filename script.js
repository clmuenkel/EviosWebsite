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
    let transitionLock = false;
    let lastClickedNode = null;

    // Stage Data
    const stages = [
        {
            id: 1,
            name: 'GET FOUND',
            product: 'Referral Engine',
            icon: 'users',
            problem: `Happy customers forget to tell their friends—and you don't have a consistent referral ask.<ul class="logic-list">
                <li><span class="logic-key">Current state:</span> Referrals happen randomly (no trigger, no tracking).</li>
                <li><span class="logic-key">Leak:</span> Customer goodwill expires after the job.</li>
                <li><span class="logic-key">Result:</span> You keep paying for leads you could've earned for free.</li>
            </ul>`,
            solution: `Automated referral flow that runs after every job—with tracking + payout built in.<ul class="logic-list">
                <li><span class="logic-key">Trigger:</span> Job marked complete → wait 7 days.</li>
                <li><span class="logic-key">Action:</span> Send referral ask + one‑tap share link.</li>
                <li><span class="logic-key">If booked:</span> Credit $50 → notify owner → payout logged automatically.</li>
                <li><span class="logic-key">Stop condition:</span> Referral closes or expires.</li>
            </ul>`,
            tags: ['Referral Engine', 'Marketing Automation']
        },
        {
            id: 2,
            name: 'ANSWER FAST',
            product: 'AI Receptionist',
            icon: 'phone',
            problem: `When you miss a call, you usually lose the job—especially emergencies.<ul class="logic-list">
                <li><span class="logic-key">After-hours:</span> High‑margin calls hit voicemail.</li>
                <li><span class="logic-key">Delay:</span> Lead books whoever answers first.</li>
                <li><span class="logic-key">Chaos:</span> No qualification → junk calls waste time.</li>
            </ul>`,
            solution: `AI answers every call, qualifies, and books—with clean handoff + logging.<ul class="logic-list">
                <li><span class="logic-key">Trigger:</span> Inbound call rings.</li>
                <li><span class="logic-key">Qualify:</span> Job type + urgency + service area + budget fit.</li>
                <li><span class="logic-key">Route:</span> Emergency → priority booking; otherwise offer next slots.</li>
                <li><span class="logic-key">Write-back:</span> Outcome → CRM + calendar + SMS confirmation.</li>
            </ul>`,
            tags: ['AI Receptionist', 'Speed-to-Lead']
        },
        {
            id: 3,
            name: 'BOOK & REMIND',
            product: 'Smart Scheduling',
            icon: 'calendar',
            problem: `Scheduling drift + no-shows burn hours and fuel.<ul class="logic-list">
                <li><span class="logic-key">Mismatch:</span> "I thought you said Tuesday."</li>
                <li><span class="logic-key">No-shows:</span> Tech arrives, nobody's home.</li>
                <li><span class="logic-key">Manual:</span> Office spends time chasing confirmations.</li>
            </ul>`,
            solution: `Self-booking + reminders + reschedule flow that prevents wasted trips.<ul class="logic-list">
                <li><span class="logic-key">Trigger:</span> Booking created (web/phone).</li>
                <li><span class="logic-key">Reminders:</span> 24h + 2h + "On my way".</li>
                <li><span class="logic-key">Reschedule:</span> Customer texts <b>RESCHEDULE</b> → selects new slot automatically.</li>
                <li><span class="logic-key">Fallback:</span> No confirmation → AI calls to confirm.</li>
            </ul>`,
            tags: ['Online Booking', 'Auto-Reminders']
        },
        {
            id: 4,
            name: 'QUOTE & CLOSE',
            product: 'Quote Follow-Up',
            icon: 'file-text',
            problem: `Quotes die in silence because follow-up is inconsistent.<ul class="logic-list">
                <li><span class="logic-key">Reality:</span> Most contractors stop after 1–2 touches.</li>
                <li><span class="logic-key">No system:</span> Leads fall through the cracks.</li>
                <li><span class="logic-key">Outcome:</span> Competitor wins by default.</li>
            </ul>`,
            solution: `A polite, persistent follow-up sequence that stops instantly on reply.<ul class="logic-list">
                <li><span class="logic-key">Trigger:</span> Quote status = Sent.</li>
                <li><span class="logic-key">Sequence:</span> Day 2 → Day 5 → Day 10 (+ optional 8-touch).</li>
                <li><span class="logic-key">Stop condition:</span> Reply "yes/no" or booked call.</li>
                <li><span class="logic-key">Escalation:</span> High-value quote idle → notify owner to call.</li>
            </ul>`,
            tags: ['Quote Follow-Up', 'CRM Integration']
        },
        {
            id: 5,
            name: 'DELIVER & COLLECT',
            product: 'Payment System',
            icon: 'credit-card',
            problem: `Payment delays kill cash flow and create awkward chasing.<ul class="logic-list">
                <li><span class="logic-key">Leak:</span> Invoice sent late (or forgotten).</li>
                <li><span class="logic-key">Friction:</span> No easy pay option on the spot.</li>
                <li><span class="logic-key">Delay:</span> "Net 30" becomes "net never".</li>
            </ul>`,
            solution: `Job complete → invoice + tap-to-pay → reminders until paid.<ul class="logic-list">
                <li><span class="logic-key">Trigger:</span> Job marked complete.</li>
                <li><span class="logic-key">Action:</span> Generate invoice + send Stripe pay link (Apple/Google Pay).</li>
                <li><span class="logic-key">If unpaid:</span> Reminder cadence (Day 2 / Day 5 / Day 10).</li>
                <li><span class="logic-key">Optional:</span> Financing for big tickets.</li>
            </ul>`,
            tags: ['On-My-Way Texts', 'Payment Links']
        },
        {
            id: 6,
            name: 'GROW & REPEAT',
            product: 'Review Booster',
            icon: 'star',
            problem: `Reviews don't happen unless you ask—and 1-star hits hard.<ul class="logic-list">
                <li><span class="logic-key">Bias:</span> Upset customers review; happy ones forget.</li>
                <li><span class="logic-key">Trust:</span> New customers choose whoever looks safest.</li>
            </ul>`,
            solution: `Private rating first, then route customers the right way.<ul class="logic-list">
                <li><span class="logic-key">Trigger:</span> Job complete + 1–2 hours.</li>
                <li><span class="logic-key">If 4–5★:</span> One-tap Google link.</li>
                <li><span class="logic-key">If 1–3★:</span> Private feedback → alert owner to recover.</li>
                <li><span class="logic-key">Tracking:</span> Log requests + outcomes.</li>
            </ul>`,
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
        if (isZoomed || transitionLock) return;
        
        const stage = stages.find(s => s.id === stageId);
        if (!stage) return;

        transitionLock = true;
        isZoomed = true;
        activeStage = stageId;
        lastClickedNode = document.querySelector(`.flow-node[data-stage="${stageId}"]`);

        updateContent(stage);
        updatePicker(stageId);
        playDemo(stageId);

        flowSection.classList.add('zoomed');
        document.body.style.overflow = 'hidden';

        // Focus management
        const backBtn = flowDetail.querySelector('.detail-back');
        if (backBtn) {
            setTimeout(() => backBtn.focus(), 100);
        }

        // Release lock after transition
        setTimeout(() => {
            transitionLock = false;
        }, 400);
    }

    // Close Stage
    function closeStage() {
        if (!isZoomed || transitionLock) return;

        transitionLock = true;
        stopDemo();
        flowSection.classList.remove('zoomed');
        document.body.style.overflow = '';

        // Restore focus to originating node
        if (lastClickedNode) {
            setTimeout(() => {
                lastClickedNode.focus();
                lastClickedNode = null;
            }, 100);
        }

        setTimeout(() => {
            isZoomed = false;
            activeStage = null;
            transitionLock = false;
        }, 400);
    }

    // Navigate to Stage
    function goToStage(stageId) {
        if (!isZoomed || stageId === activeStage || stageId < 1 || stageId > 6 || transitionLock) return;

        const stage = stages.find(s => s.id === stageId);
        if (!stage) return;

        transitionLock = true;
        activeStage = stageId;
        
        // Quick fade transition
        const card = flowDetail.querySelector('.detail-card');
        if (card) {
            card.style.opacity = '0.7';
        }
        
        setTimeout(() => {
            stopDemo();
            updateContent(stage);
            updatePicker(stageId);
            playDemo(stageId);
            if (card) {
                card.style.opacity = '1';
            }
            transitionLock = false;
        }, 200);
    }

    // Update Content
    function updateContent(stage) {
        const iconEl = document.getElementById('detail-icon');
        const nameEl = document.getElementById('detail-name');
        const productEl = document.getElementById('detail-product');
        const problemEl = document.getElementById('detail-problem');
        const solutionEl = document.getElementById('detail-solution');
        const tagsEl = document.getElementById('detail-tags');

        if (iconEl) iconEl.innerHTML = `<i data-lucide="${stage.icon}"></i>`;
        if (nameEl) nameEl.textContent = stage.name;
        if (productEl) productEl.textContent = stage.product;
        
        // Use innerHTML for problem/solution to allow structured markup
        if (problemEl) problemEl.innerHTML = stage.problem;
        if (solutionEl) solutionEl.innerHTML = stage.solution;
        
        if (tagsEl) {
            tagsEl.innerHTML = stage.tags
                .map(t => `<span class="tag">${t}</span>`)
                .join('');
        }

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
            1: `
                <div class="demo demo-referral">
                    <div class="demo-topbar">
                        <span>9:41</span>
                        <span class="dots"></span>
                        <span>5G</span>
                    </div>
                    <div class="demo-title">Referral Engine</div>
                    <div class="demo-card" style="animation-delay:0.1s">
                        <div class="demo-row">
                            <b>Trigger</b>
                            <span class="pill">Job Complete</span>
                        </div>
                        <div class="demo-sub">Wait 7 days → send referral ask</div>
                    </div>
                    <div class="demo-chat">
                        <div class="bubble out" style="animation-delay:0.35s">Thanks again for choosing ABC Plumbing 🔧</div>
                        <div class="bubble out" style="animation-delay:0.6s">Know anyone who needs help? Get <b>$50</b> per referral.</div>
                        <div class="bubble in" style="animation-delay:0.95s">My neighbor Mike needs a leak fixed.</div>
                    </div>
                    <div class="demo-card ok" style="animation-delay:1.25s">
                        <div class="demo-row">
                            <b>Status</b>
                            <span class="pill green">Booked</span>
                        </div>
                        <div class="demo-sub">Referral credited → payout queued</div>
                    </div>
                </div>
            `,
            
            2: `
                <div class="demo demo-call">
                    <div class="demo-topbar">
                        <span>9:41</span>
                        <span class="dots"></span>
                        <span>5G</span>
                    </div>
                    <div class="demo-title">AI Receptionist</div>
                    <div class="call-card" style="animation-delay:0.1s">
                        <div class="call-head">
                            <div class="avatar"></div>
                            <div>
                                <div class="call-name">Incoming Call</div>
                                <div class="call-muted">"No Heat" • After hours</div>
                            </div>
                            <span class="pill blue">Answered</span>
                        </div>
                        <div class="wave">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>
                    <div class="demo-grid">
                        <div class="mini" style="animation-delay:0.35s">
                            <b>Service Area</b>
                            <span class="pill green">In-range</span>
                        </div>
                        <div class="mini" style="animation-delay:0.45s">
                            <b>Urgency</b>
                            <span class="pill amber">Emergency</span>
                        </div>
                        <div class="mini" style="animation-delay:0.55s">
                            <b>Booked</b>
                            <span class="pill green">Tue 2:00</span>
                        </div>
                        <div class="mini" style="animation-delay:0.65s">
                            <b>Logged</b>
                            <span class="pill">CRM</span>
                        </div>
                    </div>
                    <div class="demo-card ok" style="animation-delay:0.9s">
                        <div class="demo-row">
                            <b>SMS Sent</b>
                            <span class="pill green">Confirmed</span>
                        </div>
                        <div class="demo-sub">Customer received confirmation + address check</div>
                    </div>
                </div>
            `,
            
            3: `
                <div class="demo demo-schedule">
                    <div class="demo-topbar">
                        <span>9:41</span>
                        <span class="dots"></span>
                        <span>5G</span>
                    </div>
                    <div class="demo-title">Smart Scheduling</div>
                    <div class="calendar" style="animation-delay:0.1s">
                        <div class="cal-head">
                            <b>Tuesday</b>
                            <span class="pill">2 jobs</span>
                        </div>
                        <div class="cal-row">
                            <span>10:00</span>
                            <div class="event">Drain cleanout</div>
                        </div>
                        <div class="cal-row">
                            <span>2:00</span>
                            <div class="event blue">Leak repair (booked)</div>
                        </div>
                        <div class="cal-row">
                            <span>5:00</span>
                            <div class="event ghost">Buffer</div>
                        </div>
                    </div>
                    <div class="demo-card" style="animation-delay:0.35s">
                        <div class="demo-row">
                            <b>Reminder cadence</b>
                            <span class="pill">24h • 2h • OTW</span>
                        </div>
                        <div class="demo-sub">No confirmation → AI call to verify</div>
                    </div>
                    <div class="demo-card ok" style="animation-delay:0.6s">
                        <div class="demo-row">
                            <b>Text command</b>
                            <span class="pill green">RESCHEDULE</span>
                        </div>
                        <div class="demo-sub">Customer selects a new slot automatically</div>
                    </div>
                </div>
            `,
            
            4: `
                <div class="demo demo-quote">
                    <div class="demo-topbar">
                        <span>9:41</span>
                        <span class="dots"></span>
                        <span>5G</span>
                    </div>
                    <div class="demo-title">Quote Follow-Up</div>
                    <div class="pipeline" style="animation-delay:0.1s">
                        <div class="lane">
                            <b>Sent</b>
                            <div class="chip">Kitchen remodel • $2,400</div>
                        </div>
                        <div class="lane">
                            <b>Follow-ups</b>
                            <div class="step">Day 2: Any questions?</div>
                            <div class="step">Day 5: Still interested?</div>
                            <div class="step">Day 10: Close out?</div>
                        </div>
                    </div>
                    <div class="demo-card ok" style="animation-delay:0.55s">
                        <div class="demo-row">
                            <b>Stop condition</b>
                            <span class="pill green">Reply received</span>
                        </div>
                        <div class="demo-sub">Sequence halts instantly → status updated</div>
                    </div>
                    <div class="demo-card" style="animation-delay:0.8s">
                        <div class="demo-row">
                            <b>Escalation</b>
                            <span class="pill amber">$2k+</span>
                        </div>
                        <div class="demo-sub">Idle 10 days → notify owner to call</div>
                    </div>
                </div>
            `,
            
            5: `
                <div class="demo demo-pay">
                    <div class="demo-topbar">
                        <span>9:41</span>
                        <span class="dots"></span>
                        <span>5G</span>
                    </div>
                    <div class="demo-title">Payment System</div>
                    <div class="invoice" style="animation-delay:0.1s">
                        <div class="inv-head">
                            <b>Invoice</b>
                            <span class="pill blue">#1048</span>
                        </div>
                        <div class="inv-line">
                            <span>Leak repair</span>
                            <b>$450</b>
                        </div>
                        <div class="inv-line muted">
                            <span>Due</span>
                            <b>Today</b>
                        </div>
                        <button class="pay-btn" type="button">Tap to pay (Apple Pay)</button>
                    </div>
                    <div class="demo-card ok" style="animation-delay:0.55s">
                        <div class="demo-row">
                            <b>Status</b>
                            <span class="pill green">Paid</span>
                        </div>
                        <div class="demo-sub">Receipt sent → books updated</div>
                    </div>
                    <div class="demo-card" style="animation-delay:0.85s">
                        <div class="demo-row">
                            <b>If unpaid</b>
                            <span class="pill">Auto-remind</span>
                        </div>
                        <div class="demo-sub">Day 2 / Day 5 / Day 10 cadence</div>
                    </div>
                </div>
            `,
            
            6: `
                <div class="demo demo-review">
                    <div class="demo-topbar">
                        <span>9:41</span>
                        <span class="dots"></span>
                        <span>5G</span>
                    </div>
                    <div class="demo-title">Review Booster</div>
                    <div class="rate" style="animation-delay:0.1s">
                        <b>How'd we do?</b>
                        <div class="stars">
                            <span class="s on"></span>
                            <span class="s on"></span>
                            <span class="s on"></span>
                            <span class="s on"></span>
                            <span class="s on"></span>
                        </div>
                        <div class="demo-sub">Private rating first</div>
                    </div>
                    <div class="demo-card ok" style="animation-delay:0.45s">
                        <div class="demo-row">
                            <b>If 4–5★</b>
                            <span class="pill green">Google link</span>
                        </div>
                        <div class="demo-sub">One tap → review posted</div>
                    </div>
                    <div class="demo-card" style="animation-delay:0.75s">
                        <div class="demo-row">
                            <b>If 1–3★</b>
                            <span class="pill amber">Owner alert</span>
                        </div>
                        <div class="demo-sub">Collect feedback privately before it goes public</div>
                    </div>
                </div>
            `
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
