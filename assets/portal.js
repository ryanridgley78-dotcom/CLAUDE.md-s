const loginForm = document.querySelector("[data-portal-login]");
const portalMessage = document.querySelector("[data-portal-message]");
const portalWelcome = document.querySelector("[data-portal-welcome]");
const portalRole = document.querySelector("[data-portal-role]");
const logoutButton = document.querySelector("[data-portal-logout]");
const portalHeaderActions = document.querySelector(".site-header .header-actions");
const clientPortalForm = document.querySelector("[data-client-portal-form]");
const clientPortalMessage = document.querySelector("[data-client-portal-message]");
const clientPortalList = document.querySelector("[data-client-portal-list]");
const clientApplicationDocument = document.querySelector("[data-client-application-document]");
const qahalApplicationSelect = document.querySelector("[data-qahal-application-select]");
const portalAssignment = document.querySelector("[data-portal-assignment]");
const portalReadingList = document.querySelector("[data-portal-reading-list]");
const portalReadingContent = document.querySelector("[data-portal-reading-content]");
const courseProgressSummary = document.querySelector("[data-course-progress-summary]");
const courseNextAssignment = document.querySelector("[data-course-next-assignment]");
const courseModuleRoadmap = document.querySelector("[data-course-module-roadmap]");
const accountPathForm = document.querySelector("[data-account-path-form]");
const accountPathMessage = document.querySelector("[data-account-path-message]");
const courseModuleEditors = document.querySelector("[data-course-module-editors]");
const courseModulePreview = document.querySelector("[data-course-module-preview]");
const addCourseModuleButton = document.querySelector("[data-add-course-module]");
const setPasswordForm = document.querySelector("[data-set-password-form]");
const setPasswordMessage = document.querySelector("[data-set-password-message]");
const passwordResetRequestForm = document.querySelector("[data-password-reset-request-form]");
const passwordResetRequestMessage = document.querySelector("[data-password-reset-request-message]");
const passwordResetForm = document.querySelector("[data-password-reset-form]");
const passwordResetMessage = document.querySelector("[data-password-reset-message]");
const passwordToggleInputs = document.querySelectorAll("[data-toggle-password]");
const editorOnlyPage = document.querySelector("[data-editor-only-page]");
const liveStreamManagementForm = document.querySelector("[data-live-stream-management-form]");
const liveStreamManagementMessage = document.querySelector("[data-live-stream-management-message]");
const liveStreamManagementToggle = document.querySelector("[data-live-stream-management-toggle]");
const liveStreamManagementStatus = document.querySelector("[data-live-stream-management-status]");
const liveStreamManagementButtons = document.querySelectorAll("[data-live-stream-set]");
const forgeLiveManagementForm = document.querySelector("[data-forge-live-management-form]");
const forgeLiveManagementMessage = document.querySelector("[data-forge-live-management-message]");
const forgeLiveManagementToggle = document.querySelector("[data-forge-live-management-toggle]");
const forgeLiveManagementStatus = document.querySelector("[data-forge-live-management-status]");
const forgeLiveManagementButtons = document.querySelectorAll("[data-forge-live-set]");
const patriarchAuthorityCodeList = document.querySelector("[data-patriarch-authority-code-list]");
const patriarchReferralList = document.querySelector("[data-patriarch-referral-list]");
const refreshPatriarchReferralsButton = document.querySelector("[data-refresh-patriarch-referrals]");
const portalInviteForm = document.querySelector("[data-portal-invite-form]");
const portalInviteMessage = document.querySelector("[data-portal-invite-message]");
const portalInviteResult = document.querySelector("[data-portal-invite-result]");
const portalUserList = document.querySelector("[data-portal-user-list]");
const gateApplicationSelect = document.querySelector("[data-gate-application-select]");
const approveGateApplicationButton = document.querySelector("[data-approve-gate-application]");
const denyGateApplicationButton = document.querySelector("[data-deny-gate-application]");
const dailyTaskReportForm = document.querySelector("[data-daily-task-report-form]");
const dailyTaskReportMessage = document.querySelector("[data-daily-task-report-message]");
const dailyTaskReportList = document.querySelector("[data-daily-task-report-list]");
const clientReflectionForms = document.querySelectorAll("[data-client-reflection-form]");
const clientReflectionList = document.querySelector("[data-client-reflection-list]");
const readinessAssessmentForms = document.querySelectorAll("[data-readiness-assessment-form]");
const elderWidowAssessmentForm = document.querySelector("[data-elder-widow-assessment-form]");
const elderWidowAssessmentMessage = document.querySelector("[data-elder-widow-assessment-message]");
const elderWidowAssessmentClientSelect = document.querySelector("[data-elder-widow-assessment-client]");
const widowsClientCourseworkList = document.querySelector("[data-widows-client-coursework-list]");
const clientCourseworkForm = document.querySelector("[data-client-coursework-form]");
const clientCourseworkMessage = document.querySelector("[data-client-coursework-message]");
const clientCourseworkTitle = document.querySelector("[data-client-coursework-title]");
const clientCourseworkItems = document.querySelector("[data-client-coursework-items]");
const clientCourseworkReports = document.querySelector("[data-client-coursework-reports]");
const clientCourseworkReflections = document.querySelector("[data-client-coursework-reflections]");
const clientModulePlan = document.querySelector("[data-client-module-plan]");
const clientModuleProgressMessage = document.querySelector("[data-client-module-progress-message]");
const myCourseworkList = document.querySelector("[data-my-coursework-list]");
const myReflectionList = document.querySelector("[data-my-reflection-list]");
const courseworkTemplateLibrary = document.querySelector("[data-coursework-template-library]");
const templateClientSelect = document.querySelector("[data-template-client-select]");
const templateAssignmentMessage = document.querySelector("[data-template-assignment-message]");
const courseModuleClientSelect = document.querySelector("[data-course-module-client-select]");
const courseModuleMessage = document.querySelector("[data-course-module-message]");
const portalDocumentForm = document.querySelector("[data-portal-document-form]");
const portalDocumentMessage = document.querySelector("[data-portal-document-message]");
const portalDocumentList = document.querySelector("[data-portal-document-list]");
const myDocumentsList = document.querySelector("[data-my-documents-list]");
const clientDocumentList = document.querySelector("[data-client-document-list]");
const documentScopeSelect = document.querySelector("[data-document-scope]");
const documentClientField = document.querySelector("[data-document-client-field]");
const documentClientSelect = document.querySelector("[data-document-client-select]");
const blogPostForm = document.querySelector("[data-blog-post-form]");
const blogPostMessage = document.querySelector("[data-blog-post-message]");
const blogPostList = document.querySelector("[data-blog-post-list]");
const blogPostReset = document.querySelector("[data-blog-post-reset]");
const blogPostTypeSelect = blogPostForm?.elements.post_type;
const mensForumForm = document.querySelector("[data-mens-forum-form]");
const mensForumMessage = document.querySelector("[data-mens-forum-message]");
const mensForumList = document.querySelector("[data-mens-forum-list]");
const mensForumLinks = document.querySelectorAll("[data-mens-forum-link]");
const elderManagementTabs = document.querySelectorAll("[data-elder-management-tabs]");
const portalDirectMessageForm = document.querySelector("[data-portal-direct-message-form]");
const portalDirectMessageMessage = document.querySelector("[data-portal-direct-message-message]");
const portalDirectMessageList = document.querySelector("[data-portal-direct-message-list]");
const directMessageRecipientSelect = document.querySelector("[data-direct-message-recipient-select]");
const directMessageFormLegend = document.querySelector("[data-direct-message-form-legend]");
const passwordSetupReminderForm = document.querySelector("[data-password-setup-reminder-form]");
const passwordSetupReminderMessage = document.querySelector("[data-password-setup-reminder-message]");
const passwordSetupReminderSelect = document.querySelector("[data-password-setup-reminder-select]");
const memberDirectoryList = document.querySelector("[data-member-directory-list]");
const memberMap = document.querySelector("[data-member-map]");
const memberMapList = document.querySelector("[data-member-map-list]");
const memberPreviewNote = document.querySelector("[data-member-preview-note]");
let memberPreviewExit = document.querySelector("[data-member-preview-exit]");
const memberPreviewNavigation = document.querySelector("[data-member-preview-navigation]");
const memberPreviewOnlyLinks = document.querySelectorAll("[data-member-preview-link]");
const clientOnlyLinks = document.querySelectorAll("[data-client-only-link]");
const memberProfileForm = document.querySelector("[data-member-profile-form]");
const memberProfileMessage = document.querySelector("[data-member-profile-message]");
const memberAvatarPreview = document.querySelector("[data-member-avatar-preview]");
const memberAvatarPlaceholder = document.querySelector("[data-member-avatar-placeholder]");
const removeMemberAvatarButton = document.querySelector("[data-remove-member-avatar]");

const DIRECT_MESSAGE_ELDER_RECIPIENTS = [
  {
    email: "ryanridgley78@gmail.com",
    name: "Ryan Ridgley",
    role: "elder",
    display_role: "Elder/Co-Founder",
  },
  {
    email: "restoringthekingdom2as1@gmail.com",
    name: "Jared Cheshire",
    role: "elder",
    display_role: "Elder",
  },
  {
    email: "prayerforlife@yahoo.com",
    name: "Samuel Barnes",
    role: "elder",
    display_role: "Elder",
  },
];

const portalPageParams = new URLSearchParams(window.location.search);
const requestedPortalPreviewMode = portalPageParams.get("preview") || "";
const requestedPortalPreviewSource = portalPageParams.get("preview_source") || "";
const portalPath = window.location.pathname;
const memberPreviewPaths = new Set([
  "/portal/member",
  "/portal/member.html",
  "/portal/member-directory",
  "/portal/member-directory.html",
  "/portal/mens-forum",
  "/portal/mens-forum.html",
]);
const clientPreviewPaths = new Set([
  "/portal/dashboard",
  "/portal/dashboard.html",
]);
const isPortalPreviewLaunch = requestedPortalPreviewSource === "management";
const isMemberPreview = isPortalPreviewLaunch && requestedPortalPreviewMode === "member" && memberPreviewPaths.has(portalPath);
const isClientPreview = isPortalPreviewLaunch && requestedPortalPreviewMode === "client" && clientPreviewPaths.has(portalPath);

if (isMemberPreview) {
  for (const tabs of elderManagementTabs) {
    tabs.hidden = true;
  }
}

const MEMBER_STATE_POINTS = {
  AL: [69, 68], AK: [18, 82], AZ: [24, 57], AR: [58, 60], CA: [13, 47],
  CO: [38, 48], CT: [88, 37], DE: [84, 48], FL: [75, 82], GA: [72, 68],
  HI: [33, 86], IA: [56, 41], ID: [25, 31], IL: [63, 47], IN: [68, 47],
  KS: [49, 52], KY: [69, 55], LA: [59, 73], MA: [90, 34], MD: [82, 49],
  ME: [92, 23], MI: [68, 35], MN: [55, 28], MO: [58, 53], MS: [64, 68],
  MT: [35, 25], NC: [79, 61], ND: [47, 24], NE: [47, 44], NH: [89, 29],
  NJ: [85, 45], NM: [34, 59], NV: [20, 45], NY: [82, 36], OH: [72, 45],
  OK: [50, 59], OR: [15, 33], PA: [80, 44], RI: [90, 38], SC: [76, 66],
  SD: [47, 34], TN: [66, 61], TX: [50, 73], UT: [29, 48], VA: [78, 55],
  VT: [87, 29], WA: [16, 22], WI: [62, 34], WV: [75, 52], WY: [36, 38],
  DC: [83, 51],
};
const MEMBER_STATE_CODES = new Set(Object.keys(MEMBER_STATE_POINTS));
const PORTAL_DOCUMENT_ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.txt,.rtf,.png,.jpg,.jpeg,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,text/rtf,application/rtf,image/png,image/jpeg,image/webp";

const COVENANT_HEADSHIP_WORKSHEET = {
  item_type: "assignment",
  title: "Covenant and Headship Worksheet",
  instructions: `Complete this worksheet and answer each question clearly.

1. What does covenant mean to you?
2. What is covenant?
3. What are the spiritual and practical consequences of being uncovered?
4. What does submission look like in daily decisions?
5. What is the role of a wife or widow under righteous authority or headship?
6. When should you bring concerns or insecurities to leadership, and when should you remain silent?`,
};

const WIDOWS_ASSIGNMENT_TEMPLATES = [
  {
    item_type: "assignment",
    title: "Widows Strengths Discovery Questionnaire",
    library_summary: "A multiple-choice strengths discovery assessment for the Widows program. Click the button below to open the full questionnaire page before sending it to a client.",
    detail_url: "widows-strengths-questionnaire.html",
    detail_cta: "Open full questionnaire",
    instructions: `Read each question slowly and choose the answer that sounds most like you. Answer from your normal pattern, not from what you think the answer should be. This is not the official CliftonStrengths assessment; it is a ministry reflection tool to help elders understand how you naturally think, serve, respond, learn, and grow.

For each question, write the question number and the letter you choose. After you finish, count how many times you chose each letter.

Strength Key
A = Order and Stewardship
B = Compassion and Encouragement
C = Discernment and Truth
D = Communication and Connection
E = Endurance and Follow-Through
F = Service and Support
G = Learning and Wisdom
H = Leadership and Initiative

Multiple Choice Questions
1. When a household feels unsettled, I naturally want to:
A. Create structure, clean up, and make a plan.
B. Comfort the people who are hurting.
C. Find the root issue and name what is wrong.
D. Talk through what everyone is feeling.
E. Stay steady and keep moving through the pressure.
F. Do whatever practical task is needed first.
G. Step back, pray, study, and seek understanding.
H. Take charge and help others know what to do next.

2. People most often come to me when they need:
A. Help organizing responsibilities.
B. Encouragement or emotional support.
C. Honest feedback or discernment.
D. Someone to listen and communicate clearly.
E. Someone dependable who will not quit.
F. Practical help and support.
G. Counsel, study, or perspective.
H. Direction, courage, or decision-making.

3. I feel most useful when I am:
A. Bringing order to a messy situation.
B. Helping someone feel seen and cared for.
C. Separating truth from confusion.
D. Helping people understand each other.
E. Finishing something difficult.
F. Serving quietly where help is needed.
G. Learning something that brings wisdom.
H. Leading a task or helping others move forward.

4. Under pressure, my first instinct is usually to:
A. Make a list or organize the next steps.
B. Notice who is emotionally affected.
C. Watch for deception, disorder, or hidden issues.
D. Talk it out or ask questions.
E. Endure and keep going.
F. Start helping with immediate needs.
G. Seek counsel, Scripture, or more information.
H. Make a decision and act.

5. Which statement best describes your natural contribution?
A. I bring order.
B. I bring comfort.
C. I bring discernment.
D. I bring connection.
E. I bring consistency.
F. I bring help.
G. I bring understanding.
H. I bring direction.

6. When correction is given, I most need to work on:
A. Not becoming rigid about my own way.
B. Not taking correction too personally.
C. Not becoming suspicious or overly critical.
D. Listening before explaining myself.
E. Receiving correction without discouragement.
F. Not hiding behind busyness or service.
G. Applying what I learn instead of only studying it.
H. Submitting instead of taking control.

7. In a righteous household, I believe I could best help by:
A. Keeping rhythms, responsibilities, and order.
B. Bringing warmth, nurture, and encouragement.
C. Helping guard the home from compromise.
D. Strengthening communication and peace.
E. Being faithful in repeated daily duties.
F. Supporting the household through practical service.
G. Helping children or others learn truth.
H. Helping move the household toward goals.

8. Which kind of assignment would you most naturally do well?
A. A household plan or weekly schedule.
B. A reflection on emotional healing.
C. A discernment worksheet.
D. A conversation or relationship reflection.
E. A daily consistency tracker.
F. A service task with practical steps.
G. A reading or Scripture study assignment.
H. A vision, goals, or leadership assignment.

9. When someone is struggling, I am most likely to:
A. Help them create order around the problem.
B. Encourage and comfort them.
C. Help them see the truth clearly.
D. Ask questions and listen carefully.
E. Remain steady with them over time.
F. Help with practical needs.
G. Share wisdom, Scripture, or resources.
H. Challenge them to take the next right step.

10. Which weakness do you recognize most in yourself?
A. I can become controlling when things feel disordered.
B. I can absorb other people's emotions too deeply.
C. I can become too blunt or suspicious.
D. I can talk too much or avoid hard conclusions.
E. I can keep going without asking for help.
F. I can serve while neglecting deeper issues.
G. I can study without acting.
H. I can push forward without enough patience.

11. I feel most peaceful when:
A. Things are clean, clear, and structured.
B. People feel loved and cared for.
C. Truth is clear and compromise is removed.
D. Communication is open and respectful.
E. I know I am being faithful over time.
F. Needs are being met.
G. I understand what YHWH is teaching me.
H. There is clear direction and movement.

12. Which phrase sounds most like you?
A. Let us put things in order.
B. Let me sit with you and encourage you.
C. Let us examine what is really happening.
D. Let us talk this through clearly.
E. Let us keep going and not give up.
F. Let me help with what needs to be done.
G. Let me study this and bring understanding.
H. Let us decide and move forward.

Scoring
1. Count the number of A, B, C, D, E, F, G, and H answers.
2. Your highest two or three letters show your strongest natural patterns.
3. Your lowest letters may show areas where you need support, correction, or practice.

Final Reflection
1. What were your top three letters?
2. Do those strengths accurately describe you? Why or why not?
3. How could those strengths serve a righteous household?
4. How could those same strengths become harmful if not submitted to YHWH, order, and correction?
5. What is one area you want elders to help you strengthen during the program?`,
  },
  {
    item_type: "assignment",
    title: "Personal Growth Improvement List",
    instructions: "List the things you would like to improve about yourself. Include spiritual growth, household order, emotional discipline, relationships, habits, and any areas where elder support may help.",
  },
  {
    item_type: "assignment",
    title: "Future Home Vision Board",
    instructions: "Create a vision board showing what you envision your future home would look like. Include household order, atmosphere, responsibilities, hospitality, family structure, and the kind of peace and fruit you want the home to carry.",
  },
  {
    item_type: "assignment",
    title: "What Are You Telling Yourself? Video Reflection",
    instructions: `Watch the video "What are you telling yourself?" by Orrin Woodward, then answer the questions below.

1. Think about the hurts from your past. How have they impacted you and your life?
2. How can you change the story you are telling yourself to release the hurt and move forward in a positive way?
3. Write a new story and read or tell it to yourself when your thinking is negative.`,
  },
  {
    item_type: "assignment",
    title: "An Inconvenient Reality: What is the Dark to Light Agenda?",
    instructions: `Watch the video "An Inconvenient Reality: What is the Dark to Light Agenda?" and prepare notes on the main points, anything that needs discernment, and questions you want elders to review with you.`,
  },
  {
    item_type: "daily_report",
    title: "Daily Task Report",
    instructions: "Submit a daily report with completed work, progress notes, blockers or questions, and next steps so elders can track movement and follow up.",
  },
  {
    item_type: "journal",
    title: "Weekly Journal Reflection",
    instructions: "Journal about growth, resistance, conviction, prayer, obedience, questions, and any area where elder support is needed.",
    related_items: [COVENANT_HEADSHIP_WORKSHEET],
  },
  {
    item_type: "dream",
    title: "Dream Discernment Entry",
    instructions: "If a dream stands out, submit the details, symbols, people, words, timing, and anything repeated so elders can review for prophetic discernment.",
  },
];

const WIDOWS_READING_TEMPLATES = [
  {
    item_type: "assignment",
    title: "Created to be His Help Meet",
    instructions: "Read Created to be His Help Meet and prepare notes on household order, helpmeet responsibility, and areas that need elder-guided discussion.",
  },
  {
    item_type: "assignment",
    title: "Love and Respect",
    instructions: "Read Love and Respect by Dr. Emerson Eggerichs and prepare notes on respect, communication, and patterns that affect covenantal household order.",
  },
  {
    item_type: "assignment",
    title: "How to Win Friends and Influence People",
    instructions: `Read How to Win Friends and Influence People by Dale Carnegie and answer the questions below.

1. What are your key takeaways from the book?
2. What are some things you have been doing well?
3. What will you do differently in your interactions with others based on what you have learned?`,
  },
  {
    item_type: "assignment",
    title: "Failing Forward",
    instructions: "Read Failing Forward by John Maxwell and prepare notes on repentance, learning from failure, resilience, and accountable growth.",
  },
  {
    item_type: "assignment",
    title: "The Slight Edge",
    instructions: "Read The Slight Edge by Jeff Olson and prepare notes on daily discipline, small decisions, consistency, and long-term fruit.",
  },
  {
    item_type: "assignment",
    title: "Financial Fitness",
    instructions: "Read Financial Fitness and prepare notes on stewardship, budgeting, household responsibility, and financial habits that support covenant order.",
  },
  {
    item_type: "assignment",
    title: "Queens Code",
    instructions: "Read Queens Code and prepare notes on womanhood, honor, conduct, household order, and areas that need elder-guided discussion.",
  },
  {
    item_type: "assignment",
    title: "The Sacred Order of Love",
    instructions: `Read "The Sacred Order of Love" by Jared Cheshire and write an essay answering the prompts below.

1. What did you get right?
2. Where did you fall short?
3. What are your plans to correct misalignment in the future household you are redeemed into?
4. What questions do you have about anything you were unaware of or need clarified?`,
  },
];

const WIDOWS_ASSESSMENT_TEMPLATES = [
  {
    item_type: "assignment",
    title: "Widows Readiness Assessment Part 1",
    library_summary: "Part 1 covers spiritual background and receiving correction. Click the button below to open the answer form.",
    detail_url: "widows-readiness-assessment.html",
    detail_cta: "Open Part 1",
    instructions: `Complete Widows Readiness Assessment Part 1 with honesty, prayer, and a willingness to be seen clearly. This is not a pass or fail assignment.

Open assessment page: /portal/widows-readiness-assessment.html

Answer each question in a few thoughtful sentences. Be clear, but do not feel pressured to write more than needed.

Spiritual Background
1. Briefly describe your current walk with YHWH and Yahushua.
2. What parts of Scripture, Torah, covenant, or household order are you most confident about right now?
3. What parts are still confusing, new, uncomfortable, or difficult for you?
4. What teachings, churches, ministries, or spiritual influences have shaped you the most?
5. Have you ever had to repent from beliefs, practices, relationships, or patterns that pulled you away from Scripture? What did that process teach you?

Receiving Correction
6. When someone corrects you, what is your first internal response?
7. Do you tend to defend, withdraw, explain, apologize quickly, ask questions, become quiet, or receive it calmly? Explain.
8. Describe a time when correction helped you grow.
9. Describe a time when correction was hard for you to receive. What made it difficult?
10. What kind of correction helps you most: direct, gentle, written, private conversation, repeated reminders, examples, or something else?`,
  },
  {
    item_type: "assignment",
    title: "Widows Readiness Assessment Part 2",
    library_summary: "Part 2 covers teachability, trust, household readiness, and final reflection. Click the button below to open the answer form.",
    detail_url: "widows-readiness-assessment-part-2.html",
    detail_cta: "Open Part 2",
    instructions: `Complete Widows Readiness Assessment Part 2 with honesty, prayer, and a willingness to be seen clearly. This is not a pass or fail assignment.

Open assessment page: /portal/widows-readiness-assessment-part-2.html

Answer each question in a few thoughtful sentences. Be clear, but do not feel pressured to write more than needed.

Teachability and Trust
1. What does it mean to you to be teachable?
2. How do you know when you are resisting instruction?
3. What would make it difficult for you to trust elders or leadership?
4. What would help you feel safe enough to be honest and accountable?
5. Are you willing to let elders challenge your thinking, habits, communication, spiritual practices, and household patterns if needed? Why or why not?

Household and Personal Readiness
6. What areas of your life feel most in order right now?
7. What areas feel most out of order or hard to manage?
8. What repeated pattern do you most want to break?
9. What kind of structure would help you grow over the next 90 days?
10. What would elders need to understand about you in order to shepherd you wisely?

Final Reflection
11. What do you believe YHWH is asking you to surrender in this season?
12. What are you hoping this widows program will help restore in you?
13. What are you afraid may be exposed during this process?
14. What kind of woman do you want to become through correction, healing, and covenant order?`,
  },
  {
    item_type: "assignment",
    title: "Elder-Only Widow Shepherding Assessment",
    elder_only: true,
    library_summary: "Private elder-only fillable form for repeated patterns, spiritual concerns, accountability needs, progress markers, submission, authority, and responses to elders. Open the form, complete it as an elder, then choose whether to send the completed copy to the client.",
    detail_url: "widow-shepherding-assessment.html",
    detail_cta: "Open elder form",
    assign_cta: "Open elder form",
    instructions: `ELDER ONLY - This assessment is for elder observation, review, and shepherding notes. Do not send this directly to the client unless elders intentionally choose to share part of it.

Use this assessment after reviewing applications, journals, dreams, daily reports, assignments, direct messages, and elder conversations. Keep notes factual, specific, and charitable.

Repeated Patterns
1. What repeated emotional, relational, spiritual, or household patterns are showing up?
2. Does she tend to repeat the same struggle after receiving instruction? If yes, describe the pattern.
3. What triggers appear to bring out the pattern most often?
4. Is the pattern improving, staying the same, or becoming more concerning?
5. What fruit would show that this pattern is being corrected?

Spiritual Issues
6. Are there spiritual beliefs, practices, fears, attachments, influences, or confusions that need elder review?
7. Has she been honest about spiritual background, former practices, or current struggles?
8. Does she show repentance and separation from practices that conflict with Scripture?
9. Are there dreams, journal entries, or statements that require discernment?
10. What spiritual counsel or assignment should be given next?

Accountability Needs
11. What kind of accountability does she appear to need most: daily structure, weekly check-ins, correction, practical tasks, prayer, reading, elder conversation, or another form?
12. Does she follow through after accountability is given?
13. Does she communicate when she is struggling, or does she disappear, delay, defend, or avoid?
14. What specific accountability expectation should be set for the next 30 days?
15. Who should be responsible for following up?

Submission and Authority
16. How does she respond when elders give direction she does not initially agree with?
17. Does she ask honest questions, resist, argue, withdraw, comply outwardly, or receive instruction with humility?
18. Does she understand the difference between submission, silence, fear, manipulation, and willing obedience?
19. Are there signs of independence, control, fear of authority, mistrust, or rebellion that need shepherding?
20. What would healthy submission and right response to authority look like for her next step?

Response to Elders
21. How does she respond to elder feedback?
22. Does she receive correction differently from different elders? If yes, note any pattern.
23. Does she communicate with respect, clarity, and honesty?
24. Does she become defensive, emotional, quiet, agreeable, avoidant, or teachable under review?
25. What approach seems to help her receive truth without shutting down?

Progress Markers
26. What measurable progress has been observed?
27. What assignments, reports, journals, or conversations show growth?
28. What concern remains unresolved?
29. What is the next correction, assignment, or conversation needed?
30. Overall readiness level:
- Not ready for deeper program structure
- Beginning readiness
- Growing but inconsistent
- Teachable and progressing
- Ready for deeper responsibility

Elder Summary
31. Main strengths observed:
32. Main concerns observed:
33. Current risk level: Low / Moderate / High
34. Recommended next step:
35. Date reviewed and elder initials:`,
  },
];

const WIDOWS_SCRIPTURE_TEMPLATES = [
  {
    item_type: "assignment",
    title: "Romans 7:14-21",
    instructions: "Read Romans 7:14-21. Write what this passage shows about the conflict between the desire to do what is right and the weakness of the flesh. Include any areas where you recognize this struggle in yourself and what repentance, accountability, and correction should look like.",
  },
  {
    item_type: "assignment",
    title: "Patience Scriptures",
    instructions: `Read and meditate on the patience scriptures below. Write what YHWH is showing you about endurance, waiting, restraint, and faithful response under pressure.

Endurance and Testing
- James 1:2-4
- Romans 5:3-5
- Hebrews 10:35-36
- 2 Peter 1:5-8

Waiting on YHWH
- Psalm 37:7
- Lamentations 3:25-26
- Ecclesiastes 7:8

Gentleness and Restraint
- Proverbs 14:29
- Galatians 5:22-23
- Colossians 3:12-13`,
    scripture_sections: [
      {
        title: "Endurance and Testing",
        scriptures: ["James 1:2-4", "Romans 5:3-5", "Hebrews 10:35-36", "2 Peter 1:5-8"],
      },
      {
        title: "Waiting on YHWH",
        scriptures: ["Psalm 37:7", "Lamentations 3:25-26", "Ecclesiastes 7:8"],
      },
      {
        title: "Gentleness and Restraint",
        scriptures: ["Proverbs 14:29", "Galatians 5:22-23", "Colossians 3:12-13"],
      },
    ],
  },
];

let cachedPortalClients = [];
let cachedQahalApplications = [];
let cachedGateApplications = [];
let cachedBlogPosts = [];
let cachedClientModulePath = null;
let cachedStudentAssignment = null;
let cachedStudentCourseworkItems = [];
let cachedCourseModuleDocuments = [];

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textBlock(value, fallback) {
  const text = String(value || fallback || "");
  return escapeHtml(text).replaceAll("\n", "<br>");
}

function forumTextBlock(value, fallback) {
  const text = String(value || fallback || "");
  const urlPattern = /\bhttps?:\/\/[^\s<>"']+/gi;
  let html = "";
  let cursor = 0;

  for (const match of text.matchAll(urlPattern)) {
    const rawUrl = match[0];
    const trailingPunctuation = rawUrl.match(/[),.!?;:]+$/)?.[0] || "";
    const url = trailingPunctuation ? rawUrl.slice(0, -trailingPunctuation.length) : rawUrl;

    html += escapeHtml(text.slice(cursor, match.index));
    html += `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>${escapeHtml(trailingPunctuation)}`;
    cursor = match.index + rawUrl.length;
  }

  html += escapeHtml(text.slice(cursor));
  return html.replaceAll("\n", "<br>");
}

function textPreview(value, maxLength = 150) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function hasPortalEditorAccess(user) {
  const role = String(user?.role || "").toLowerCase();
  const displayRole = String(user?.display_role || "").toLowerCase();
  return role === "admin" ||
    role === "editor" ||
    role === "elder" ||
    displayRole.includes("elder") ||
    displayRole.includes("deacon") ||
    displayRole.includes("co-founder");
}

function dashboardPathForUser(user) {
  if (hasPortalEditorAccess(user)) return "/portal/editor";
  if (user?.role === "client") return "/portal/dashboard";
  if (user?.role === "member") return "/portal/member";
  return "/index.html";
}

function dashboardPathForRole(role) {
  return dashboardPathForUser({ role });
}

function activePortalPreviewMode() {
  if (isMemberPreview) return "member";
  if (isClientPreview) return "client";
  return "";
}

function preservePortalPreviewLinks() {
  const previewMode = activePortalPreviewMode();
  if (!previewMode) return;

  const previewPaths = new Set([
    "/portal/dashboard.html",
    "/portal/member.html",
    "/portal/member-directory.html",
    "/portal/mens-forum.html",
  ]);

  for (const link of document.querySelectorAll("a[href]")) {
    if (link.hasAttribute("data-member-preview-exit")) continue;

    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) continue;

    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || !previewPaths.has(url.pathname)) continue;
      url.searchParams.set("preview", previewMode);
      url.searchParams.set("preview_source", "management");
      link.href = `${url.pathname}${url.search}${url.hash}`;
    } catch {
      // Ignore non-standard links.
    }
  }
}

function wirePortalPreviewExit() {
  for (const link of document.querySelectorAll("[data-member-preview-exit]")) {
    link.addEventListener("click", () => {
      link.href = "management.html";
    });
  }
}

function renderPortalPreviewExit(previewingPortal) {
  memberPreviewExit = document.querySelector("[data-member-preview-exit]");

  if (!previewingPortal) {
    memberPreviewExit?.remove();
    memberPreviewExit = null;
    return;
  }

  if (!portalHeaderActions) return;

  if (!memberPreviewExit) {
    memberPreviewExit = document.createElement("a");
    memberPreviewExit.className = "header-button";
    memberPreviewExit.href = "management.html";
    memberPreviewExit.dataset.memberPreviewExit = "true";
    memberPreviewExit.textContent = "Exit Preview";
    portalHeaderActions.prepend(memberPreviewExit);
  }

  memberPreviewExit.hidden = false;
}

function previewApiUrl(url) {
  const previewMode = activePortalPreviewMode();
  if (!previewMode) return url;

  try {
    const nextUrl = new URL(url, window.location.origin);
    const previewApiPaths = new Set([
      "/api/portal/assignment",
      "/api/portal/client-coursework",
      "/api/portal/client-reflections",
      "/api/portal/documents",
    ]);
    if (nextUrl.origin === window.location.origin && previewApiPaths.has(nextUrl.pathname)) {
      nextUrl.searchParams.set("preview", previewMode);
      return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
    }
  } catch {
    return url;
  }

  return url;
}

function welcomeTextForUser(user, template) {
  const title = portalUserRoleLabel(user);
  const shouldShowTitle = hasPortalEditorAccess(user);
  const displayName = `${shouldShowTitle ? `${title} ` : ""}${user.name}`.trim();

  if (template === "elder-client-management") {
    return `Welcome, ${displayName}. Your client management gate is ready.`;
  }

  if (template === "elder-short") {
    return `Welcome, ${displayName}`;
  }

  if (user.role === "member") {
    return `Welcome, ${user.name}`;
  }

  return `Welcome, ${user.name}`;
}

function showPortalMessage(message, isError = true) {
  if (!portalMessage) return;
  portalMessage.hidden = false;
  portalMessage.textContent = message;
  portalMessage.dataset.state = isError ? "error" : "success";
}

function showClientPortalMessage(message, isError = true) {
  if (!clientPortalMessage) return;
  clientPortalMessage.hidden = false;
  clientPortalMessage.textContent = message;
  clientPortalMessage.dataset.state = isError ? "error" : "success";
}

function showAccountPathMessage(message, isError = true) {
  if (!accountPathMessage) return;
  accountPathMessage.hidden = false;
  accountPathMessage.textContent = message;
  accountPathMessage.dataset.state = isError ? "error" : "success";
}

function showSetPasswordMessage(message, isError = true) {
  if (!setPasswordMessage) return;
  setPasswordMessage.hidden = false;
  setPasswordMessage.textContent = message;
  setPasswordMessage.dataset.state = isError ? "error" : "success";
}

function showPasswordResetRequestMessage(message, isError = true) {
  if (!passwordResetRequestMessage) return;
  passwordResetRequestMessage.hidden = false;
  passwordResetRequestMessage.textContent = message;
  passwordResetRequestMessage.dataset.state = isError ? "error" : "success";
}

function showPasswordResetMessage(message, isError = true) {
  if (!passwordResetMessage) return;
  passwordResetMessage.hidden = false;
  passwordResetMessage.textContent = message;
  passwordResetMessage.dataset.state = isError ? "error" : "success";
}

function showLiveStreamManagementMessage(message, isError = true) {
  if (!liveStreamManagementMessage) return;
  liveStreamManagementMessage.hidden = false;
  liveStreamManagementMessage.textContent = message;
  liveStreamManagementMessage.dataset.state = isError ? "error" : "success";
}

function showForgeLiveManagementMessage(message, isError = true) {
  if (!forgeLiveManagementMessage) return;
  forgeLiveManagementMessage.hidden = false;
  forgeLiveManagementMessage.textContent = message;
  forgeLiveManagementMessage.dataset.state = isError ? "error" : "success";
}

function showMensForumMessage(message, isError = true) {
  if (!mensForumMessage) return;
  mensForumMessage.hidden = false;
  mensForumMessage.textContent = message;
  mensForumMessage.dataset.state = isError ? "error" : "success";
}

function showPortalDirectMessage(message, isError = true) {
  if (!portalDirectMessageMessage) return;
  portalDirectMessageMessage.hidden = false;
  portalDirectMessageMessage.textContent = message;
  portalDirectMessageMessage.dataset.state = isError ? "error" : "success";
}

function showPasswordSetupReminderMessage(message, isError = true) {
  if (!passwordSetupReminderMessage) return;
  passwordSetupReminderMessage.hidden = false;
  passwordSetupReminderMessage.textContent = message;
  passwordSetupReminderMessage.dataset.state = isError ? "error" : "success";
}

function showPortalInviteMessage(message, isError = true) {
  if (!portalInviteMessage) return;
  portalInviteMessage.hidden = false;
  portalInviteMessage.textContent = message;
  portalInviteMessage.dataset.state = isError ? "error" : "success";
}

function portalUserRoleLabel(user) {
  if (user.display_role) return user.display_role;
  const labels = {
    admin: "Admin",
    editor: "Editor",
    elder: "Elder",
    deacon: "Deacon",
    member: "Member",
    client: "Client",
  };
  return labels[user.role] || user.role;
}

function hasAutomaticMensForumAccess(user) {
  return hasPortalEditorAccess(user);
}

function showDailyTaskReportMessage(message, isError = true) {
  if (!dailyTaskReportMessage) return;
  dailyTaskReportMessage.hidden = false;
  dailyTaskReportMessage.textContent = message;
  dailyTaskReportMessage.dataset.state = isError ? "error" : "success";
}

function showClientReflectionMessage(type, message, isError = true) {
  const reflectionMessage = document.querySelector(`[data-client-reflection-message="${type}"]`);
  if (!reflectionMessage) return;
  reflectionMessage.hidden = false;
  reflectionMessage.textContent = message;
  reflectionMessage.dataset.state = isError ? "error" : "success";
}

function showReadinessAssessmentMessage(form, message, isError = true) {
  const messageEl = form.querySelector("[data-readiness-assessment-message]");
  if (!messageEl) return;
  messageEl.hidden = false;
  messageEl.textContent = message;
  messageEl.dataset.state = isError ? "error" : "success";
}

function showElderWidowAssessmentMessage(message, isError = true) {
  if (!elderWidowAssessmentMessage) return;
  elderWidowAssessmentMessage.hidden = false;
  elderWidowAssessmentMessage.textContent = message;
  elderWidowAssessmentMessage.dataset.state = isError ? "error" : "success";
}

function reflectionTypeLabel(type) {
  return type === "dream" ? "Dream" : "Journal";
}

function courseworkTypeLabel(type) {
  const labels = {
    course: "Course",
    assignment: "Assignment",
    daily_report: "Daily Task Report",
    journal: "Journal",
    dream: "Dream",
  };
  return labels[type] || "Coursework";
}

function courseworkDetailUrlForTitle(title) {
  const detailUrls = {
    "Widows Strengths Discovery Questionnaire": "widows-strengths-questionnaire.html",
    "Widows Readiness Assessment Part 1": "widows-readiness-assessment.html",
    "Widows Readiness Assessment Part 2": "widows-readiness-assessment-part-2.html",
  };
  return detailUrls[String(title || "").trim()] || "";
}

function showClientCourseworkMessage(message, isError = true) {
  if (!clientCourseworkMessage) return;
  clientCourseworkMessage.hidden = false;
  clientCourseworkMessage.textContent = message;
  clientCourseworkMessage.dataset.state = isError ? "error" : "success";
}

function showClientModuleProgressMessage(message, isError = true) {
  if (!clientModuleProgressMessage) return;
  clientModuleProgressMessage.hidden = false;
  clientModuleProgressMessage.textContent = message;
  clientModuleProgressMessage.dataset.state = isError ? "error" : "success";
}

function moduleStatusLabel(status) {
  const labels = {
    not_started: "Not Started",
    in_progress: "In Progress",
    awaiting_review: "Awaiting Review",
    complete: "Complete",
    not_required: "Not Required",
  };
  return labels[status] || labels.not_started;
}

function showTemplateAssignmentMessage(message, isError = true) {
  if (!templateAssignmentMessage) return;
  templateAssignmentMessage.hidden = false;
  templateAssignmentMessage.textContent = message;
  templateAssignmentMessage.dataset.state = isError ? "error" : "success";
}

function showCourseModuleMessage(message, isError = true) {
  if (!courseModuleMessage) return;
  courseModuleMessage.hidden = false;
  courseModuleMessage.textContent = message;
  courseModuleMessage.dataset.state = isError ? "error" : "success";
}

function showPortalDocumentMessage(message, isError = true) {
  if (!portalDocumentMessage) return;
  portalDocumentMessage.hidden = false;
  portalDocumentMessage.textContent = message;
  portalDocumentMessage.dataset.state = isError ? "error" : "success";
}

function showMemberProfileMessage(message, isError = true) {
  if (!memberProfileMessage) return;
  memberProfileMessage.hidden = false;
  memberProfileMessage.textContent = message;
  memberProfileMessage.dataset.state = isError ? "error" : "success";
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0);
  if (!size) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(size >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

function showBlogPostMessage(message, isError = true) {
  if (!blogPostMessage) return;
  blogPostMessage.hidden = false;
  blogPostMessage.textContent = message;
  blogPostMessage.dataset.state = isError ? "error" : "success";
}

function formatPortalDate(value) {
  if (!value) return "Not published";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function liveStreamScheduleEnabled(value) {
  if (value && typeof value === "object") {
    return Boolean(value.schedule_enabled ?? value.enabled);
  }
  return Boolean(value);
}

function updateLiveStreamManagementStatus(status) {
  const scheduleEnabled = liveStreamScheduleEnabled(status);
  const activeNow = Boolean(status && typeof status === "object" && status.active);
  const alwaysAvailable = Boolean(status && typeof status === "object" && status.always_available);
  if (liveStreamManagementToggle) {
    liveStreamManagementToggle.value = scheduleEnabled ? "true" : "false";
    liveStreamManagementToggle.checked = scheduleEnabled;
  }
  for (const button of liveStreamManagementButtons) {
    const buttonEnabled = button.dataset.liveStreamSet === "true";
    button.classList.toggle("is-active", buttonEnabled === scheduleEnabled);
    button.setAttribute("aria-pressed", buttonEnabled === scheduleEnabled ? "true" : "false");
  }
  if (!liveStreamManagementStatus) return;
  liveStreamManagementStatus.textContent = scheduleEnabled
    ? alwaysAvailable
      ? "The Zoom Live Stream schedule is on. Elders and admins can open the link anytime; members see the tab but can only open it Saturdays from 2:45-3:44 PM Eastern."
      : activeNow
      ? "The Zoom Live Stream link is active now for signed-in accounts during the Saturday 2:45-3:44 PM Eastern window."
      : "The Zoom Live Stream schedule is on. Members see the tab, but it is clickable only Saturdays from 2:45-3:44 PM Eastern."
    : "The Zoom Live Stream schedule is off. The hero tab stays hidden.";
}

function updateForgeLiveManagementStatus(enabled) {
  if (forgeLiveManagementToggle) {
    forgeLiveManagementToggle.value = enabled ? "true" : "false";
    forgeLiveManagementToggle.checked = Boolean(enabled);
  }
  for (const button of forgeLiveManagementButtons) {
    const buttonEnabled = button.dataset.forgeLiveSet === "true";
    button.classList.toggle("is-active", buttonEnabled === Boolean(enabled));
    button.setAttribute("aria-pressed", buttonEnabled === Boolean(enabled) ? "true" : "false");
  }
  if (!forgeLiveManagementStatus) return;
  forgeLiveManagementStatus.textContent = enabled
    ? "The Forge Live button is visible to logged-in members on the hero page."
    : "The Forge Live button is hidden from logged-in members on the hero page.";
}

async function portalFetch(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData) && !headers["content-type"]) {
    headers["content-type"] = "application/json";
  }

  const response = await fetch(previewApiUrl(url), {
    credentials: "same-origin",
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Something went wrong. Please try again.");
  }

  return payload;
}

function patriarchReferralStatus(referral) {
  if (Number(referral.application_id || 0) > 0) return "Application Submitted";
  return "Referral Connected";
}

function renderPatriarchAuthorityCodes(authorities) {
  if (!patriarchAuthorityCodeList) return;

  if (!authorities.length) {
    patriarchAuthorityCodeList.innerHTML = `<p class="form-note">No authorized referral codes are configured yet.</p>`;
    return;
  }

  patriarchAuthorityCodeList.innerHTML = authorities.map((authority) => `
    <article class="portal-referral-card portal-authority-code-card">
      <div class="portal-referral-card-header">
        <span class="portal-referral-code">${escapeHtml(authority.code || "")}</span>
        <span class="portal-referral-status">${escapeHtml(authority.title || "Authorized Referral Code")}</span>
      </div>
      <div class="portal-user-detail-grid">
        <span><b>Name</b>${escapeHtml(authority.name || "Not named")}</span>
        <span><b>Source</b>${escapeHtml(authority.source || "Not provided")}</span>
      </div>
    </article>
  `).join("");
}

function renderPatriarchReferrals(referrals) {
  if (!patriarchReferralList) return;

  if (!referrals.length) {
    patriarchReferralList.innerHTML = `<p class="form-note">No Patriarch referral codes have been connected yet.</p>`;
    return;
  }

  patriarchReferralList.innerHTML = referrals.map((referral) => {
    const applicant = referral.applicant_name || referral.applicant_email || "Application not submitted yet";
    const created = formatPortalDate(referral.created_at);
    const updated = formatPortalDate(referral.application_submitted_at || referral.updated_at);
    const documentPath = referral.document_path || "";
    return `
      <article class="portal-referral-card">
        <div class="portal-referral-card-header">
          <span class="portal-referral-code">Code: ${escapeHtml(referral.referral_code || "No code")}</span>
          <span class="portal-referral-status">${escapeHtml(patriarchReferralStatus(referral))}</span>
        </div>
        <div class="portal-user-detail-grid">
          <span><b>Code Owner</b>${escapeHtml(referral.code_owner_name || "Not matched")}</span>
          <span><b>Owner Role</b>${escapeHtml(referral.code_owner_title || "Not provided")}</span>
          <span><b>Applicant</b>${escapeHtml(applicant)}</span>
          <span><b>Referral Added</b>${escapeHtml(created)}</span>
          <span><b>Last Updated</b>${escapeHtml(updated)}</span>
        </div>
        ${referral.referral_notes ? `<p class="form-note">${escapeHtml(referral.referral_notes)}</p>` : ""}
        ${documentPath ? `<a class="portal-inline-action" href="${escapeHtml(documentPath)}" target="_blank" rel="noopener">Open Referral Letter</a>` : ""}
      </article>
    `;
  }).join("");
}

async function loadPatriarchReferrals() {
  if (!patriarchReferralList && !patriarchAuthorityCodeList) return;
  if (patriarchReferralList) patriarchReferralList.innerHTML = `<p class="form-note">Loading Patriarch referrals...</p>`;
  if (patriarchAuthorityCodeList) patriarchAuthorityCodeList.innerHTML = `<p class="form-note">Loading authorized referral codes...</p>`;
  if (refreshPatriarchReferralsButton) refreshPatriarchReferralsButton.disabled = true;

  try {
    const { authorized_referrers, referrals } = await portalFetch("/api/patriarch-referrals");
    renderPatriarchAuthorityCodes(authorized_referrers || []);
    renderPatriarchReferrals(referrals || []);
  } catch (error) {
    if (patriarchAuthorityCodeList) patriarchAuthorityCodeList.innerHTML = `<p class="portal-message" data-state="error">${escapeHtml(error.message)}</p>`;
    if (patriarchReferralList) patriarchReferralList.innerHTML = `<p class="portal-message" data-state="error">${escapeHtml(error.message)}</p>`;
  } finally {
    if (refreshPatriarchReferralsButton) refreshPatriarchReferralsButton.disabled = false;
  }
}

refreshPatriarchReferralsButton?.addEventListener("click", loadPatriarchReferrals);
if (patriarchReferralList || patriarchAuthorityCodeList) {
  loadPatriarchReferrals();
}

for (const toggle of passwordToggleInputs) {
  toggle.addEventListener("change", () => {
    const form = toggle.closest("form");
    if (!form) return;

    const nextType = toggle.checked ? "text" : "password";
    for (const field of form.querySelectorAll("input[type='password'], input[data-password-visible='true']")) {
      if (field.name === "password" || field.name === "confirm_password") {
        field.type = nextType;
        field.dataset.passwordVisible = toggle.checked ? "true" : "false";
      }
    }
  });
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = loginForm.querySelector("button[type='submit']");
  const formData = new FormData(loginForm);

  submitButton.disabled = true;
  showPortalMessage("Signing in...", false);

  try {
    const { user } = await portalFetch("/api/portal/login", {
      method: "POST",
      body: JSON.stringify({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      }),
    });
    window.location.assign(dashboardPathForUser(user));
  } catch (error) {
    showPortalMessage(error.message);
    submitButton.disabled = false;
  }
});

if (setPasswordForm) {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";
  const email = params.get("email") || "";
  setPasswordForm.elements.token.value = token;
  setPasswordForm.elements.email.value = email;
}

for (const link of mensForumLinks) {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

setPasswordForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = setPasswordForm.querySelector("button[type='submit']");
  const formData = new FormData(setPasswordForm);
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  if (password !== confirmPassword) {
    showSetPasswordMessage("Passwords do not match.");
    return;
  }

  submitButton.disabled = true;
  showSetPasswordMessage("Setting password...", false);

  try {
    const { user } = await portalFetch("/api/portal/set-password", {
      method: "POST",
      body: JSON.stringify({
        email: String(formData.get("email") || ""),
        token: String(formData.get("token") || ""),
        password,
      }),
    });
    showSetPasswordMessage("Password set. Opening your gate...", false);
    window.location.assign(dashboardPathForUser(user));
  } catch (error) {
    showSetPasswordMessage(error.message);
    submitButton.disabled = false;
  }
});

passwordResetRequestForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = passwordResetRequestForm.querySelector("button[type='submit']");
  const formData = new FormData(passwordResetRequestForm);

  submitButton.disabled = true;
  showPasswordResetRequestMessage("Sending reset link...", false);

  try {
    const result = await portalFetch("/api/portal/password-reset-request", {
      method: "POST",
      body: JSON.stringify({
        email: String(formData.get("email") || ""),
      }),
    });
    showPasswordResetRequestMessage(
      result.email_error
        ? `Reset link created, but email failed: ${result.email_error}`
        : result.message || "If that account exists, a reset link will be sent.",
      Boolean(result.email_error),
    );
  } catch (error) {
    showPasswordResetRequestMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

if (passwordResetForm) {
  const params = new URLSearchParams(window.location.search);
  passwordResetForm.elements.token.value = params.get("token") || "";
  passwordResetForm.elements.email.value = params.get("email") || "";
}

passwordResetForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = passwordResetForm.querySelector("button[type='submit']");
  const formData = new FormData(passwordResetForm);
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  if (password !== confirmPassword) {
    showPasswordResetMessage("Passwords do not match.");
    return;
  }

  submitButton.disabled = true;
  showPasswordResetMessage("Resetting password...", false);

  try {
    const { user } = await portalFetch("/api/portal/password-reset", {
      method: "POST",
      body: JSON.stringify({
        email: String(formData.get("email") || ""),
        token: String(formData.get("token") || ""),
        password,
      }),
    });
    showPasswordResetMessage("Password reset. Opening your gate...", false);
    window.location.assign(dashboardPathForUser(user));
  } catch (error) {
    showPasswordResetMessage(error.message);
    submitButton.disabled = false;
  }
});

if (portalWelcome || portalRole || memberPreviewExit || memberPreviewNote || memberPreviewNavigation) {
  portalFetch("/api/portal/me")
    .then(({ user }) => {
      if (editorOnlyPage && !hasPortalEditorAccess(user)) {
        window.location.assign(dashboardPathForUser(user));
        return;
      }

      if (portalWelcome) {
        portalWelcome.textContent = welcomeTextForUser(user, portalWelcome.dataset.portalWelcomeTemplate);
      }
      if (portalRole) {
        portalRole.textContent = portalRole.dataset.portalRoleLabel || user.display_role || user.role.replace("_", " ");
      }
      const canPreviewPortal = hasPortalEditorAccess(user);
      const previewingMember = canPreviewPortal && isMemberPreview;
      const previewingClient = canPreviewPortal && isClientPreview;
      const previewingPortal = previewingMember || previewingClient;
      renderPortalPreviewExit(previewingPortal);
      if (memberPreviewNote) {
        memberPreviewNote.hidden = !previewingPortal;
        if (previewingPortal) {
          memberPreviewNote.firstChild.textContent = previewingClient
            ? "Previewing client course access as an elder."
            : "Previewing member access as an elder.";
        }
      }
      if (memberPreviewNavigation) {
        memberPreviewNavigation.hidden = !(user.role === "member" || user.role === "client" || previewingPortal);
        for (const link of memberPreviewOnlyLinks) {
          link.hidden = user.role === "client" || previewingClient;
        }
        for (const link of clientOnlyLinks) {
          link.hidden = user.role !== "client" && !previewingClient;
        }
      }
      if (portalWelcome && previewingPortal) {
        portalWelcome.textContent = previewingClient ? "Welcome, Client Preview" : "Welcome, Member Preview";
      }
      if (memberProfileForm) {
        hydrateMemberProfile(user);
      }
      const canEdit = hasPortalEditorAccess(user) && !previewingPortal;
      for (const tabs of elderManagementTabs) {
        tabs.hidden = !canEdit;
      }
      const canUseMensForum = hasAutomaticMensForumAccess(user) || Boolean(user.mens_forum_approved);
      for (const link of mensForumLinks) {
        link.hidden = false;
        link.setAttribute("aria-disabled", canUseMensForum ? "false" : "true");
        link.classList.toggle("is-disabled", !canUseMensForum);
        link.title = canUseMensForum ? "" : "Men's Forum access has not been approved for this account.";
      }
    })
    .catch(() => {
      window.location.assign("/portal/login.html");
    });
}

preservePortalPreviewLinks();
wirePortalPreviewExit();

logoutButton?.addEventListener("click", async () => {
  logoutButton.disabled = true;
  await portalFetch("/api/portal/logout", { method: "POST", body: "{}" }).catch(() => {});
  window.location.assign("/portal/login.html");
});

function renderClientPortals(clients) {
  if (!clientPortalList) return;

  if (!clients.length) {
    clientPortalList.innerHTML = "<p>No clients have been added to a program yet.</p>";
    return;
  }

  clientPortalList.innerHTML = clients.map((client) => {
    const hasApplication = Boolean(client.application_text);
    return `
    <details class="portal-client-item portal-user-detail-card portal-user-profile portal-enrolled-client-card" data-client-email="${escapeHtml(client.client_email)}">
      <summary>
        <span class="portal-user-main">
          <strong>${escapeHtml(client.client_name)}</strong>
          <small>${escapeHtml(client.client_email)}</small>
        </span>
        <span class="portal-user-summary-meta">
          <span class="portal-user-role-pill">${escapeHtml(client.account_type)}</span>
          <span class="portal-user-status-pill">${hasApplication ? "Program application connected" : "No program application connected"}</span>
        </span>
      </summary>
      <div class="portal-user-profile-detail">
        <div class="portal-user-detail-grid">
          <span><b>Program</b>${escapeHtml(client.account_type || "None assigned")}</span>
          <span><b>Program Title</b>${escapeHtml(client.portal_title || "None assigned")}</span>
          <span><b>Application Type</b>${escapeHtml(client.application_type || "Not connected")}</span>
          <span><b>Application Submitted</b>${escapeHtml(formatPortalDate(client.application_submitted_at) || client.application_submitted_at || "No program application stored")}</span>
          <span><b>Phone</b>${escapeHtml(client.phone || "Not provided")}</span>
          <span><b>Location</b>${escapeHtml(client.location || "Not provided")}</span>
        </div>
        ${hasApplication ? `
          <div class="portal-user-application">
            <strong>Program Application</strong>
            <small>${escapeHtml(applicationOptionLabel({
              application_type: client.application_type,
              email: client.client_email,
              full_name: client.application_full_name || client.client_name,
              submitted_at: client.application_submitted_at,
              updated_at: client.application_updated_at,
            }))}</small>
            <a class="portal-inline-action" href="${escapeHtml(clientApplicationDocumentUrl(client))}" aria-label="Open program application document for ${escapeHtml(client.client_name)}">Open Application Document</a>
          </div>
        ` : `
          <span class="portal-status-pill">No connected application. Add the client from the finished program application dropdown to link one here.</span>
        `}
        <button class="portal-delete-button" type="button" data-delete-client="${escapeHtml(client.client_email)}" aria-label="Delete assignment for ${escapeHtml(client.client_name)}">
          Delete
        </button>
      </div>
    </details>
  `;
  }).join("");
}

function clientApplicationDocumentUrl(client) {
  const email = encodeURIComponent(String(client.client_email || "").trim().toLowerCase());
  return `client-application.html?client_email=${email}`;
}

function renderQahalApplicationOptions(applications) {
  if (!qahalApplicationSelect) return;

  const selectedValue = qahalApplicationSelect.value;
  const options = applications.map((application) => (
    `<option value="${escapeHtml(application.id)}">${escapeHtml(applicationOptionLabel(application))}</option>`
  )).join("");

  qahalApplicationSelect.innerHTML = `<option value="">Choose a Widows, Orphans, or Patriarch application</option>${options}`;
  if (selectedValue) qahalApplicationSelect.value = selectedValue;
}

function applicationOptionLabel(application) {
  const name = application.full_name || `${application.first_name || ""} ${application.last_name || ""}`.trim() || application.email;
  const status = application.application_type ? ` - ${application.application_type}` : application.approval_status ? ` - ${application.approval_status}` : "";
  const submitted = formatPortalDate(application.submitted_at || application.updated_at);
  return submitted ? `${name} - ${application.email}${status} - ${submitted}` : `${name} - ${application.email}${status}`;
}

function applicationJsonData(application) {
  try {
    const data = JSON.parse(application?.application_json || "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function fillFormFromApplication(form, application, nameField = "name", emailField = "email") {
  if (!form || !application) return;
  const name = application.full_name || `${application.first_name || ""} ${application.last_name || ""}`.trim();
  if (form.elements[nameField] && name) {
    form.elements[nameField].value = name;
  }
  if (form.elements[emailField] && application.email) {
    form.elements[emailField].value = application.email;
  }
}

async function loadClientPortals() {
  if (!clientPortalList && !qahalApplicationSelect) return;

  try {
    const { clients, applications } = await portalFetch("/api/portal/clients");
    cachedPortalClients = clients;
    cachedQahalApplications = applications || [];
    renderClientPortals(clients);
    renderTemplateClientOptions(clients);
    renderQahalApplicationOptions(cachedQahalApplications);
  } catch (error) {
    if (clientPortalList) clientPortalList.innerHTML = `<p>${error.message}</p>`;
  }
}

qahalApplicationSelect?.addEventListener("change", () => {
  const selectedId = Number(qahalApplicationSelect.value || 0);
  const application = cachedQahalApplications.find((item) => Number(item.id || 0) === selectedId);
  fillFormFromApplication(clientPortalForm, application, "client_name", "client_email");
});

clientPortalForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = clientPortalForm.querySelector("button[type='submit']");
  const formData = new FormData(clientPortalForm);

  submitButton.disabled = true;
  showClientPortalMessage("Adding client to program...", false);

  try {
    await portalFetch("/api/portal/clients", {
      method: "POST",
      body: JSON.stringify({
        client_name: String(formData.get("client_name") || ""),
        client_email: String(formData.get("client_email") || ""),
        application_id: String(formData.get("application_id") || ""),
        account_type: String(formData.get("account_type") || ""),
        portal_title: String(formData.get("portal_title") || ""),
        first_assignment: String(formData.get("first_assignment") || ""),
      }),
    });
    showClientPortalMessage("Client added to program.", false);
    clientPortalForm.reset();
    await loadClientPortals();
  } catch (error) {
    showClientPortalMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

if (clientPortalList) {
  loadClientPortals();
}

function renderClientApplicationDocument(client) {
  if (!clientApplicationDocument) return;

  if (!client) {
    clientApplicationDocument.innerHTML = `
      <p class="portal-message" data-state="error">Client application was not found.</p>
      <a class="portal-inline-action" href="clients.html">Back to Enrolled Clients</a>
    `;
    return;
  }

  const hasApplication = Boolean(client.application_text);
  const applicationLabel = applicationOptionLabel({
    application_type: client.application_type,
    email: client.client_email,
    full_name: client.application_full_name || client.client_name,
    submitted_at: client.application_submitted_at,
    updated_at: client.application_updated_at,
  });
  const applicationData = applicationJsonData(client);
  const referralDocumentUrl = String(applicationData.referral_document_path || applicationData.referral_document_url || "").trim();
  const referralDocumentName = String(applicationData.referral_document_name || applicationData.referral_letter || "Referral letter/document").trim();

  clientApplicationDocument.innerHTML = `
    <div class="portal-application-document-header">
      <span class="section-kicker">Program Application</span>
      <h3>${escapeHtml(client.application_full_name || client.client_name)}</h3>
      <p>${escapeHtml(applicationLabel)}</p>
    </div>
    <div class="portal-user-detail-grid">
      <span><b>Program</b>${escapeHtml(client.account_type || "None assigned")}</span>
      <span><b>Program Title</b>${escapeHtml(client.portal_title || "None assigned")}</span>
      <span><b>Application Type</b>${escapeHtml(client.application_type || "Not connected")}</span>
      <span><b>Submitted</b>${escapeHtml(formatPortalDate(client.application_submitted_at) || client.application_submitted_at || "No program application stored")}</span>
      <span><b>Phone</b>${escapeHtml(client.phone || "Not provided")}</span>
      <span><b>Location</b>${escapeHtml(client.location || "Not provided")}</span>
    </div>
    ${referralDocumentUrl ? `
      <section class="portal-application-document-body" aria-label="Connected referral letter">
        <h4>Referral Letter / Document</h4>
        <p>${escapeHtml(referralDocumentName)}</p>
        <a class="portal-inline-action" href="${escapeHtml(referralDocumentUrl)}" target="_blank" rel="noopener">Open Referral Document</a>
      </section>
    ` : ""}
    ${hasApplication ? `
      <section class="portal-application-document-body" aria-label="Full program application">
        <h4>Main Application Document</h4>
        <p>${textBlock(client.application_text)}</p>
      </section>
    ` : `
      <p class="portal-message" data-state="error">No connected application is stored for this client.</p>
    `}
    <a class="portal-inline-action" href="clients.html">Back to Enrolled Clients</a>
  `;
}

async function loadClientApplicationDocument() {
  if (!clientApplicationDocument) return;
  const clientEmail = String(portalPageParams.get("client_email") || "").trim().toLowerCase();
  if (!clientEmail) {
    renderClientApplicationDocument(null);
    return;
  }

  try {
    const { clients } = await portalFetch("/api/portal/clients");
    const client = (clients || []).find((item) => String(item.client_email || "").toLowerCase() === clientEmail);
    renderClientApplicationDocument(client || null);
  } catch (error) {
    clientApplicationDocument.innerHTML = `<p class="portal-message" data-state="error">${escapeHtml(error.message)}</p>`;
  }
}

if (clientApplicationDocument) {
  loadClientApplicationDocument();
}

async function approveQahalApplication(button, reloadCallback) {
  const email = button.dataset.qahalApproval;
  const alreadyApproved = button.dataset.qahalApproved === "yes";
  const defaultLabel = button.dataset.qahalActionLabel || "Approve Join Qahal";
  const approvedLabel = button.dataset.qahalApprovedLabel || "Resend Approval Email";
  button.disabled = true;
  button.textContent = alreadyApproved ? "Sending approval email..." : "Approving...";

  try {
    const { application } = await portalFetch("/api/portal/qahal-applications", {
      method: "PATCH",
      body: JSON.stringify({
        email,
        send_email: true,
      }),
    });

    const status = application.email_sent
      ? "Join Qahal approved and approval email sent."
      : application.email_error
        ? `Join Qahal approved, but email failed: ${application.email_error}`
        : "Join Qahal approved.";
    window.alert(status);
    await reloadCallback();
  } catch (error) {
    window.alert(error.message);
    button.disabled = false;
    button.textContent = alreadyApproved ? approvedLabel : defaultLabel;
  }
}

async function denyQahalApplication(email, reloadCallback) {
  if (!email || !window.confirm("Deny this Join Qahal application? It will no longer appear in the Create Gate Login list.")) {
    return false;
  }

  await portalFetch("/api/portal/qahal-applications", {
    method: "PATCH",
    body: JSON.stringify({
      email,
      approval_status: "denied",
      send_email: false,
    }),
  });

  await reloadCallback();
  return true;
}

clientPortalList?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-qahal-approval]");
  if (!button) return;

  await approveQahalApplication(button, loadClientPortals);
});

function renderTemplateClientOptions(clients) {
  if (!templateClientSelect && !courseModuleClientSelect && !documentClientSelect) return;

  const selectedValue = templateClientSelect?.value || "";
  const programFilter = String(templateClientSelect?.dataset.templateClientProgram || "").trim().toLowerCase();
  const singularProgramFilter = programFilter.replace(/s$/, "");
  const visibleClients = programFilter
    ? clients.filter((client) => {
      const accountType = String(client.account_type || "").trim().toLowerCase();
      return accountType === programFilter || accountType === singularProgramFilter || accountType.includes(singularProgramFilter);
    })
    : clients;
  const recipientLabel = programFilter === "widows" ? "widow" : "client";
  const options = visibleClients.map((client) => `
    <option value="${escapeHtml(client.client_email)}">${escapeHtml(client.client_name)} - ${escapeHtml(client.account_type)}</option>
  `).join("");
  if (templateClientSelect) {
    templateClientSelect.innerHTML = `<option value="">Choose a ${recipientLabel}</option>${options}`;
  }
  if (courseModuleClientSelect) {
    const courseSelectedValue = courseModuleClientSelect.value;
    courseModuleClientSelect.innerHTML = `<option value="">Choose a client</option>${clients.map((client) => `
      <option value="${escapeHtml(client.client_email)}">${escapeHtml(client.client_name)} - ${escapeHtml(client.account_type)}</option>
    `).join("")}`;
    if (courseSelectedValue && clients.some((client) => client.client_email === courseSelectedValue)) {
      courseModuleClientSelect.value = courseSelectedValue;
    }
  }
  if (documentClientSelect) {
    const documentSelectedValue = documentClientSelect.value;
    documentClientSelect.innerHTML = `<option value="">Choose a client</option>${clients.map((client) => `
      <option value="${escapeHtml(client.client_email)}">${escapeHtml(client.client_name)} - ${escapeHtml(client.account_type)}</option>
    `).join("")}`;
    if (documentSelectedValue && clients.some((client) => client.client_email === documentSelectedValue)) {
      documentClientSelect.value = documentSelectedValue;
    }
  }
  if (templateClientSelect && selectedValue && visibleClients.some((client) => client.client_email === selectedValue)) {
    templateClientSelect.value = selectedValue;
  }
}

function templateDetailHref(template, clientEmail = "") {
  const detailUrl = String(template?.detail_url || "");
  if (!detailUrl) return "";

  const selectedEmail = String(clientEmail || "").trim().toLowerCase();
  if (!selectedEmail || !template.elder_only) return detailUrl;

  const separator = detailUrl.includes("?") ? "&" : "?";
  return `${detailUrl}${separator}client_email=${encodeURIComponent(selectedEmail)}`;
}

function renderCourseworkTemplateLibrary() {
  if (!courseworkTemplateLibrary) return;

  const libraryType = courseworkTemplateLibrary.dataset.courseworkTemplateLibrary || "assignment";
  const templateSets = {
    assignment: WIDOWS_ASSIGNMENT_TEMPLATES,
    assessment: WIDOWS_ASSESSMENT_TEMPLATES,
    reading: WIDOWS_READING_TEMPLATES,
    scripture: WIDOWS_SCRIPTURE_TEMPLATES,
  };
  const buttonLabels = {
    assignment: "Send to client",
    assessment: "Send assessment",
    reading: "Assign book",
    scripture: "Assign scripture",
  };
  const emptyMessages = {
    assignment: "No assignments have been added yet.",
    assessment: "No assessments have been added yet.",
    reading: "No required reading has been added yet.",
    scripture: "No scripture assignments have been added yet.",
  };
  const templateSet = templateSets[libraryType] || WIDOWS_ASSIGNMENT_TEMPLATES;
  const buttonText = buttonLabels[libraryType] || "Send to client";

  if (!templateSet.length) {
    courseworkTemplateLibrary.innerHTML = `<p>${emptyMessages[libraryType] || emptyMessages.assignment}</p>`;
    return;
  }

  courseworkTemplateLibrary.innerHTML = templateSet.map((template, index) => {
    const relatedItems = template.related_items || [];
    const scriptureSections = template.scripture_sections || [];
    const detailUrl = templateDetailHref(template);
    const detailCta = template.detail_cta || "View details";
    const cardButtonText = template.assign_cta || buttonText;
    const scriptureSectionMarkup = scriptureSections.length
      ? `
        <div class="course-template-subtabs" aria-label="${escapeHtml(template.title)} scripture sections">
          ${scriptureSections.map((section, sectionIndex) => `
            <details class="course-template-subtab" ${sectionIndex === 0 ? "open" : ""}>
              <summary>${escapeHtml(section.title)}</summary>
              <ul>
                ${section.scriptures.map((scripture) => `<li>${escapeHtml(scripture)}</li>`).join("")}
              </ul>
            </details>
          `).join("")}
        </div>
      `
      : "";
    const relatedMarkup = relatedItems.length
      ? `
        <div class="course-template-related">
          <strong>Connected worksheet</strong>
          ${relatedItems.map((item) => `
            <article>
              <h5>${escapeHtml(item.title)}</h5>
              <p>${textBlock(item.instructions)}</p>
            </article>
          `).join("")}
        </div>
      `
      : "";
    const detailLinkMarkup = detailUrl
      ? `
        <a class="button secondary course-template-detail-link" href="${escapeHtml(detailUrl)}" aria-label="Open full ${escapeHtml(template.title)} page">
          ${escapeHtml(detailCta)}
        </a>
      `
      : "";
    const cardInstructions = template.library_summary || template.instructions;

    return `
      <article class="course-template-card${relatedItems.length ? " course-template-card-expandable" : ""}${detailUrl ? " course-template-card-linked" : ""}"${detailUrl ? ` data-template-detail-url="${escapeHtml(detailUrl)}" tabindex="0"` : ""}>
        ${relatedItems.length ? `
          <details class="course-template-details">
            <summary>
              <span>${escapeHtml(courseworkTypeLabel(template.item_type))}</span>
              <h4>${escapeHtml(template.title)}</h4>
              <small>Click to view connected worksheet</small>
            </summary>
            <p>${escapeHtml(template.instructions)}</p>
            ${relatedMarkup}
          </details>
        ` : `
          <span>${escapeHtml(courseworkTypeLabel(template.item_type))}</span>
          <h4>${escapeHtml(template.title)}</h4>
          <p>${textBlock(cardInstructions)}</p>
          ${scriptureSectionMarkup}
          ${detailLinkMarkup}
        `}
        <button class="button primary" type="button" data-assign-template="${index}">${escapeHtml(cardButtonText)}</button>
      </article>
    `;
  }).join("");
}

async function loadTemplateAssignmentClients() {
  if (!templateClientSelect) return;

  try {
    const { clients } = await portalFetch("/api/portal/clients");
    cachedPortalClients = clients;
    renderTemplateClientOptions(clients);
  } catch (error) {
    showTemplateAssignmentMessage(error.message);
  }
}

if (courseworkTemplateLibrary) {
  renderCourseworkTemplateLibrary();
}

if (courseworkTemplateLibrary || courseModuleClientSelect || documentClientSelect) {
  loadTemplateAssignmentClients();
}

courseworkTemplateLibrary?.addEventListener("click", async (event) => {
  const detailCard = event.target.closest("[data-template-detail-url]");
  if (detailCard && !event.target.closest("a, button")) {
    window.location.href = detailCard.dataset.templateDetailUrl;
    return;
  }

  const assignButton = event.target.closest("[data-assign-template]");
  if (!assignButton) return;

  const selectedEmail = String(templateClientSelect?.value || "").trim().toLowerCase();
  const selectedClient = cachedPortalClients.find((client) => client.client_email === selectedEmail);
  const libraryType = courseworkTemplateLibrary.dataset.courseworkTemplateLibrary || "assignment";
  const templateSets = {
    assignment: WIDOWS_ASSIGNMENT_TEMPLATES,
    assessment: WIDOWS_ASSESSMENT_TEMPLATES,
    reading: WIDOWS_READING_TEMPLATES,
    scripture: WIDOWS_SCRIPTURE_TEMPLATES,
  };
  const templateSet = templateSets[libraryType] || WIDOWS_ASSIGNMENT_TEMPLATES;
  const template = templateSet[Number(assignButton.dataset.assignTemplate)];
  const actionLabels = {
    assignment: "sending an assignment",
    assessment: "sending an assessment",
    reading: "assigning a book",
    scripture: "assigning scripture",
  };
  const progressLabels = {
    assignment: "Sending assignment",
    assessment: "Sending assessment",
    reading: "Assigning book",
    scripture: "Assigning scripture",
  };
  const buttonLabels = {
    assignment: "Send to client",
    assessment: "Send assessment",
    reading: "Assign book",
    scripture: "Assign scripture",
  };
  const recipientLabel = String(templateClientSelect?.dataset.templateClientProgram || "").toLowerCase() === "widows" ? "widow" : "client";

  if (template?.elder_only) {
    window.location.href = templateDetailHref(template, selectedEmail);
    return;
  }

  if (!selectedClient) {
    showTemplateAssignmentMessage(`Choose a ${recipientLabel} before ${actionLabels[libraryType] || actionLabels.assignment}.`);
    return;
  }

  assignButton.disabled = true;
  assignButton.textContent = "Sending...";
  showTemplateAssignmentMessage(`${progressLabels[libraryType] || progressLabels.assignment} to ${recipientLabel}...`, false);

  try {
    await portalFetch("/api/portal/client-coursework", {
      method: "POST",
      body: JSON.stringify({
        client_email: selectedClient.client_email,
        client_name: selectedClient.client_name,
        item_type: template.item_type,
        title: template.title,
        instructions: template.instructions,
        due_date: "",
      }),
    });

    for (const relatedItem of template.related_items || []) {
      await portalFetch("/api/portal/client-coursework", {
        method: "POST",
        body: JSON.stringify({
          client_email: selectedClient.client_email,
          client_name: selectedClient.client_name,
          item_type: relatedItem.item_type,
          title: relatedItem.title,
          instructions: relatedItem.instructions,
          due_date: "",
        }),
      });
    }

    const relatedCount = template.related_items?.length || 0;
    showTemplateAssignmentMessage(
      relatedCount
        ? `${template.title} and connected worksheet sent to ${selectedClient.client_name}.`
        : `${template.title} sent to ${selectedClient.client_name}.`,
      false,
    );
  } catch (error) {
    showTemplateAssignmentMessage(error.message);
  } finally {
    assignButton.disabled = false;
    assignButton.textContent = buttonLabels[libraryType] || buttonLabels.assignment;
  }
});

courseworkTemplateLibrary?.addEventListener("keydown", (event) => {
  const detailCard = event.target.closest("[data-template-detail-url]");
  if (!detailCard || (event.key !== "Enter" && event.key !== " ")) return;

  event.preventDefault();
  window.location.href = detailCard.dataset.templateDetailUrl;
});

function renderDailyTaskReports(reports) {
  if (!dailyTaskReportList) return;

  if (!reports.length) {
    dailyTaskReportList.innerHTML = "<p>No daily task reports have been submitted yet.</p>";
    return;
  }

  dailyTaskReportList.innerHTML = reports.map((report) => `
    <article class="portal-client-item portal-report-item">
      <div>
        <strong>${escapeHtml(report.client_name)}</strong>
        <span>${escapeHtml(report.report_date)}</span>
        <small>${escapeHtml(report.client_email)}</small>
      </div>
      <div class="portal-report-body">
        ${report.completed_tasks ? `<p><b>Completed:</b> ${textBlock(report.completed_tasks)}</p>` : ""}
        ${report.progress_notes ? `<p><b>Progress:</b> ${textBlock(report.progress_notes)}</p>` : ""}
        ${report.blockers ? `<p><b>Blockers:</b> ${textBlock(report.blockers)}</p>` : ""}
        ${report.next_steps ? `<p><b>Next:</b> ${textBlock(report.next_steps)}</p>` : ""}
      </div>
    </article>
  `).join("");
}

async function loadDailyTaskReports() {
  if (!dailyTaskReportList) return;

  try {
    const { reports } = await portalFetch("/api/portal/daily-task-reports");
    renderDailyTaskReports(reports);
  } catch (error) {
    dailyTaskReportList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (dailyTaskReportList) {
  loadDailyTaskReports();
}

function renderClientReflections(reflections) {
  if (!clientReflectionList) return;

  const reflectionFilter = String(clientReflectionList.dataset.clientReflectionList || "").trim().toLowerCase();
  const visibleReflections = reflectionFilter
    ? reflections.filter((reflection) => reflection.reflection_type === reflectionFilter)
    : reflections;
  const emptyMessage = reflectionFilter === "journal"
    ? "No journal entries have been submitted yet."
    : reflectionFilter === "dream"
      ? "No dreams have been submitted yet."
      : "No journals or dreams have been submitted yet.";

  if (!visibleReflections.length) {
    clientReflectionList.innerHTML = `<p>${emptyMessage}</p>`;
    return;
  }

  if (reflectionFilter === "journal" || reflectionFilter === "dream") {
    clientReflectionList.innerHTML = visibleReflections.map((reflection) => `
      <details class="portal-client-item portal-report-item portal-clickable-entry">
        <summary>
          <div>
            <strong>${escapeHtml(reflection.title || `${reflectionTypeLabel(reflection.reflection_type)} Entry`)}</strong>
            <span>${escapeHtml(reflection.client_name)} - ${escapeHtml(reflection.reflection_date)}</span>
            <small>${escapeHtml(reflection.client_email)}</small>
          </div>
        </summary>
        <div class="portal-report-body">
          ${reflection.reflection_type === "dream" ? "<p><b>Elder Review:</b> Review for prophetic discernment.</p>" : ""}
          <p>${textBlock(reflection.body)}</p>
          ${reflection.elder_notes ? `
            <div class="portal-feedback-note">
              <strong>Elder Feedback</strong>
              <p>${textBlock(reflection.elder_notes)}</p>
            </div>
          ` : ""}
          <form class="portal-feedback-form" data-reflection-feedback-form data-reflection-id="${escapeHtml(reflection.id)}">
            <label>
              Elder Feedback
              <textarea name="elder_notes" rows="3" placeholder="Add feedback that will appear on the member dashboard.">${escapeHtml(reflection.elder_notes || "")}</textarea>
            </label>
            <button class="button primary" type="submit">Save feedback</button>
          </form>
          <button class="portal-delete-button portal-entry-delete-button" type="button" data-delete-reflection="${escapeHtml(reflection.id)}">Delete</button>
        </div>
      </details>
    `).join("");
    return;
  }

  clientReflectionList.innerHTML = visibleReflections.map((reflection) => `
    <article class="portal-client-item portal-report-item">
      <div>
        <strong>${escapeHtml(reflection.client_name)}</strong>
        <span>${escapeHtml(reflectionTypeLabel(reflection.reflection_type))} - ${escapeHtml(reflection.reflection_date)}</span>
        <small>${escapeHtml(reflection.client_email)}</small>
      </div>
      <div class="portal-report-body">
        ${reflection.title ? `<p><b>Title:</b> ${escapeHtml(reflection.title)}</p>` : ""}
        <p><b>${escapeHtml(reflectionTypeLabel(reflection.reflection_type))} Entry:</b> ${textBlock(reflection.body)}</p>
        ${reflection.reflection_type === "dream" ? "<p><b>Elder Review:</b> Review for prophetic discernment.</p>" : ""}
        ${reflection.elder_notes ? `
          <div class="portal-feedback-note">
            <strong>Elder Feedback</strong>
            <p>${textBlock(reflection.elder_notes)}</p>
          </div>
        ` : ""}
      </div>
    </article>
  `).join("");
}

async function loadClientReflections() {
  if (!clientReflectionList) return;

  try {
    const { reflections } = await portalFetch("/api/portal/client-reflections");
    renderClientReflections(reflections);
  } catch (error) {
    clientReflectionList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (clientReflectionList) {
  loadClientReflections();
}

clientReflectionList?.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete-reflection]");
  if (!deleteButton) return;

  event.preventDefault();
  if (!window.confirm("Delete this entry?")) {
    return;
  }

  deleteButton.disabled = true;
  deleteButton.textContent = "Deleting...";

  try {
    await portalFetch("/api/portal/client-reflections", {
      method: "DELETE",
      body: JSON.stringify({ id: Number(deleteButton.dataset.deleteReflection) }),
    });
    await loadClientReflections();
  } catch (error) {
    window.alert(error.message);
    deleteButton.disabled = false;
    deleteButton.textContent = "Delete";
  }
});

clientReflectionList?.addEventListener("submit", async (event) => {
  const feedbackForm = event.target.closest("[data-reflection-feedback-form]");
  if (!feedbackForm) return;

  event.preventDefault();
  const submitButton = feedbackForm.querySelector("button[type='submit']");
  const formData = new FormData(feedbackForm);
  const reflectionId = Number(feedbackForm.dataset.reflectionId || 0);

  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  try {
    await portalFetch("/api/portal/client-reflections", {
      method: "PATCH",
      body: JSON.stringify({
        id: reflectionId,
        elder_notes: String(formData.get("elder_notes") || ""),
      }),
    });
    await loadClientReflections();
  } catch (error) {
    window.alert(error.message);
    submitButton.disabled = false;
    submitButton.textContent = "Save feedback";
  }
});

function renderWidowsClientCourseworkLinks(clients) {
  if (!widowsClientCourseworkList) return;
  const widowsClients = clients.filter((client) => client.account_type === "Widows");

  if (!widowsClients.length) {
    widowsClientCourseworkList.innerHTML = "<p>No Widows clients have been assigned yet.</p>";
    return;
  }

  widowsClientCourseworkList.innerHTML = widowsClients.map((client) => {
    const href = `client-coursework.html?client_email=${encodeURIComponent(client.client_email)}`;
    return `
      <a class="portal-client-item portal-client-link" href="${href}">
        <div>
          <strong>${escapeHtml(client.client_name)}</strong>
          <span>${escapeHtml(client.portal_title)}</span>
          <small>${escapeHtml(client.client_email)}</small>
        </div>
      </a>
    `;
  }).join("");
}

async function loadWidowsClientCourseworkLinks() {
  if (!widowsClientCourseworkList) return;

  try {
    const { clients } = await portalFetch("/api/portal/clients");
    renderWidowsClientCourseworkLinks(clients);
  } catch (error) {
    widowsClientCourseworkList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (widowsClientCourseworkList) {
  loadWidowsClientCourseworkLinks();
}

function renderCourseworkDocumentLinks(item) {
  const documents = Array.isArray(item.documents) ? item.documents : [];
  if (!documents.length) return "";

  return `
    <div class="portal-coursework-documents">
      <strong>Module Documents</strong>
      <div class="portal-coursework-document-links">
        ${documents.map((document) => `
          <a class="button secondary" href="${escapeHtml(document.file_url)}" target="_blank" rel="noopener">
            ${escapeHtml(document.title || document.file_name || "Download document")}
          </a>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCourseworkItems(container, items, options = {}) {
  if (!container) return;

  container.classList.toggle("portal-dashboard-coursework-grid", Boolean(options.allowCompletion));

  if (!items.length) {
    container.innerHTML = "<p>No coursework has been assigned yet.</p>";
    return;
  }

  if (options.allowCompletion) {
    container.innerHTML = items.map((item) => {
      const moduleLabel = Number(item.module_index) >= 0 ? `Module ${Number(item.module_index) + 1} - ` : "";
      const detailUrl = courseworkDetailUrlForTitle(item.title);
      const detailLinkMarkup = detailUrl
        ? `<a class="button secondary portal-coursework-detail-link" href="${escapeHtml(detailUrl)}" onclick="event.stopPropagation()">Open assessment</a>`
        : "";
      return `
      <details class="portal-client-item portal-report-item portal-coursework-row${item.status === "completed" ? " portal-coursework-complete" : ""}" data-coursework-item-id="${escapeHtml(item.id)}">
        <summary>
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(moduleLabel)}${escapeHtml(courseworkTypeLabel(item.item_type))}${item.due_date ? ` - Due ${escapeHtml(item.due_date)}` : ""}</span>
          </div>
          <label class="portal-coursework-check" onclick="event.stopPropagation()">
            <span>Complete</span>
            <input type="checkbox" data-coursework-complete ${item.status === "completed" ? "checked" : ""} ${activePortalPreviewMode() ? "disabled" : ""}>
          </label>
        </summary>
        <div class="portal-report-body portal-coursework-row-body">
          ${detailLinkMarkup}
          ${item.instructions ? `<p>${textBlock(item.instructions)}</p>` : "<p>No instructions added yet.</p>"}
          ${renderCourseworkDocumentLinks(item)}
          ${item.elder_feedback ? `
            <div class="portal-feedback-note">
              <strong>Elder Feedback</strong>
              <p>${textBlock(item.elder_feedback)}</p>
            </div>
          ` : ""}
        </div>
      </details>
    `;
    }).join("");
    return;
  }

  const checklistClass = options.allowCompletion ? " portal-coursework-checklist" : "";
  container.innerHTML = items.map((item) => {
    const moduleLabel = Number(item.module_index) >= 0 ? `Module ${Number(item.module_index) + 1} - ` : "";
    const detailUrl = courseworkDetailUrlForTitle(item.title);
    const detailLinkMarkup = detailUrl
      ? `<a class="button secondary portal-coursework-detail-link" href="${escapeHtml(detailUrl)}">Open assessment</a>`
      : "";
    return `
    <article class="portal-client-item portal-report-item${item.status === "completed" ? " portal-coursework-complete" : ""}${checklistClass}" data-coursework-item-id="${escapeHtml(item.id)}">
      <div>
        ${options.allowCompletion ? `
          <label class="portal-coursework-check">
            <input type="checkbox" data-coursework-complete ${item.status === "completed" ? "checked" : ""} ${activePortalPreviewMode() ? "disabled" : ""}>
            <span>Complete</span>
          </label>
        ` : ""}
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(moduleLabel)}${escapeHtml(courseworkTypeLabel(item.item_type))}${item.due_date ? ` - Due ${escapeHtml(item.due_date)}` : ""}</span>
        <small>${escapeHtml(item.status || "assigned")}</small>
      </div>
      <div class="portal-report-body">
        ${detailLinkMarkup}
        ${item.instructions ? `<p>${textBlock(item.instructions)}</p>` : "<p>No instructions added yet.</p>"}
        ${renderCourseworkDocumentLinks(item)}
        ${item.elder_feedback ? `
          <div class="portal-feedback-note">
            <strong>Elder Feedback</strong>
            <p>${textBlock(item.elder_feedback)}</p>
          </div>
        ` : ""}
      </div>
      ${options.allowFeedback ? `
        <form class="portal-feedback-form" data-coursework-feedback-form>
          <label>
            Elder Feedback
            <textarea name="elder_feedback" rows="3" placeholder="Add feedback that will appear on the widow's dashboard.">${escapeHtml(item.elder_feedback || "")}</textarea>
          </label>
          <button class="button primary" type="submit">Save feedback</button>
        </form>
      ` : ""}
      ${options.allowDelete ? `<button class="portal-delete-button" type="button" data-delete-coursework-item="${escapeHtml(item.id)}">Delete</button>` : ""}
    </article>
  `;
  }).join("");
}

function renderDocumentList(container, documents, options = {}) {
  if (!container) return;

  if (!documents.length) {
    container.innerHTML = "<p>No documents have been uploaded yet.</p>";
    return;
  }

  container.innerHTML = documents.map((document) => {
    const isClientDocument = document.document_scope === "client";
    const scopeLabel = isClientDocument
      ? `Client document${document.client_name ? ` - ${document.client_name}` : ""}`
      : "Course library";
    const meta = [
      document.file_name,
      formatFileSize(document.file_size),
      document.created_at ? `Uploaded ${formatPortalDate(document.created_at)}` : "",
    ].filter(Boolean).join(" - ");

    return `
      <article class="portal-workspace-card portal-document-card" data-portal-document-id="${escapeHtml(document.id)}">
        <span>${escapeHtml(scopeLabel)}</span>
        <strong>${escapeHtml(document.title)}</strong>
        ${document.description ? `<p>${textBlock(document.description)}</p>` : ""}
        ${meta ? `<small>${escapeHtml(meta)}</small>` : ""}
        <div class="portal-document-actions">
          <a class="button secondary" href="${escapeHtml(document.file_url)}" target="_blank" rel="noopener">Download</a>
          ${options.allowDelete ? `<button class="portal-delete-button" type="button" data-delete-portal-document="${escapeHtml(document.id)}">Delete</button>` : ""}
        </div>
      </article>
    `;
  }).join("");
}

async function loadPortalDocuments(targetClientEmail = "") {
  const containers = [
    [portalDocumentList, { allowDelete: true }],
    [clientDocumentList, { allowDelete: true }],
    [myDocumentsList, { allowDelete: false }],
  ].filter(([container]) => container);
  if (!containers.length) return;

  const query = targetClientEmail ? `?client_email=${encodeURIComponent(targetClientEmail)}` : "";
  try {
    const { documents } = await portalFetch(`/api/portal/documents${query}`);
    for (const [container, options] of containers) {
      renderDocumentList(container, documents || [], options);
    }
  } catch (error) {
    for (const [container] of containers) {
      container.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
    }
  }
}

function syncDocumentScopeFields() {
  if (!documentScopeSelect || !documentClientField) return;
  documentClientField.hidden = documentScopeSelect.value !== "client";
}

documentScopeSelect?.addEventListener("change", syncDocumentScopeFields);
syncDocumentScopeFields();

documentClientSelect?.addEventListener("change", () => {
  if (!portalDocumentForm) return;
  const selectedClient = cachedPortalClients.find((client) => client.client_email === documentClientSelect.value);
  if (portalDocumentForm.elements.client_name) {
    portalDocumentForm.elements.client_name.value = selectedClient?.client_name || "";
  }
});

portalDocumentForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = portalDocumentForm.querySelector("button[type='submit']");
  const formData = new FormData(portalDocumentForm);
  const scope = String(formData.get("document_scope") || "library");

  if (scope === "client" && documentClientSelect) {
    const selectedClient = cachedPortalClients.find((client) => client.client_email === String(formData.get("client_email") || "").toLowerCase());
    if (!selectedClient) {
      showPortalDocumentMessage("Choose a client for this document.");
      return;
    }
    formData.set("client_name", selectedClient.client_name);
  }

  submitButton.disabled = true;
  showPortalDocumentMessage("Uploading document...", false);

  try {
    await portalFetch("/api/portal/documents", {
      method: "POST",
      body: formData,
    });
    showPortalDocumentMessage("Document uploaded.", false);
    const clientEmail = String(formData.get("client_email") || "").trim().toLowerCase();
    const clientName = String(formData.get("client_name") || "").trim();
    portalDocumentForm.reset();
    if (portalDocumentForm.dataset.clientDocumentContext !== undefined) {
      portalDocumentForm.elements.document_scope.value = "client";
      portalDocumentForm.elements.client_email.value = clientEmail;
      portalDocumentForm.elements.client_name.value = clientName;
    }
    syncDocumentScopeFields();
    await loadPortalDocuments(clientDocumentList ? clientEmail : "");
  } catch (error) {
    showPortalDocumentMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

document.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete-portal-document]");
  if (!deleteButton) return;

  if (!window.confirm("Delete this document?")) {
    return;
  }

  deleteButton.disabled = true;
  deleteButton.textContent = "Deleting...";

  try {
    await portalFetch("/api/portal/documents", {
      method: "DELETE",
      body: JSON.stringify({ id: Number(deleteButton.dataset.deletePortalDocument) }),
    });
    const clientEmail = clientCourseworkForm?.elements.client_email?.value || "";
    await loadPortalDocuments(clientDocumentList ? clientEmail : "");
  } catch (error) {
    window.alert(error.message);
    deleteButton.disabled = false;
    deleteButton.textContent = "Delete";
  }
});

if (portalDocumentList || myDocumentsList) {
  loadPortalDocuments();
}

function renderReportList(container, reports) {
  if (!container) return;

  if (!reports.length) {
    container.innerHTML = "<p>No daily task reports have been submitted yet.</p>";
    return;
  }

  container.innerHTML = reports.map((report) => `
    <article class="portal-client-item portal-report-item">
      <div>
        <strong>${escapeHtml(report.report_date)}</strong>
        <span>Daily Task Report</span>
        <small>${escapeHtml(report.client_email)}</small>
      </div>
      <div class="portal-report-body">
        ${report.completed_tasks ? `<p><b>Completed:</b> ${textBlock(report.completed_tasks)}</p>` : ""}
        ${report.progress_notes ? `<p><b>Progress:</b> ${textBlock(report.progress_notes)}</p>` : ""}
        ${report.blockers ? `<p><b>Blockers:</b> ${textBlock(report.blockers)}</p>` : ""}
        ${report.next_steps ? `<p><b>Next:</b> ${textBlock(report.next_steps)}</p>` : ""}
      </div>
    </article>
  `).join("");
}

function renderReflectionList(container, reflections) {
  if (!container) return;

  if (!reflections.length) {
    container.innerHTML = "<p>No journals or dreams have been submitted yet.</p>";
    return;
  }

  container.innerHTML = reflections.map((reflection) => `
    <article class="portal-client-item portal-report-item">
      <div>
        <strong>${escapeHtml(reflection.title || reflectionTypeLabel(reflection.reflection_type))}</strong>
        <span>${escapeHtml(reflectionTypeLabel(reflection.reflection_type))} - ${escapeHtml(reflection.reflection_date)}</span>
        <small>${escapeHtml(reflection.client_email)}</small>
      </div>
      <div class="portal-report-body">
        <p>${textBlock(reflection.body)}</p>
        ${reflection.reflection_type === "dream" ? "<p><b>Elder Review:</b> Review for prophetic discernment.</p>" : ""}
        ${reflection.elder_notes ? `
          <div class="portal-feedback-note">
            <strong>Elder Feedback</strong>
            <p>${textBlock(reflection.elder_notes)}</p>
          </div>
        ` : ""}
      </div>
    </article>
  `).join("");
}

function renderMyReflectionList(reflections) {
  if (!myReflectionList) return;

  if (!reflections.length) {
    myReflectionList.innerHTML = "<p>No journals or dreams have been submitted yet.</p>";
    return;
  }

  myReflectionList.innerHTML = reflections.map((reflection) => `
    <details class="portal-client-item portal-report-item portal-clickable-entry">
      <summary>
        <div>
          <strong>${escapeHtml(reflection.title || reflectionTypeLabel(reflection.reflection_type))}</strong>
          <span>${escapeHtml(reflectionTypeLabel(reflection.reflection_type))} - ${escapeHtml(reflection.reflection_date)}</span>
          <small>${reflection.elder_notes ? "Elder feedback added" : "Awaiting elder feedback"}</small>
        </div>
      </summary>
      <div class="portal-report-body">
        <p>${textBlock(reflection.body)}</p>
        ${reflection.elder_notes ? `
          <div class="portal-feedback-note">
            <strong>Elder Feedback</strong>
            <p>${textBlock(reflection.elder_notes)}</p>
          </div>
        ` : "<p><b>Elder Feedback:</b> No feedback has been added yet.</p>"}
      </div>
    </details>
  `).join("");
}

async function loadMyReflections() {
  if (!myReflectionList) return;

  try {
    const { reflections } = await portalFetch("/api/portal/client-reflections");
    renderMyReflectionList(reflections || []);
  } catch (error) {
    myReflectionList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (myReflectionList) {
  loadMyReflections();
}

function renderClientModulePlan(path, progress, items) {
  if (!clientModulePlan) return;

  const modules = path?.modules || [];
  if (!modules.length) {
    clientModulePlan.innerHTML = "<p>No course modules have been configured for this client path yet.</p>";
    return;
  }

  const progressByModule = new Map((progress || []).map((entry) => [Number(entry.module_index), entry]));
  clientModulePlan.innerHTML = modules.map((module, index) => {
    const saved = progressByModule.get(index) || {};
    const status = saved.status || "not_started";
    const assignedCount = (items || []).filter((item) => Number(item.module_index) === index).length;
    const activityLabel = assignedCount === 1 ? "activity" : "activities";

    return `
      <form class="portal-client-module-row" data-client-module-progress-form data-module-index="${index}">
        <header>
          <div>
            <small>Module ${index + 1}</small>
            <h4>${escapeHtml(module.title || `Module ${index + 1}`)}</h4>
          </div>
          <span class="portal-module-status" data-state="${escapeHtml(status)}">${escapeHtml(moduleStatusLabel(status))}</span>
        </header>
        <p>${escapeHtml(module.objective || "Set the learning focus for this module in the course builder.")}</p>
        <small>${assignedCount ? `${assignedCount} assigned ${activityLabel} for this client` : "No assignment sent for this module"}</small>
        <div class="portal-module-review-fields">
          <label>
            Status
            <select name="module_status">
              ${["not_started", "in_progress", "awaiting_review", "complete", "not_required"].map((option) => `
                <option value="${option}" ${option === status ? "selected" : ""}>${escapeHtml(moduleStatusLabel(option))}</option>
              `).join("")}
            </select>
          </label>
          <label>
            Elder Notes
            <textarea name="elder_notes" rows="2" placeholder="Document why this module is needed, adapted, or not required.">${escapeHtml(saved.elder_notes || "")}</textarea>
          </label>
        </div>
        <div class="portal-module-review-actions">
          <button class="button secondary" type="button" data-prepare-module-assignment="${index}">Prepare Assignment</button>
          <button class="button primary" type="submit">Save Progress</button>
        </div>
      </form>
    `;
  }).join("");
}

async function loadClientCourseworkBundle() {
  if (!clientCourseworkForm) return;

  const params = new URLSearchParams(window.location.search);
  const clientEmail = String(params.get("client_email") || "").trim().toLowerCase();

  if (!clientEmail) {
    showClientCourseworkMessage("Choose a client from the Widows Coursework page.");
    return;
  }

  try {
    const bundle = await portalFetch(`/api/portal/client-coursework?client_email=${encodeURIComponent(clientEmail)}`);
    if (!bundle.client) {
      showClientCourseworkMessage("Client assignment was not found.");
      return;
    }

    clientCourseworkForm.elements.client_email.value = bundle.client.client_email;
    clientCourseworkForm.elements.client_name.value = bundle.client.client_name;
    if (portalDocumentForm?.dataset.clientDocumentContext !== undefined) {
      portalDocumentForm.elements.client_email.value = bundle.client.client_email;
      portalDocumentForm.elements.client_name.value = bundle.client.client_name;
    }
    cachedClientModulePath = bundle.path;
    if (clientCourseworkTitle) {
      clientCourseworkTitle.textContent = `${bundle.client.client_name} Coursework`;
    }
    renderClientModulePlan(bundle.path, bundle.module_progress, bundle.items);
    renderCourseworkItems(clientCourseworkItems, bundle.items, { allowDelete: true, allowFeedback: true });
    renderReportList(clientCourseworkReports, bundle.reports);
    renderReflectionList(clientCourseworkReflections, bundle.reflections);
    await loadPortalDocuments(bundle.client.client_email);
  } catch (error) {
    showClientCourseworkMessage(error.message);
  }
}

clientCourseworkForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = clientCourseworkForm.querySelector("button[type='submit']");
  const formData = new FormData(clientCourseworkForm);

  submitButton.disabled = true;
  showClientCourseworkMessage("Assigning coursework...", false);

  try {
    await portalFetch("/api/portal/client-coursework", {
      method: "POST",
      body: JSON.stringify({
        client_email: String(formData.get("client_email") || ""),
        client_name: String(formData.get("client_name") || ""),
        module_index: Number(formData.get("module_index") || -1),
        item_type: String(formData.get("item_type") || ""),
        title: String(formData.get("title") || ""),
        instructions: String(formData.get("instructions") || ""),
        due_date: String(formData.get("due_date") || ""),
      }),
    });
    showClientCourseworkMessage("Coursework assigned to client.", false);
    const clientEmail = clientCourseworkForm.elements.client_email.value;
    const clientName = clientCourseworkForm.elements.client_name.value;
    clientCourseworkForm.reset();
    clientCourseworkForm.elements.client_email.value = clientEmail;
    clientCourseworkForm.elements.client_name.value = clientName;
    clientCourseworkForm.elements.module_index.value = "-1";
    await loadClientCourseworkBundle();
  } catch (error) {
    showClientCourseworkMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

clientCourseworkItems?.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete-coursework-item]");
  if (!deleteButton) return;

  if (!window.confirm("Delete this assigned coursework item?")) {
    return;
  }

  deleteButton.disabled = true;
  deleteButton.textContent = "Deleting...";

  try {
    await portalFetch("/api/portal/client-coursework", {
      method: "DELETE",
      body: JSON.stringify({ id: Number(deleteButton.dataset.deleteCourseworkItem) }),
    });
    await loadClientCourseworkBundle();
  } catch (error) {
    window.alert(error.message);
    deleteButton.disabled = false;
    deleteButton.textContent = "Delete";
  }
});

clientCourseworkItems?.addEventListener("submit", async (event) => {
  const feedbackForm = event.target.closest("[data-coursework-feedback-form]");
  if (!feedbackForm) return;

  event.preventDefault();
  const itemCard = feedbackForm.closest("[data-coursework-item-id]");
  const submitButton = feedbackForm.querySelector("button[type='submit']");
  const itemId = Number(itemCard?.dataset.courseworkItemId || 0);
  const formData = new FormData(feedbackForm);

  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  try {
    await portalFetch("/api/portal/client-coursework", {
      method: "PATCH",
      body: JSON.stringify({
        id: itemId,
        elder_feedback: String(formData.get("elder_feedback") || ""),
      }),
    });
    showClientCourseworkMessage("Feedback saved to the widow dashboard.", false);
    await loadClientCourseworkBundle();
  } catch (error) {
    showClientCourseworkMessage(error.message);
    submitButton.disabled = false;
    submitButton.textContent = "Save feedback";
  }
});

clientModulePlan?.addEventListener("click", (event) => {
  const prepareButton = event.target.closest("[data-prepare-module-assignment]");
  if (!prepareButton || !clientCourseworkForm) return;

  const moduleIndex = Number(prepareButton.dataset.prepareModuleAssignment);
  const module = cachedClientModulePath?.modules?.[moduleIndex];
  if (!module) return;

  clientCourseworkForm.elements.module_index.value = String(moduleIndex);
  clientCourseworkForm.elements.item_type.value = "assignment";
  clientCourseworkForm.elements.title.value = `Module ${moduleIndex + 1}: ${module.title || "Assignment"}`;
  clientCourseworkForm.elements.instructions.value = module.assignment || module.lesson_summary || "";
  showClientCourseworkMessage(
    `Module ${moduleIndex + 1} prepared. Review and assign it only if it fits this client's needs.`,
    false,
  );
  clientCourseworkForm.scrollIntoView({ behavior: "smooth", block: "start" });
});

clientModulePlan?.addEventListener("submit", async (event) => {
  const progressForm = event.target.closest("[data-client-module-progress-form]");
  if (!progressForm || !clientCourseworkForm) return;

  event.preventDefault();
  const submitButton = progressForm.querySelector("button[type='submit']");
  const formData = new FormData(progressForm);
  submitButton.disabled = true;

  try {
    await portalFetch("/api/portal/client-coursework", {
      method: "PATCH",
      body: JSON.stringify({
        module_progress: true,
        client_email: clientCourseworkForm.elements.client_email.value,
        module_index: Number(progressForm.dataset.moduleIndex),
        module_status: String(formData.get("module_status") || "not_started"),
        elder_notes: String(formData.get("elder_notes") || ""),
      }),
    });
    showClientModuleProgressMessage("Module progress saved.", false);
    await loadClientCourseworkBundle();
  } catch (error) {
    showClientModuleProgressMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

if (clientCourseworkForm) {
  loadClientCourseworkBundle();
}

async function loadMyCoursework() {
  if (!myCourseworkList) return;

  try {
    const { items } = await portalFetch("/api/portal/client-coursework");
    cachedStudentCourseworkItems = items || [];
    renderCourseworkItems(myCourseworkList, items, { allowCompletion: true });
    renderStudentCourseProgress();
  } catch (error) {
    myCourseworkList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
    if (courseProgressSummary) courseProgressSummary.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

function renderStudentCourseProgress() {
  if (!courseProgressSummary && !courseNextAssignment) return;

  const items = cachedStudentCourseworkItems;
  const completed = items.filter((item) => item.status === "completed").length;
  const total = items.length;
  const modules = cachedStudentAssignment?.modules || [];
  const moduleProgress = cachedStudentAssignment?.module_progress || [];
  const completedModules = moduleProgress.filter((entry) => ["complete", "not_required"].includes(entry.status)).length;
  const moduleTotal = modules.length;
  const percent = moduleTotal
    ? Math.round((completedModules / moduleTotal) * 100)
    : total ? Math.round((completed / total) * 100) : 0;
  const remaining = items
    .filter((item) => item.status !== "completed")
    .sort((a, b) => {
      if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date);
      if (a.due_date) return -1;
      if (b.due_date) return 1;
      return String(a.created_at || "").localeCompare(String(b.created_at || ""));
    });

  if (courseProgressSummary) {
    courseProgressSummary.innerHTML = `
      <strong class="portal-progress-total">${moduleTotal ? `${completedModules} of ${moduleTotal}` : `${completed} of ${total}`}</strong>
      <span>${moduleTotal ? "course modules addressed" : "assigned tasks complete"}</span>
      <div class="portal-progress-meter" aria-label="${percent}% complete">
        <span style="width: ${percent}%"></span>
      </div>
      <small>${moduleTotal ? `${completed} of ${total} assigned activities complete` : `${percent}% completed`}</small>
    `;
  }

  if (!courseNextAssignment) return;
  if (!total) {
    courseNextAssignment.innerHTML = "<strong>Next Assignment</strong><p>Your first assignment will appear here when it is assigned.</p>";
    return;
  }
  if (!remaining.length) {
    courseNextAssignment.innerHTML = "<strong>Next Assignment</strong><p>All currently assigned work is complete.</p>";
    return;
  }

  const next = remaining[0];
  courseNextAssignment.innerHTML = `
    <strong>Next Assignment</strong>
    <p>${escapeHtml(next.title)}</p>
    <small>${next.due_date ? `Due ${escapeHtml(next.due_date)}` : "No due date assigned"}</small>
  `;
}

function setCourseHomeLocked(locked) {
  const courseSections = document.querySelectorAll([
    ".portal-course-home-nav",
    ".portal-course-status",
    "#modules",
    "#assignments",
    "#documents",
    "#submissions",
    ".portal-dashboard-reflection-panel",
  ].join(", "));

  for (const section of courseSections) {
    section.hidden = locked;
  }

  if (locked && portalReadingList) {
    portalReadingList.hidden = true;
  }
}

if (myCourseworkList) {
  loadMyCoursework();
}

myCourseworkList?.addEventListener("change", async (event) => {
  const checkbox = event.target.closest("[data-coursework-complete]");
  if (!checkbox) return;

  if (activePortalPreviewMode()) {
    checkbox.checked = !checkbox.checked;
    window.alert("Preview mode is read-only.");
    return;
  }

  const itemCard = checkbox.closest("[data-coursework-item-id]");
  const itemId = Number(itemCard?.dataset.courseworkItemId || 0);
  const status = checkbox.checked ? "completed" : "assigned";
  checkbox.disabled = true;

  try {
    await portalFetch("/api/portal/client-coursework", {
      method: "PATCH",
      body: JSON.stringify({ id: itemId, status }),
    });
    await loadMyCoursework();
  } catch (error) {
    window.alert(error.message);
    checkbox.checked = !checkbox.checked;
    checkbox.disabled = false;
  }
});

clientPortalList?.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete-client]");
  if (!deleteButton) return;

  const clientEmail = deleteButton.dataset.deleteClient;
  const clientItem = deleteButton.closest("[data-client-email]");
  const clientName = clientItem?.querySelector("strong")?.textContent || clientEmail;

  if (!window.confirm(`Delete the client assignment for ${clientName}?`)) {
    return;
  }

  deleteButton.disabled = true;
  deleteButton.textContent = "Deleting...";

  try {
    await portalFetch("/api/portal/clients", {
      method: "DELETE",
      body: JSON.stringify({ client_email: clientEmail }),
    });
    await loadClientPortals();
  } catch (error) {
    deleteButton.disabled = false;
    deleteButton.textContent = "Delete";
    window.alert(error.message);
  }
});

async function loadAccountPath() {
  if (!accountPathForm) return;

  try {
    const [{ path }, documentsResponse] = await Promise.all([
      portalFetch("/api/portal/account-paths?account_type=Widows"),
      portalFetch("/api/portal/documents"),
    ]);
    cachedCourseModuleDocuments = (documentsResponse.documents || [])
      .filter((document) => document.document_scope === "library");
    if (!path) return;

    for (const field of ["course_code", "course_status", "path_title", "overview", "learning_objectives", "completion_requirements", "progress_tracking", "book_list", "first_lesson", "first_assignment"]) {
      if (accountPathForm.elements[field]) {
        accountPathForm.elements[field].value = path[field] || "";
      }
    }
    renderCourseModuleEditors(path.modules || []);
  } catch (error) {
    showAccountPathMessage(error.message);
  }
}

function moduleDocumentIdsFromEditor(editor) {
  const select = editor.querySelector("[data-module-document-select]");
  return select
    ? Array.from(select.selectedOptions).map((option) => Number(option.value)).filter((id) => Number.isInteger(id) && id > 0)
    : [];
}

function moduleDocumentOptions(selectedIds = []) {
  if (!cachedCourseModuleDocuments.length) {
    return '<option value="" disabled>No course documents uploaded yet</option>';
  }

  const selectedSet = new Set((selectedIds || []).map((id) => Number(id)));
  return cachedCourseModuleDocuments.map((document) => `
    <option value="${escapeHtml(document.id)}" ${selectedSet.has(Number(document.id)) ? "selected" : ""}>
      ${escapeHtml(document.title || document.file_name)}
    </option>
  `).join("");
}

function refreshCourseModuleDocumentSelects() {
  if (!courseModuleEditors) return;

  for (const select of courseModuleEditors.querySelectorAll("[data-module-document-select]")) {
    const selectedIds = Array.from(select.selectedOptions)
      .map((option) => Number(option.value))
      .filter((id) => Number.isInteger(id) && id > 0);
    select.innerHTML = moduleDocumentOptions(selectedIds);
  }
}

function moduleDocumentSummary(documentIds = []) {
  const selectedSet = new Set((documentIds || []).map((id) => Number(id)));
  return cachedCourseModuleDocuments
    .filter((document) => selectedSet.has(Number(document.id)))
    .map((document) => document.title || document.file_name)
    .filter(Boolean);
}

function courseModulesFromEditor(includeBlank = false) {
  if (!courseModuleEditors) return [];

  const modules = Array.from(courseModuleEditors.querySelectorAll("[data-course-module-editor]")).map((editor) => ({
    title: String(editor.querySelector("[data-module-field='title']")?.value || "").trim(),
    objective: String(editor.querySelector("[data-module-field='objective']")?.value || "").trim(),
    lesson_summary: String(editor.querySelector("[data-module-field='lesson_summary']")?.value || "").trim(),
    assignment: String(editor.querySelector("[data-module-field='assignment']")?.value || "").trim(),
    document_ids: moduleDocumentIdsFromEditor(editor),
  }));
  return includeBlank ? modules : modules.filter((module) => module.title);
}

function currentCourseModules() {
  return courseModulesFromEditor();
}

function renderCourseModulePreview(modules) {
  if (!courseModulePreview) return;

  if (!modules.length) {
    courseModulePreview.innerHTML = "<p>Add a module to begin building the course outline.</p>";
    return;
  }

  courseModulePreview.innerHTML = modules.map((module, index) => `
    <details class="course-module" ${index === 0 ? "open" : ""}>
      <summary>
        <span>Module ${index + 1}</span>
        <strong>${escapeHtml(module.title)}</strong>
        <small>${escapeHtml(module.objective || "Objective to be added")}</small>
      </summary>
      <div class="course-module-detail">
        <div>
          <h4>Lesson Focus</h4>
          <p>${textBlock(module.lesson_summary, "Lesson summary to be added.")}</p>
        </div>
        <div>
          <h4>Assignment</h4>
          <p>${textBlock(module.assignment, "Assignment to be added.")}</p>
        </div>
        ${module.document_ids?.length ? `
          <div>
            <h4>Documents</h4>
            <ul>
              ${moduleDocumentSummary(module.document_ids).map((title) => `<li>${escapeHtml(title)}</li>`).join("")}
            </ul>
          </div>
        ` : ""}
      </div>
      <div class="course-module-actions-row">
        <button class="button primary" type="button" data-assign-course-module="${index}">Assign module</button>
      </div>
    </details>
  `).join("");
}

function renderCourseModuleEditors(modules) {
  if (!courseModuleEditors) return;

  const rows = modules.length ? modules : [{ title: "", objective: "", lesson_summary: "", assignment: "", document_ids: [] }];
  courseModuleEditors.innerHTML = rows.map((module, index) => `
    <section class="portal-module-editor" data-course-module-editor>
      <div class="portal-module-editor-heading">
        <h4>Module ${index + 1}</h4>
        <div class="portal-module-actions">
          <button class="button primary" type="button" data-assign-course-module="${index}">Assign</button>
          ${index > 0 ? `<button class="button secondary" type="button" data-move-course-module-up="${index}">Move Up</button>` : ""}
          ${index < rows.length - 1 ? `<button class="button secondary" type="button" data-move-course-module-down="${index}">Move Down</button>` : ""}
          ${rows.length > 1 ? `<button class="portal-delete-button" type="button" data-remove-course-module="${index}">Remove</button>` : ""}
        </div>
      </div>
      <label>
        Module Title
        <input type="text" data-module-field="title" value="${escapeHtml(module.title || "")}" placeholder="Example: Identify - Discern the Breach">
      </label>
      <label>
        Learning Objective
        <textarea data-module-field="objective" rows="3" placeholder="What should the client understand or demonstrate?">${escapeHtml(module.objective || "")}</textarea>
      </label>
      <label>
        Lesson Summary
        <textarea data-module-field="lesson_summary" rows="3" placeholder="What teaching belongs in this module?">${escapeHtml(module.lesson_summary || "")}</textarea>
      </label>
      <label>
        Assignment
        <textarea data-module-field="assignment" rows="3" placeholder="What work should be submitted?">${escapeHtml(module.assignment || "")}</textarea>
      </label>
      <div class="portal-module-document-tools">
        <label>
          Module Documents
          <select data-module-document-select multiple size="4">
            ${moduleDocumentOptions(module.document_ids || [])}
          </select>
        </label>
        <div class="portal-module-document-upload" data-module-document-upload>
          <strong>Upload document to this module</strong>
          <div class="portal-module-document-upload-grid">
            <label>
              Document Title
              <input type="text" data-module-document-title placeholder="Example: Module ${index + 1} Worksheet">
            </label>
            <label>
              Document
              <input type="file" data-module-document-file accept="${PORTAL_DOCUMENT_ACCEPT}">
            </label>
            <label class="portal-module-document-upload-notes">
              Notes
              <textarea rows="2" data-module-document-description placeholder="Optional notes for elders."></textarea>
            </label>
          </div>
          <button class="button secondary" type="button" data-upload-module-document>Upload and attach</button>
        </div>
        <span class="form-note">Choose existing course documents above, or upload a new document here and it will attach to this module automatically.</span>
      </div>
    </section>
  `).join("");
  renderCourseModulePreview(currentCourseModules());
}

function titleFromFileName(fileName) {
  return String(fileName || "")
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function selectModuleDocument(editor, documentId) {
  const select = editor?.querySelector("[data-module-document-select]");
  if (!select) return;

  for (const option of select.options) {
    if (Number(option.value) === Number(documentId)) {
      option.selected = true;
      break;
    }
  }
}

async function uploadModuleDocument(uploadButton) {
  const editor = uploadButton.closest("[data-course-module-editor]");
  const titleInput = editor?.querySelector("[data-module-document-title]");
  const fileInput = editor?.querySelector("[data-module-document-file]");
  const descriptionInput = editor?.querySelector("[data-module-document-description]");
  const file = fileInput?.files?.[0];
  const title = String(titleInput?.value || titleFromFileName(file?.name)).trim();

  if (!editor || !file) {
    showCourseModuleMessage("Choose a document to upload.");
    return;
  }

  if (!title) {
    showCourseModuleMessage("Enter a document title before uploading.");
    return;
  }

  const uploadData = new FormData();
  uploadData.append("document_scope", "library");
  uploadData.append("title", title);
  uploadData.append("description", String(descriptionInput?.value || "").trim());
  uploadData.append("file", file);

  uploadButton.disabled = true;
  uploadButton.textContent = "Uploading...";
  showCourseModuleMessage("Uploading module document...", false);

  try {
    const { document } = await portalFetch("/api/portal/documents", {
      method: "POST",
      body: uploadData,
    });
    cachedCourseModuleDocuments = [
      document,
      ...cachedCourseModuleDocuments.filter((item) => Number(item.id) !== Number(document.id)),
    ];
    refreshCourseModuleDocumentSelects();
    selectModuleDocument(editor, document.id);
    if (titleInput) titleInput.value = "";
    if (fileInput) fileInput.value = "";
    if (descriptionInput) descriptionInput.value = "";
    renderCourseModulePreview(currentCourseModules());
    showCourseModuleMessage(`${document.title} uploaded and attached to this module. Save Modules to keep the attachment.`, false);
  } catch (error) {
    showCourseModuleMessage(error.message);
  } finally {
    uploadButton.disabled = false;
    uploadButton.textContent = "Upload and attach";
  }
}

function courseSummaryFromModules(modules) {
  return modules.map((module, index) => (
    `Module ${index + 1}: ${module.title}.\n${module.objective}${module.lesson_summary ? `\n${module.lesson_summary}` : ""}`
  )).join("\n\n");
}

courseModuleEditors?.addEventListener("input", () => {
  renderCourseModulePreview(currentCourseModules());
});

courseModuleEditors?.addEventListener("change", (event) => {
  const fileInput = event.target.closest("[data-module-document-file]");
  if (fileInput) {
    const editor = fileInput.closest("[data-course-module-editor]");
    const titleInput = editor?.querySelector("[data-module-document-title]");
    if (titleInput && !String(titleInput.value || "").trim() && fileInput.files?.[0]?.name) {
      titleInput.value = titleFromFileName(fileInput.files[0].name);
    }
  }
  renderCourseModulePreview(currentCourseModules());
});

courseModuleEditors?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || !event.target.closest("[data-module-document-title]")) return;
  event.preventDefault();
});

async function assignCourseModule(assignButton) {
  const selectedEmail = String(courseModuleClientSelect?.value || "").trim().toLowerCase();
  const selectedClient = cachedPortalClients.find((client) => client.client_email === selectedEmail);
  const moduleIndex = Number(assignButton.dataset.assignCourseModule);
  const module = currentCourseModules()[moduleIndex];

  if (!selectedClient) {
    showCourseModuleMessage("Choose a client before assigning this module.");
    return;
  }

  if (!module?.title) {
    showCourseModuleMessage("Add a module title before assigning it.");
    return;
  }

  assignButton.disabled = true;
  assignButton.textContent = "Assigning...";
  showCourseModuleMessage(`Assigning Module ${moduleIndex + 1} to ${selectedClient.client_name}...`, false);

  try {
    await portalFetch("/api/portal/client-coursework", {
      method: "POST",
      body: JSON.stringify({
        client_email: selectedClient.client_email,
        client_name: selectedClient.client_name,
        module_index: moduleIndex,
        item_type: "assignment",
        title: `Module ${moduleIndex + 1}: ${module.title}`,
        instructions: module.assignment || module.lesson_summary || module.objective || "",
        document_ids: module.document_ids || [],
        due_date: "",
      }),
    });
    const documentCount = module.document_ids?.length || 0;
    showCourseModuleMessage(
      documentCount
        ? `Module ${moduleIndex + 1} and ${documentCount} document${documentCount === 1 ? "" : "s"} sent to ${selectedClient.client_name}.`
        : `Module ${moduleIndex + 1} sent to ${selectedClient.client_name}.`,
      false,
    );
  } catch (error) {
    showCourseModuleMessage(error.message);
  } finally {
    assignButton.disabled = false;
    assignButton.textContent = "Assign";
  }
}

courseModuleEditors?.addEventListener("click", (event) => {
  const uploadButton = event.target.closest("[data-upload-module-document]");
  if (uploadButton) {
    uploadModuleDocument(uploadButton);
    return;
  }

  const assignButton = event.target.closest("[data-assign-course-module]");
  if (assignButton) {
    assignCourseModule(assignButton);
    return;
  }

  const button = event.target.closest("[data-remove-course-module], [data-move-course-module-up], [data-move-course-module-down]");
  if (!button) return;

  const modules = courseModulesFromEditor(true);
  if (button.dataset.removeCourseModule) {
    modules.splice(Number(button.dataset.removeCourseModule), 1);
  } else {
    const index = Number(button.dataset.moveCourseModuleUp || button.dataset.moveCourseModuleDown);
    const nextIndex = button.dataset.moveCourseModuleUp ? index - 1 : index + 1;
    [modules[index], modules[nextIndex]] = [modules[nextIndex], modules[index]];
  }
  renderCourseModuleEditors(modules);
});

addCourseModuleButton?.addEventListener("click", () => {
  const modules = courseModulesFromEditor(true);
  modules.push({ title: "", objective: "", lesson_summary: "", assignment: "", document_ids: [] });
  renderCourseModuleEditors(modules);
});

courseModulePreview?.addEventListener("click", (event) => {
  const assignButton = event.target.closest("[data-assign-course-module]");
  if (!assignButton) return;
  assignCourseModule(assignButton);
});

accountPathForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = accountPathForm.querySelector("button[type='submit']");
  const formData = new FormData(accountPathForm);
  const modules = currentCourseModules();

  submitButton.disabled = true;
  showAccountPathMessage("Saving Widows course builder...", false);

  try {
    await portalFetch("/api/portal/account-paths", {
      method: "POST",
      body: JSON.stringify({
        account_type: String(formData.get("account_type") || ""),
        course_code: String(formData.get("course_code") || ""),
        course_status: String(formData.get("course_status") || "draft"),
        path_title: String(formData.get("path_title") || ""),
        overview: String(formData.get("overview") || ""),
        learning_objectives: String(formData.get("learning_objectives") || ""),
        completion_requirements: String(formData.get("completion_requirements") || ""),
        modules,
        coursework: courseSummaryFromModules(modules),
        progress_tracking: String(formData.get("progress_tracking") || ""),
        book_list: String(formData.get("book_list") || ""),
        first_lesson: String(formData.get("first_lesson") || ""),
        first_assignment: String(formData.get("first_assignment") || ""),
      }),
    });
    showAccountPathMessage("Widows course builder saved.", false);
  } catch (error) {
    showAccountPathMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

if (accountPathForm) {
  renderCourseModuleEditors([]);
  loadAccountPath();
}

async function loadLiveStreamManagement() {
  if (!liveStreamManagementForm) return;

  try {
    const status = await portalFetch("/api/site-settings/live-stream");
    updateLiveStreamManagementStatus(status);
  } catch (error) {
    showLiveStreamManagementMessage(error.message);
  }
}

async function saveLiveStreamManagement(enabled) {
  for (const button of liveStreamManagementButtons) {
    button.disabled = true;
  }

  showLiveStreamManagementMessage("Saving live stream schedule...", false);

  try {
    const result = await portalFetch("/api/site-settings/live-stream", {
      method: "POST",
      body: JSON.stringify({ enabled }),
    });
    updateLiveStreamManagementStatus(result);
    showLiveStreamManagementMessage(`Live Stream schedule turned ${result.schedule_enabled ? "on" : "off"}.`, false);
  } catch (error) {
    showLiveStreamManagementMessage(error.message);
  } finally {
    for (const button of liveStreamManagementButtons) {
      button.disabled = false;
    }
  }
}

liveStreamManagementForm?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-live-stream-set]");
  if (!button) return;
  event.preventDefault();
  saveLiveStreamManagement(button.dataset.liveStreamSet === "true");
});

liveStreamManagementForm?.addEventListener("submit", (event) => {
  event.preventDefault();
});

if (liveStreamManagementForm) {
  loadLiveStreamManagement();
}

async function loadForgeLiveManagement() {
  if (!forgeLiveManagementForm) return;

  try {
    const { enabled } = await portalFetch("/api/site-settings/forge-live");
    updateForgeLiveManagementStatus(enabled);
  } catch (error) {
    showForgeLiveManagementMessage(error.message);
  }
}

async function saveForgeLiveManagement(enabled) {
  for (const button of forgeLiveManagementButtons) {
    button.disabled = true;
  }

  showForgeLiveManagementMessage("Saving Forge Live setting...", false);

  try {
    const result = await portalFetch("/api/site-settings/forge-live", {
      method: "POST",
      body: JSON.stringify({ enabled }),
    });
    updateForgeLiveManagementStatus(result.enabled);
    showForgeLiveManagementMessage(`Forge Live turned ${result.enabled ? "on" : "off"}.`, false);
  } catch (error) {
    showForgeLiveManagementMessage(error.message);
  } finally {
    for (const button of forgeLiveManagementButtons) {
      button.disabled = false;
    }
  }
}

forgeLiveManagementForm?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-forge-live-set]");
  if (!button) return;
  event.preventDefault();
  saveForgeLiveManagement(button.dataset.forgeLiveSet === "true");
});

forgeLiveManagementForm?.addEventListener("submit", (event) => {
  event.preventDefault();
});

if (forgeLiveManagementForm) {
  loadForgeLiveManagement();
}

portalInviteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = portalInviteForm.querySelector("button[type='submit']");
  const formData = new FormData(portalInviteForm);

  submitButton.disabled = true;
  showPortalInviteMessage("Creating setup link...", false);

  try {
    const { invite } = await portalFetch("/api/portal/invites", {
      method: "POST",
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        application_email: String(formData.get("application_email") || ""),
        role: String(formData.get("role") || "member"),
        send_email: formData.get("send_email") === "yes",
      }),
    });

    showPortalInviteMessage(
      invite.email_sent
        ? "Setup link created and Zoho accepted the email."
        : invite.email_error
          ? "Setup link created, but Zoho email failed. See the email status below."
          : "Setup link created, but email sending was not requested.",
      Boolean(invite.email_error),
    );
    if (portalInviteResult) {
      const emailStatus = invite.email_sent
        ? "Email status: Sent through Zoho"
        : invite.email_error
          ? `Email status: Not sent - ${invite.email_error}`
          : "Email status: Not sent automatically";
      portalInviteResult.innerHTML = `
        <article class="portal-client-item">
          <div>
            <strong>${escapeHtml(invite.name)}</strong>
            <span>${escapeHtml(portalUserRoleLabel(invite))}</span>
            <small>${escapeHtml(invite.email)}</small>
          </div>
        </article>
        <p class="portal-email-status" data-state="${invite.email_sent ? "success" : "error"}">${escapeHtml(emailStatus)}</p>
        <label>
          Password Setup Link
          <textarea readonly rows="4">${escapeHtml(invite.setup_link)}</textarea>
        </label>
        ${invite.email_error ? `<p class="portal-message" data-state="error">${escapeHtml(invite.email_error)}</p>` : ""}
      `;
    }
    portalInviteForm.reset();
    renderGateApplicationOptions(cachedGateApplications);
    await loadPortalUsers();
  } catch (error) {
    showPortalInviteMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

function renderGateApplicationOptions(applications) {
  if (!gateApplicationSelect) return;

  const selectedValue = gateApplicationSelect.value;
  const options = applications.map((application) => (
    `<option value="${escapeHtml(application.email)}">${escapeHtml(applicationOptionLabel(application))}</option>`
  )).join("");

  gateApplicationSelect.innerHTML = `<option value="">Choose an application or enter manually</option>${options}`;
  if (selectedValue) gateApplicationSelect.value = selectedValue;
  syncGateApplicationActionButtons();
}

function selectedGateApplication() {
  const selectedEmail = String(gateApplicationSelect?.value || "").toLowerCase();
  return cachedGateApplications.find((item) => String(item.email || "").toLowerCase() === selectedEmail);
}

function syncGateApplicationActionButtons() {
  const application = selectedGateApplication();
  if (approveGateApplicationButton) {
    approveGateApplicationButton.disabled = !application;
    approveGateApplicationButton.dataset.qahalApproval = application?.email || "";
    approveGateApplicationButton.dataset.qahalApproved = application?.approval_status === "approved" ? "yes" : "no";
    approveGateApplicationButton.dataset.qahalActionLabel = "Approve Selected Application";
    approveGateApplicationButton.dataset.qahalApprovedLabel = "Resend Approval Email";
    approveGateApplicationButton.textContent = application?.approval_status === "approved"
      ? "Resend Approval Email"
      : "Approve Selected Application";
  }
  if (denyGateApplicationButton) {
    denyGateApplicationButton.disabled = !application;
  }
}

async function loadGateApplications() {
  if (!gateApplicationSelect) return;

  try {
    const { applications } = await portalFetch("/api/portal/invites");
    cachedGateApplications = applications || [];
    renderGateApplicationOptions(cachedGateApplications);
  } catch (error) {
    gateApplicationSelect.innerHTML = `<option value="">${escapeHtml(error.message)}</option>`;
  }
}

gateApplicationSelect?.addEventListener("change", () => {
  const application = selectedGateApplication();
  fillFormFromApplication(portalInviteForm, application);
  syncGateApplicationActionButtons();
});

if (gateApplicationSelect) {
  loadGateApplications();
}

approveGateApplicationButton?.addEventListener("click", async () => {
  if (!selectedGateApplication()) return;
  await approveQahalApplication(approveGateApplicationButton, loadGateApplications);
});

denyGateApplicationButton?.addEventListener("click", async () => {
  const email = String(gateApplicationSelect?.value || "").toLowerCase();
  if (!email) return;

  denyGateApplicationButton.disabled = true;
  try {
    const denied = await denyQahalApplication(email, loadGateApplications);
    if (denied) {
      portalInviteForm?.reset();
      showPortalInviteMessage("Join Qahal application denied and removed from the login list.", false);
    } else {
      denyGateApplicationButton.disabled = false;
    }
  } catch (error) {
    showPortalInviteMessage(error.message);
    denyGateApplicationButton.disabled = false;
  }
});

function renderPortalUsers(users) {
  if (!portalUserList) return;

  if (!users.length) {
    portalUserList.innerHTML = "<p>No gate logins have been set up yet.</p>";
    return;
  }

  portalUserList.innerHTML = users.map((user) => {
    const forumApproved = Boolean(user.mens_forum_approved);
    const hasAutomaticForumAccess = hasAutomaticMensForumAccess(user);
    const firstName = user.first_name || String(user.name || "").trim().split(/\s+/)[0] || "";
    const lastName = user.last_name || String(user.name || "").trim().split(/\s+/).slice(1).join(" ");
    const displayName = `${firstName} ${lastName}`.trim() || user.name || "Unknown Member";
    const forumStatus = hasAutomaticForumAccess ? "Forum: Automatic access" : forumApproved ? "Forum: Approved" : "Forum: Not approved";
    return `
    <details class="portal-client-item portal-user-detail-card portal-user-profile" data-portal-user-email="${escapeHtml(user.email)}">
      <summary>
        <span class="portal-user-main">
          <strong>${escapeHtml(displayName)}</strong>
          <small>${escapeHtml(user.email)}</small>
        </span>
        <span class="portal-user-summary-meta">
          <span class="portal-user-role-pill">${escapeHtml(portalUserRoleLabel(user))}</span>
          <span class="portal-user-status-pill">${escapeHtml(user.status || "active")}</span>
          <span class="portal-user-forum-status">${escapeHtml(forumStatus)}</span>
        </span>
      </summary>
      <div class="portal-user-profile-detail">
        <div class="portal-user-detail-grid">
          <span><b>Status</b>${escapeHtml(user.status || "Unknown")}</span>
          <span><b>Display Role</b>${escapeHtml(user.display_role || "Not set")}</span>
          <span><b>Program</b>${escapeHtml(user.account_type || "None assigned")}</span>
          <span><b>Program Title</b>${escapeHtml(user.portal_title || "None assigned")}</span>
          <span><b>Created</b>${escapeHtml(formatPortalDate(user.created_at) || user.created_at || "Unknown")}</span>
          <span><b>Updated</b>${escapeHtml(formatPortalDate(user.updated_at) || user.updated_at || "Unknown")}</span>
          <span><b>Men's Forum</b>${hasAutomaticForumAccess ? "Automatic access" : forumApproved ? "Approved" : "Not approved"}</span>
          <span><b>Qahal Submitted</b>${escapeHtml(formatPortalDate(user.qahal_submitted_at) || user.qahal_submitted_at || "No Qahal form stored")}</span>
          <span><b>Qahal Approval</b>${escapeHtml(user.approval_status || "pending")}</span>
          <span><b>Approval Email</b>${user.approval_email_sent_at ? escapeHtml(formatPortalDate(user.approval_email_sent_at) || user.approval_email_sent_at) : "Not sent"}</span>
          <span><b>Phone</b>${escapeHtml(user.phone || "Not provided")}</span>
          <span><b>Location</b>${escapeHtml(user.location || "Not provided")}</span>
          <span><b>Qahal Role Requested</b>${escapeHtml(user.role_requested || "Not provided")}</span>
        </div>
        ${user.application_text ? `
          <div class="portal-user-application">
            <strong>Qahal Form Information</strong>
            <p>${textBlock(user.application_text)}</p>
          </div>
          <button
            class="portal-inline-action"
            type="button"
            data-qahal-approval="${escapeHtml(user.email)}"
            data-qahal-approved="${user.approval_status === "approved" ? "yes" : "no"}"
          >
            ${user.approval_status === "approved" ? "Resend Approval Email" : "Approve Join Qahal"}
          </button>
          ${user.approval_status !== "denied" ? `
            <button
              class="portal-delete-button"
              type="button"
              data-qahal-denial="${escapeHtml(user.email)}"
            >
              Deny Join Qahal
            </button>
          ` : ""}
        ` : ""}
        ${hasAutomaticForumAccess ? `
          <span class="portal-status-pill">Approved</span>
        ` : `
          <button
            class="portal-inline-action"
            type="button"
            data-mens-forum-approval="${escapeHtml(user.email)}"
            data-approved="${forumApproved ? "yes" : "no"}"
          >
            ${forumApproved ? "Remove Men's Forum Access" : "Approve Men's Forum"}
          </button>
        `}
      </div>
    </details>
  `;
  }).join("");
}

async function loadPortalUsers() {
  if (!portalUserList) return;

  try {
    const { users } = await portalFetch("/api/portal/users");
    renderPortalUsers(users);
  } catch (error) {
    portalUserList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (portalUserList) {
  loadPortalUsers();
}

portalUserList?.addEventListener("click", async (event) => {
  const qahalButton = event.target.closest("[data-qahal-approval]");
  if (qahalButton) {
    await approveQahalApplication(qahalButton, loadPortalUsers);
    return;
  }

  const qahalDenyButton = event.target.closest("[data-qahal-denial]");
  if (qahalDenyButton) {
    qahalDenyButton.disabled = true;
    try {
      const denied = await denyQahalApplication(qahalDenyButton.dataset.qahalDenial, loadPortalUsers);
      if (denied) {
        await loadGateApplications();
      } else {
        qahalDenyButton.disabled = false;
      }
    } catch (error) {
      window.alert(error.message);
      qahalDenyButton.disabled = false;
    }
    return;
  }

  const button = event.target.closest("[data-mens-forum-approval]");
  if (!button) return;

  const email = button.dataset.mensForumApproval;
  const approve = button.dataset.approved !== "yes";
  button.disabled = true;
  button.textContent = approve ? "Approving..." : "Removing...";

  try {
    await portalFetch("/api/portal/users", {
      method: "PATCH",
      body: JSON.stringify({
        email,
        mens_forum_approved: approve,
      }),
    });
    await loadPortalUsers();
  } catch (error) {
    window.alert(error.message);
    button.disabled = false;
    button.textContent = approve ? "Approve Men's Forum" : "Remove Men's Forum Access";
  }
});

function renderMensForumPosts(posts) {
  if (!mensForumList) return;

  if (!posts.length) {
    mensForumList.innerHTML = "<p>No discussions have been posted yet.</p>";
    return;
  }

  mensForumList.innerHTML = posts.map((post) => `
    <article class="portal-client-item mens-forum-post">
      <div>
        <strong>${escapeHtml(post.title)}</strong>
        <span>${escapeHtml(post.author_name)} · ${escapeHtml(formatPortalDate(post.created_at) || post.created_at || "")}</span>
        <p>${forumTextBlock(post.body)}</p>
        ${renderMensForumMedia(post)}
      </div>
    </article>
  `).join("");
}

function renderMensForumMedia(item) {
  const mediaType = String(item.media_type || "");
  const mediaData = String(item.media_data || "");
  const mediaName = String(item.media_name || "Forum attachment");

  if (!mediaType || !mediaData) return "";

  if (mediaType === "image") {
    return `
      <figure class="mens-forum-media">
        <img src="${escapeHtml(mediaData)}" alt="${escapeHtml(mediaName)}" loading="lazy">
      </figure>
    `;
  }

  if (mediaType === "video") {
    return `
      <figure class="mens-forum-media">
        <video src="${escapeHtml(mediaData)}" controls preload="metadata"></video>
      </figure>
    `;
  }

  return "";
}

function mensForumMediaField() {
  return `
    <div class="mens-forum-compose-preview" data-mens-forum-media-preview hidden></div>
    <div class="mens-forum-media-buttons" aria-label="Add media to reply">
      <label class="mens-forum-upload-button">
        Picture
        <input type="file" name="media_image" accept="image/png,image/jpeg,image/webp,image/gif">
      </label>
      <label class="mens-forum-upload-button">
        Video
        <input type="file" name="media_video" accept="video/mp4,video/webm,video/ogg">
      </label>
      <span class="mens-forum-selected-file" data-mens-forum-selected-file>No file selected</span>
    </div>
  `;
}

function mensForumEmojiToolbar() {
  return `
    <div class="mens-forum-emoji-toolbar" aria-label="Add emoji">
      <button type="button" data-emoji-insert="👍" aria-label="Add thumbs up reaction" title="Thumbs up">👍</button>
      <button type="button" data-emoji-insert="🙏" aria-label="Add prayer reaction" title="Prayer">🙏</button>
      <button type="button" data-emoji-insert="🔥" aria-label="Add fire reaction" title="Fire">🔥</button>
      <button type="button" data-emoji-insert="💪" aria-label="Add strength reaction" title="Strength">💪</button>
      <button type="button" data-emoji-insert="📖" aria-label="Add scripture reaction" title="Scripture">📖</button>
      <button type="button" data-emoji-insert="⚔️" aria-label="Add sharpened reaction" title="Sharpened">⚔️</button>
    </div>
  `;
}

function renderMensForumThreads(posts) {
  if (!mensForumList) return;

  if (!posts.length) {
    mensForumList.innerHTML = "<p>No discussions have been posted yet.</p>";
    return;
  }

  mensForumList.innerHTML = posts.map((post) => `
    <article class="portal-client-item mens-forum-post">
      <div>
        <strong>${escapeHtml(post.title)}</strong>
        <span>${escapeHtml(post.author_name)} - ${escapeHtml(formatPortalDate(post.created_at) || post.created_at || "")}</span>
        <p>${forumTextBlock(post.body)}</p>
        ${renderMensForumMedia(post)}
        <div class="mens-forum-replies">
          ${(post.replies || []).map((reply) => `
            <article class="mens-forum-reply">
              <strong>${escapeHtml(reply.author_name)}</strong>
              <small>${escapeHtml(formatPortalDate(reply.created_at) || reply.created_at || "")}</small>
              <p>${forumTextBlock(reply.body)}</p>
              ${renderMensForumMedia(reply)}
            </article>
          `).join("")}
        </div>
        <form class="mens-forum-reply-form" data-mens-forum-reply-form="${escapeHtml(post.id)}">
          <label>
            Reply
            <textarea name="body" rows="3" placeholder="Reply with correction, encouragement, scripture, or a follow-up question." required></textarea>
          </label>
          ${mensForumMediaField()}
          ${mensForumEmojiToolbar()}
          <button class="button primary" type="submit">Reply</button>
          <p class="portal-message" data-mens-forum-reply-message="${escapeHtml(post.id)}" hidden></p>
        </form>
      </div>
    </article>
  `).join("");
}

async function loadMensForumPosts() {
  if (!mensForumList) return;

  try {
    const { posts } = await portalFetch("/api/portal/mens-forum");
    renderMensForumThreads(posts);
  } catch (error) {
    mensForumList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (mensForumList) {
  loadMensForumPosts();
}

async function uploadMensForumMedia(formData) {
  const imageFile = formData.get("media_image");
  const videoFile = formData.get("media_video");
  const hasImage = imageFile instanceof File && Boolean(imageFile.name);
  const hasVideo = videoFile instanceof File && Boolean(videoFile.name);

  if (hasImage && hasVideo) {
    throw new Error("Choose either one picture or one video.");
  }

  const file = hasImage ? imageFile : hasVideo ? videoFile : formData.get("media");
  if (!(file instanceof File) || !file.name) {
    return { media_type: "", media_data: "", media_name: "" };
  }

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  if (!isImage && !isVideo) {
    throw new Error("Choose a picture or video file.");
  }

  const maxSize = isImage ? 10 * 1024 * 1024 : 30 * 1024 * 1024;
  const maxLabel = isImage ? "10 MB" : "30 MB";
  if (file.size > maxSize) {
    throw new Error(`Choose a smaller ${isImage ? "picture" : "video"}. Attachments must stay under ${maxLabel}.`);
  }

  const uploadData = new FormData();
  uploadData.append("file", file);
  return portalFetch("/api/portal/mens-forum-media", {
    method: "POST",
    body: uploadData,
  });
}

function clearMensForumMediaPreview(form) {
  const preview = form?.querySelector("[data-mens-forum-media-preview]");
  if (!preview) return;

  preview.hidden = true;
  preview.innerHTML = "";
}

function showMensForumMediaPreview(input) {
  const file = input.files?.[0];
  const form = input.closest("form");
  const preview = form?.querySelector("[data-mens-forum-media-preview]");
  if (!preview) return;

  if (!file) {
    clearMensForumMediaPreview(form);
    return;
  }

  const fileUrl = URL.createObjectURL(file);
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    clearMensForumMediaPreview(form);
    return;
  }

  preview.hidden = false;
  preview.innerHTML = isImage
    ? `<img src="${escapeHtml(fileUrl)}" alt="${escapeHtml(file.name)}">`
    : `<video src="${escapeHtml(fileUrl)}" controls muted preload="metadata"></video>`;
}

document.addEventListener("change", (event) => {
  const input = event.target.closest("input[type='file'][name='media_image'], input[type='file'][name='media_video']");
  if (!input) return;

  const form = input.closest("form");
  const mediaImage = form?.querySelector("input[name='media_image']");
  const mediaVideo = form?.querySelector("input[name='media_video']");
  const selectedFile = form?.querySelector("[data-mens-forum-selected-file]");

  if (input.name === "media_image" && mediaVideo) mediaVideo.value = "";
  if (input.name === "media_video" && mediaImage) mediaImage.value = "";

  if (selectedFile) {
    selectedFile.textContent = input.files?.[0]?.name || "No file selected";
  }

  showMensForumMediaPreview(input);
});

mensForumForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = mensForumForm.querySelector("button[type='submit']");
  const formData = new FormData(mensForumForm);

  submitButton.disabled = true;
  showMensForumMessage("Posting discussion...", false);

  try {
    const media = await uploadMensForumMedia(formData);
    await portalFetch("/api/portal/mens-forum", {
      method: "POST",
      body: JSON.stringify({
        title: String(formData.get("title") || ""),
        body: String(formData.get("body") || ""),
        ...media,
      }),
    });
    mensForumForm.reset();
    clearMensForumMediaPreview(mensForumForm);
    showMensForumMessage("Discussion posted.", false);
    await loadMensForumPosts();
  } catch (error) {
    showMensForumMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

function insertEmojiIntoTextarea(textarea, emoji) {
  if (!textarea) return;
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  textarea.value = `${textarea.value.slice(0, start)}${emoji}${textarea.value.slice(end)}`;
  const cursor = start + emoji.length;
  textarea.focus();
  textarea.setSelectionRange(cursor, cursor);
}

document.addEventListener("click", (event) => {
  const emojiButton = event.target.closest("[data-emoji-insert]");
  if (!emojiButton) return;

  const form = emojiButton.closest("form");
  const textarea = form?.querySelector("textarea[name='body']");
  insertEmojiIntoTextarea(textarea, emojiButton.dataset.emojiInsert || "");
});

mensForumList?.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-mens-forum-reply-form]");
  if (!form) return;

  event.preventDefault();
  const postId = Number(form.dataset.mensForumReplyForm || 0);
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector(`[data-mens-forum-reply-message="${postId}"]`);
  const formData = new FormData(form);

  if (message) {
    message.hidden = false;
    message.textContent = "Posting reply...";
    message.dataset.state = "success";
  }
  submitButton.disabled = true;

  try {
    const media = await uploadMensForumMedia(formData);
    await portalFetch("/api/portal/mens-forum", {
      method: "POST",
      body: JSON.stringify({
        parent_post_id: postId,
        body: String(formData.get("body") || ""),
        ...media,
      }),
    });
    form.reset();
    clearMensForumMediaPreview(form);
    if (message) message.textContent = "Reply posted.";
    await loadMensForumPosts();
  } catch (error) {
    if (message) {
      message.textContent = error.message;
      message.dataset.state = "error";
    }
  } finally {
    submitButton.disabled = false;
  }
});

function renderDirectMessageRecipients(recipients, canManage) {
  if (!directMessageRecipientSelect) return;

  const elderRecipientRoles = new Set(["admin", "editor", "elder"]);
  const elderRecipients = (recipients || []).filter((recipient) => {
    const role = String(recipient.role || "").toLowerCase();
    const displayRole = String(recipient.display_role || "").toLowerCase();
    return elderRecipientRoles.has(role) ||
      displayRole.includes("elder") ||
      displayRole.includes("deacon") ||
      displayRole.includes("co-founder");
  });
  const availableRecipients = canManage
    ? recipients
    : elderRecipients.length
      ? elderRecipients
      : DIRECT_MESSAGE_ELDER_RECIPIENTS;

  if (directMessageFormLegend) {
    directMessageFormLegend.textContent = canManage
      ? "Send Message to Member/Client"
      : "Send Message to an Elder/Admin/Deacon";
  }

  if (!availableRecipients.length) {
    directMessageRecipientSelect.innerHTML = `<option value="">No recipients available</option>`;
    return;
  }

  directMessageRecipientSelect.innerHTML = `
    <option value="">Choose a recipient</option>
    ${availableRecipients.map((recipient) => `
      <option value="${escapeHtml(recipient.email)}">${escapeHtml(recipient.name)}${recipient.display_role ? ` - ${escapeHtml(recipient.display_role)}` : ` - ${escapeHtml(recipient.role)}`}</option>
    `).join("")}
  `;
}

function renderPortalDirectMessages(messages, canManage) {
  if (!portalDirectMessageList) return;

  if (!messages.length) {
    portalDirectMessageList.innerHTML = "<p>No direct messages yet.</p>";
    return;
  }

  portalDirectMessageList.innerHTML = `
    <div class="direct-message-mailbox" role="list">
      ${messages.map((message) => `
        <details class="direct-message-item${message.status === "new" ? " direct-message-unread" : ""}" data-direct-message-id="${escapeHtml(message.id)}" role="listitem">
          <summary>
            <span class="direct-message-sender">${escapeHtml(message.sender_name)}</span>
            <span class="direct-message-subject">${escapeHtml(message.subject)}</span>
            <span class="direct-message-preview">${escapeHtml(textPreview(message.body))}</span>
            <span class="direct-message-meta">
              <small>${escapeHtml(formatPortalDate(message.created_at) || message.created_at || "")}</small>
              <small>${escapeHtml(message.status)}</small>
            </span>
          </summary>
          <div class="direct-message-body">
            <div class="direct-message-header">
              <strong>${escapeHtml(message.subject)}</strong>
              <small>From: ${escapeHtml(message.sender_name)} (${escapeHtml(message.sender_email)})</small>
              <small>To: ${escapeHtml(message.recipient_name || "Elders/Admin")}</small>
            </div>
            <p>${textBlock(message.body)}</p>
          </div>
      ${canManage ? `
        <div class="direct-message-actions">
          <button class="portal-inline-action" type="button" data-message-status="read" data-message-id="${escapeHtml(message.id)}">Mark Read</button>
          <button class="portal-inline-action" type="button" data-message-status="archived" data-message-id="${escapeHtml(message.id)}">Archive</button>
        </div>
      ` : ""}
        </details>
      `).join("")}
    </div>
  `;
}

function passwordSetupReminderLabel(invite) {
  const name = invite.name || invite.email;
  const role = portalUserRoleLabel(invite);
  const expires = invite.expired
    ? "setup link expired"
    : invite.expires_at
      ? `expires ${formatPortalDate(invite.expires_at) || invite.expires_at}`
      : "pending setup";
  return `${name} - ${role} - ${invite.email} - ${expires}`;
}

function renderPasswordSetupReminderOptions(invites) {
  if (!passwordSetupReminderSelect) return;

  if (!invites.length) {
    passwordSetupReminderSelect.innerHTML = `<option value="">No pending gate setup links</option>`;
    passwordSetupReminderSelect.disabled = true;
    const submitButton = passwordSetupReminderForm?.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;
    return;
  }

  passwordSetupReminderSelect.disabled = false;
  const submitButton = passwordSetupReminderForm?.querySelector("button[type='submit']");
  if (submitButton) submitButton.disabled = false;
  passwordSetupReminderSelect.innerHTML = `
    <option value="">Choose a pending account</option>
    ${invites.map((invite) => `
      <option value="${escapeHtml(invite.email)}">${escapeHtml(passwordSetupReminderLabel(invite))}</option>
    `).join("")}
  `;
}

async function loadPasswordSetupReminders() {
  if (!passwordSetupReminderForm || !passwordSetupReminderSelect) return;

  try {
    const { invites } = await portalFetch("/api/portal/setup-reminders");
    renderPasswordSetupReminderOptions(invites || []);
  } catch (error) {
    passwordSetupReminderSelect.innerHTML = `<option value="">${escapeHtml(error.message)}</option>`;
    passwordSetupReminderSelect.disabled = true;
    const submitButton = passwordSetupReminderForm.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;
  }
}

function renderMemberDirectory(members) {
  if (!memberDirectoryList) return;

  if (!members.length) {
    memberDirectoryList.innerHTML = "<p>No active members are listed yet.</p>";
    return;
  }

  memberDirectoryList.innerHTML = members.map((member) => `
    <article class="portal-member-directory-card">
      ${member.profile_image_data ? `
        <img class="portal-member-directory-avatar" src="${escapeHtml(member.profile_image_data)}" alt="${escapeHtml(member.name)} profile picture">
      ` : `
        <span class="portal-member-directory-avatar portal-member-directory-avatar-fallback" aria-hidden="true">${escapeHtml(memberInitials(member.name))}</span>
      `}
      <span class="portal-member-directory-details">
        <strong class="portal-member-directory-name">
          ${escapeHtml(member.name)}
          ${member.public_location_state ? `<span class="portal-member-directory-state">${escapeHtml(member.public_location_state)}</span>` : ""}
        </strong>
        <span>${escapeHtml(member.display_role || "Member")}</span>
      </span>
    </article>
  `).join("");
}

function renderMemberMap(members) {
  if (!memberMap || !memberMapList) return;

  const stateCounts = members.reduce((counts, member) => {
    const state = String(member.public_location_state || "").toUpperCase();
    if (!MEMBER_STATE_CODES.has(state)) return counts;
    counts[state] = (counts[state] || 0) + 1;
    return counts;
  }, {});

  const states = Object.keys(stateCounts).sort();
  const existingMarkers = memberMap.querySelectorAll(".portal-member-map-marker, .portal-member-map-state-label");
  for (const marker of existingMarkers) marker.remove();

  for (const [state, [left, top]] of Object.entries(MEMBER_STATE_POINTS)) {
    const label = document.createElement("span");
    label.className = "portal-member-map-state-label";
    label.style.left = `${left}%`;
    label.style.top = `${top}%`;
    label.textContent = state;
    label.setAttribute("aria-hidden", "true");
    memberMap.append(label);
  }

  if (!states.length) {
    memberMapList.innerHTML = "<p>No members have shared a public state yet.</p>";
    return;
  }

  for (const state of states) {
    const [left, top] = MEMBER_STATE_POINTS[state];
    const marker = document.createElement("span");
    marker.className = "portal-member-map-marker";
    marker.style.left = `${left}%`;
    marker.style.top = `${top}%`;
    marker.textContent = stateCounts[state];
    marker.title = `${state}: ${stateCounts[state]} member${stateCounts[state] === 1 ? "" : "s"}`;
    marker.setAttribute("aria-label", marker.title);
    memberMap.append(marker);
  }

  memberMapList.innerHTML = states.map((state) => `
    <span>${escapeHtml(state)} <strong>${stateCounts[state]}</strong></span>
  `).join("");
}

function memberInitials(name) {
  const parts = String(name || "YM").trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "YM";
}

function setMemberAvatarPreview(imageData) {
  if (!memberAvatarPreview || !memberAvatarPlaceholder) return;
  memberAvatarPreview.hidden = !imageData;
  memberAvatarPlaceholder.hidden = Boolean(imageData);
  if (imageData) memberAvatarPreview.src = imageData;
}

function hydrateMemberProfile(user) {
  if (!memberProfileForm) return;
  setMemberAvatarPreview(user.profile_image_data || "");
  if (memberProfileForm.elements.public_location_state) {
    memberProfileForm.elements.public_location_state.value = user.public_location_state || "";
  }
  if (memberProfileForm.elements.public_location_enabled) {
    memberProfileForm.elements.public_location_enabled.checked = Boolean(user.public_location_enabled);
  }
}

function resizeProfileImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Unable to read that image."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Upload a PNG, JPG, or WebP image."));
      image.onload = () => {
        const size = 256;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        const sourceSize = Math.min(image.width, image.height);
        const sourceX = Math.max(0, (image.width - sourceSize) / 2);
        const sourceY = Math.max(0, (image.height - sourceSize) / 2);
        context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function loadMemberDirectory() {
  if (!memberDirectoryList && !memberMap) return;

  try {
    const { members } = await portalFetch("/api/portal/member-directory");
    renderMemberDirectory(members || []);
    renderMemberMap(members || []);
  } catch (error) {
    if (memberDirectoryList) memberDirectoryList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
    if (memberMapList) memberMapList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (memberDirectoryList || memberMap) {
  loadMemberDirectory();
}

memberProfileForm?.elements.profile_image?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  showMemberProfileMessage("Saving profile picture...", false);
  try {
    const profileImageData = await resizeProfileImage(file);
    const { profile_image_data } = await portalFetch("/api/portal/profile-picture", {
      method: "POST",
      body: JSON.stringify({ profile_image_data: profileImageData }),
    });
    setMemberAvatarPreview(profile_image_data);
    showMemberProfileMessage("Profile picture saved.", false);
    await loadMemberDirectory();
  } catch (error) {
    showMemberProfileMessage(error.message);
  } finally {
    event.target.value = "";
  }
});

removeMemberAvatarButton?.addEventListener("click", async () => {
  removeMemberAvatarButton.disabled = true;
  showMemberProfileMessage("Removing profile picture...", false);
  try {
    await portalFetch("/api/portal/profile-picture", { method: "DELETE" });
    setMemberAvatarPreview("");
    showMemberProfileMessage("Profile picture removed.", false);
    await loadMemberDirectory();
  } catch (error) {
    showMemberProfileMessage(error.message);
  } finally {
    removeMemberAvatarButton.disabled = false;
  }
});

memberProfileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = memberProfileForm.querySelector("button[type='submit']");
  const formData = new FormData(memberProfileForm);
  submitButton.disabled = true;
  showMemberProfileMessage("Saving directory profile...", false);

  try {
    await portalFetch("/api/portal/member-profile", {
      method: "PATCH",
      body: JSON.stringify({
        public_location_state: String(formData.get("public_location_state") || ""),
        public_location_enabled: Boolean(formData.get("public_location_enabled")),
      }),
    });
    showMemberProfileMessage("Directory profile saved.", false);
    await loadMemberDirectory();
  } catch (error) {
    showMemberProfileMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

async function loadPortalDirectMessages() {
  if (!portalDirectMessageList) return;

  try {
    const { messages, can_manage, can_send, recipients } = await portalFetch("/api/portal/messages");
    if (portalDirectMessageForm) {
      portalDirectMessageForm.hidden = !can_send;
    }
    renderDirectMessageRecipients(recipients || [], can_manage);
    renderPortalDirectMessages(messages, can_manage);
    if (passwordSetupReminderForm) {
      passwordSetupReminderForm.hidden = !can_manage;
      if (can_manage) await loadPasswordSetupReminders();
    }
  } catch (error) {
    portalDirectMessageList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (portalDirectMessageList) {
  loadPortalDirectMessages();
} else if (passwordSetupReminderForm) {
  passwordSetupReminderForm.hidden = false;
  loadPasswordSetupReminders();
}

portalDirectMessageForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (activePortalPreviewMode()) {
    showPortalDirectMessage("Preview mode is read-only. Messages are not sent from previews.");
    return;
  }
  const submitButton = portalDirectMessageForm.querySelector("button[type='submit']");
  const formData = new FormData(portalDirectMessageForm);

  submitButton.disabled = true;
  showPortalDirectMessage("Sending message...", false);

  try {
    await portalFetch("/api/portal/messages", {
      method: "POST",
      body: JSON.stringify({
        recipient_email: String(formData.get("recipient_email") || ""),
        subject: String(formData.get("subject") || ""),
        body: String(formData.get("body") || ""),
      }),
    });
    portalDirectMessageForm.reset();
    showPortalDirectMessage("Message sent to the portal inbox.", false);
    await loadPortalDirectMessages();
  } catch (error) {
    showPortalDirectMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

passwordSetupReminderForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = passwordSetupReminderForm.querySelector("button[type='submit']");
  const formData = new FormData(passwordSetupReminderForm);
  const email = String(formData.get("email") || "").trim().toLowerCase();

  submitButton.disabled = true;
  showPasswordSetupReminderMessage("Sending password setup reminder...", false);

  try {
    const { reminder } = await portalFetch("/api/portal/setup-reminders", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (reminder.email_sent) {
      showPasswordSetupReminderMessage(`Setup reminder sent to ${reminder.name || reminder.email}.`, false);
    } else {
      showPasswordSetupReminderMessage(`Fresh setup link created, but email failed: ${reminder.email_error}`);
    }
    passwordSetupReminderForm.reset();
    await loadPasswordSetupReminders();
  } catch (error) {
    showPasswordSetupReminderMessage(error.message);
  } finally {
    submitButton.disabled = Boolean(passwordSetupReminderSelect?.disabled);
  }
});

portalDirectMessageList?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-message-status]");
  if (!button) return;

  button.disabled = true;
  try {
    await portalFetch("/api/portal/messages", {
      method: "PATCH",
      body: JSON.stringify({
        id: Number(button.dataset.messageId || 0),
        status: button.dataset.messageStatus,
      }),
    });
    await loadPortalDirectMessages();
  } catch (error) {
    window.alert(error.message);
    button.disabled = false;
  }
});

function resetBlogPostForm() {
  if (!blogPostForm) return;
  blogPostForm.reset();
  blogPostForm.elements.id.value = "";
  if (blogPostForm.elements.post_type) {
    blogPostForm.elements.post_type.value = "internal";
  }
  updateBlogPostTypeFields();
  blogPostForm.querySelector("button[type='submit']").textContent = "Save post";
}

function updateBlogPostTypeFields() {
  if (!blogPostForm) return;
  const postTypeField = blogPostForm.elements.post_type;
  const externalUrlField = blogPostForm.elements.external_url;
  const bodyField = blogPostForm.elements.body;
  const isExternal = postTypeField?.value === "external";

  if (externalUrlField) {
    externalUrlField.required = isExternal;
  }

  if (bodyField) {
    bodyField.placeholder = isExternal
      ? "Describe why this outside blog is being shared, or add notes for readers."
      : "Write the full blog post here.";
  }
}

function renderBlogPosts(posts) {
  if (!blogPostList) return;

  if (!posts.length) {
    blogPostList.innerHTML = "<p>No blog posts have been written yet.</p>";
    return;
  }

  blogPostList.innerHTML = posts.map((post) => `
    <article class="portal-blog-item" data-blog-post-id="${escapeHtml(post.id)}">
      <div>
        <span class="portal-blog-status" data-status="${escapeHtml(post.status)}">${escapeHtml(post.status)}</span>
        <span class="portal-blog-type">${escapeHtml(post.post_type === "external" ? "External Link" : "Website Post")}</span>
        <h4>${escapeHtml(post.title)}</h4>
        <p>${escapeHtml(post.excerpt || post.body.slice(0, 160))}</p>
        ${post.external_url ? `<small>${escapeHtml(post.external_url)}</small>` : ""}
        <small>${escapeHtml(formatPortalDate(post.published_at || post.updated_at))}</small>
      </div>
      <div class="portal-blog-item-actions">
        <button class="button secondary" type="button" data-edit-blog-post="${escapeHtml(post.id)}">Edit</button>
        <button class="portal-delete-button" type="button" data-delete-blog-post="${escapeHtml(post.id)}">Delete</button>
      </div>
    </article>
  `).join("");
}

async function loadBlogPosts() {
  if (!blogPostList) return;

  try {
    const { posts } = await portalFetch("/api/blog-posts?include=all");
    cachedBlogPosts = posts || [];
    renderBlogPosts(cachedBlogPosts);
  } catch (error) {
    blogPostList.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

if (blogPostList) {
  loadBlogPosts();
}

updateBlogPostTypeFields();
blogPostTypeSelect?.addEventListener("change", updateBlogPostTypeFields);

blogPostReset?.addEventListener("click", () => {
  resetBlogPostForm();
  showBlogPostMessage("Form cleared.", false);
});

blogPostForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = blogPostForm.querySelector("button[type='submit']");
  const formData = new FormData(blogPostForm);
  const id = String(formData.get("id") || "");

  submitButton.disabled = true;
  showBlogPostMessage(id ? "Updating blog post..." : "Saving blog post...", false);

  try {
    await portalFetch("/api/blog-posts", {
      method: id ? "PUT" : "POST",
      body: JSON.stringify({
        id,
        post_type: String(formData.get("post_type") || "internal"),
        title: String(formData.get("title") || ""),
        external_url: String(formData.get("external_url") || ""),
        source_name: String(formData.get("source_name") || ""),
        excerpt: String(formData.get("excerpt") || ""),
        body: String(formData.get("body") || ""),
        status: String(formData.get("status") || "draft"),
      }),
    });
    showBlogPostMessage(id ? "Blog post updated." : "Blog post saved.", false);
    resetBlogPostForm();
    await loadBlogPosts();
  } catch (error) {
    showBlogPostMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

blogPostList?.addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-edit-blog-post]");
  const deleteButton = event.target.closest("[data-delete-blog-post]");

  if (editButton && blogPostForm) {
    const post = cachedBlogPosts.find((item) => String(item.id) === String(editButton.dataset.editBlogPost));
    if (!post) return;

    blogPostForm.elements.id.value = post.id;
    if (blogPostForm.elements.post_type) {
      blogPostForm.elements.post_type.value = post.post_type || "internal";
    }
    blogPostForm.elements.title.value = post.title || "";
    if (blogPostForm.elements.external_url) {
      blogPostForm.elements.external_url.value = post.external_url || "";
    }
    if (blogPostForm.elements.source_name) {
      blogPostForm.elements.source_name.value = post.source_name || "";
    }
    blogPostForm.elements.excerpt.value = post.excerpt || "";
    blogPostForm.elements.body.value = post.body || "";
    blogPostForm.elements.status.value = post.status || "draft";
    updateBlogPostTypeFields();
    blogPostForm.querySelector("button[type='submit']").textContent = "Update post";
    showBlogPostMessage("Post loaded for editing.", false);
    blogPostForm.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (deleteButton) {
    const id = String(deleteButton.dataset.deleteBlogPost || "");
    if (!id || !window.confirm("Delete this blog post?")) return;

    deleteButton.disabled = true;
    showBlogPostMessage("Deleting blog post...", false);

    try {
      await portalFetch("/api/blog-posts", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      showBlogPostMessage("Blog post deleted.", false);
      await loadBlogPosts();
    } catch (error) {
      showBlogPostMessage(error.message);
      deleteButton.disabled = false;
    }
  }
});

if (dailyTaskReportForm) {
  const dateField = dailyTaskReportForm.elements.report_date;
  if (dateField && !dateField.value) {
    dateField.value = new Date().toISOString().slice(0, 10);
  }
}

dailyTaskReportForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (activePortalPreviewMode()) {
    showDailyTaskReportMessage("Preview mode is read-only. Daily reports are not submitted from previews.");
    return;
  }
  const submitButton = dailyTaskReportForm.querySelector("button[type='submit']");
  const formData = new FormData(dailyTaskReportForm);

  submitButton.disabled = true;
  showDailyTaskReportMessage("Submitting daily report...", false);

  try {
    await portalFetch("/api/portal/daily-task-reports", {
      method: "POST",
      body: JSON.stringify({
        report_date: String(formData.get("report_date") || ""),
        completed_tasks: String(formData.get("completed_tasks") || ""),
        progress_notes: String(formData.get("progress_notes") || ""),
        blockers: String(formData.get("blockers") || ""),
        next_steps: String(formData.get("next_steps") || ""),
      }),
    });
    showDailyTaskReportMessage("Daily task report submitted.", false);
    dailyTaskReportForm.reset();
    const dateField = dailyTaskReportForm.elements.report_date;
    if (dateField) {
      dateField.value = new Date().toISOString().slice(0, 10);
    }
  } catch (error) {
    showDailyTaskReportMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

for (const reflectionForm of clientReflectionForms) {
  const type = reflectionForm.dataset.clientReflectionForm;
  const dateField = reflectionForm.elements.reflection_date;
  if (dateField && !dateField.value) {
    dateField.value = new Date().toISOString().slice(0, 10);
  }

  reflectionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (activePortalPreviewMode()) {
      showClientReflectionMessage(String(reflectionForm.dataset.clientReflectionForm || ""), "Preview mode is read-only. Entries are not submitted from previews.");
      return;
    }
    const submitButton = reflectionForm.querySelector("button[type='submit']");
    const formData = new FormData(reflectionForm);
    const reflectionType = String(formData.get("reflection_type") || type || "");

    submitButton.disabled = true;
    showClientReflectionMessage(reflectionType, "Submitting entry...", false);

    try {
      await portalFetch("/api/portal/client-reflections", {
        method: "POST",
        body: JSON.stringify({
          reflection_type: reflectionType,
          reflection_date: String(formData.get("reflection_date") || ""),
          title: String(formData.get("title") || ""),
          body: String(formData.get("body") || ""),
        }),
      });
      showClientReflectionMessage(reflectionType, "Entry submitted for elder review.", false);
      reflectionForm.reset();
      const nextDateField = reflectionForm.elements.reflection_date;
      if (nextDateField) {
        nextDateField.value = new Date().toISOString().slice(0, 10);
      }
    } catch (error) {
      showClientReflectionMessage(reflectionType, error.message);
    } finally {
      submitButton.disabled = false;
    }
  });
}

for (const readinessForm of readinessAssessmentForms) {
  const dateField = readinessForm.elements.reflection_date;
  if (dateField && !dateField.value) {
    dateField.value = new Date().toISOString().slice(0, 10);
  }

  readinessForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = readinessForm.querySelector("button[type='submit']");
    const title = String(readinessForm.elements.title?.value || readinessForm.dataset.readinessTitle || "Widows Readiness Assessment");
    const answers = Array.from(readinessForm.querySelectorAll("textarea")).map((textarea, index) => {
      const label = textarea.closest("label");
      const question = String(label?.childNodes?.[0]?.textContent || `Question ${index + 1}`).trim();
      return `${index + 1}. ${question}\n${String(textarea.value || "").trim()}`;
    });

    submitButton.disabled = true;
    showReadinessAssessmentMessage(readinessForm, "Submitting assessment answers...", false);

    try {
      await portalFetch("/api/portal/client-reflections", {
        method: "POST",
        body: JSON.stringify({
          reflection_type: "journal",
          reflection_date: String(dateField?.value || new Date().toISOString().slice(0, 10)),
          title,
          body: answers.join("\n\n"),
        }),
      });
      showReadinessAssessmentMessage(readinessForm, "Assessment answers submitted for elder review.", false);
      readinessForm.reset();
      if (dateField) {
        dateField.value = new Date().toISOString().slice(0, 10);
      }
    } catch (error) {
      showReadinessAssessmentMessage(readinessForm, error.message);
    } finally {
      submitButton.disabled = false;
    }
  });
}

function renderElderWidowAssessmentClientOptions(clients) {
  if (!elderWidowAssessmentClientSelect) return;

  const selectedValue = elderWidowAssessmentClientSelect.value || "";
  const widowsClients = (clients || []).filter((client) => client.account_type === "Widows");
  elderWidowAssessmentClientSelect.innerHTML = `<option value="">Choose a widow</option>${widowsClients.map((client) => `
    <option value="${escapeHtml(client.client_email)}">${escapeHtml(client.client_name)} - ${escapeHtml(client.client_email)}</option>
  `).join("")}`;

  const requestedEmail = String(portalPageParams.get("client_email") || "").trim().toLowerCase();
  const nextValue = selectedValue || requestedEmail;
  if (nextValue && widowsClients.some((client) => client.client_email === nextValue)) {
    elderWidowAssessmentClientSelect.value = nextValue;
  }
}

function resetElderWidowAssessmentFields() {
  if (!elderWidowAssessmentForm) return;
  const selectedClient = elderWidowAssessmentClientSelect?.value || "";
  elderWidowAssessmentForm.reset();
  if (elderWidowAssessmentClientSelect) {
    elderWidowAssessmentClientSelect.value = selectedClient;
  }
  if (elderWidowAssessmentForm.elements.review_date) {
    elderWidowAssessmentForm.elements.review_date.value = new Date().toISOString().slice(0, 10);
  }
}

function hydrateElderWidowAssessment(assessment) {
  if (!elderWidowAssessmentForm) return;

  const selectedClient = elderWidowAssessmentClientSelect?.value || "";
  resetElderWidowAssessmentFields();
  if (elderWidowAssessmentClientSelect) {
    elderWidowAssessmentClientSelect.value = selectedClient;
  }

  const values = assessment?.assessment_json?.values || {};
  for (const [name, value] of Object.entries(values)) {
    const field = elderWidowAssessmentForm.elements[name];
    if (!field || name === "client_email") continue;
    field.value = value;
  }
}

function collectElderWidowAssessmentPayload(sendToClient) {
  const formData = new FormData(elderWidowAssessmentForm);
  const values = {};
  for (const [key, value] of formData.entries()) {
    values[key] = String(value || "").trim();
  }

  const clientEmail = String(values.client_email || "").trim().toLowerCase();
  const selectedClient = cachedPortalClients.find((client) => client.client_email === clientEmail);
  const title = String(values.title || "Elder-Only Widow Shepherding Assessment");
  const setupLines = [
    title,
    selectedClient ? `Widow: ${selectedClient.client_name} (${selectedClient.client_email})` : "",
    values.review_date ? `Review date: ${values.review_date}` : "",
    values.elder_initials ? `Elder initials: ${values.elder_initials}` : "",
  ].filter(Boolean);

  const sections = Array.from(elderWidowAssessmentForm.querySelectorAll("[data-elder-assessment-section]")).map((section) => {
    const title = String(section.querySelector("legend")?.textContent || "Assessment Section").trim();
    const answers = Array.from(section.querySelectorAll("[data-assessment-question]")).map((field) => {
      const answer = String(field.value || "").trim();
      return {
        name: field.name,
        question: String(field.dataset.assessmentQuestion || field.name).trim(),
        answer,
      };
    });
    return { title, answers };
  });

  const hasAnswer = sections.some((section) => section.answers.some((entry) => entry.answer));
  const sectionText = sections.map((section) => {
    const answerText = section.answers.map((entry) => `${entry.question}\n${entry.answer || "No answer added."}`).join("\n\n");
    return `${section.title}\n${answerText}`;
  }).join("\n\n");

  return {
    client_email: clientEmail,
    title,
    assessment_json: {
      values,
      sections,
    },
    assessment_text: [setupLines.join("\n"), sectionText].filter(Boolean).join("\n\n"),
    send_to_client: sendToClient,
    has_answer: hasAnswer,
  };
}

async function loadLatestElderWidowAssessment() {
  if (!elderWidowAssessmentForm || !elderWidowAssessmentClientSelect) return;

  const clientEmail = String(elderWidowAssessmentClientSelect.value || "").trim().toLowerCase();
  if (!clientEmail) {
    resetElderWidowAssessmentFields();
    showElderWidowAssessmentMessage("Choose a widow to begin or restore the latest saved elder copy.", false);
    return;
  }

  try {
    const title = String(elderWidowAssessmentForm.elements.title?.value || "Elder-Only Widow Shepherding Assessment");
    const { assessment } = await portalFetch(`/api/portal/elder-assessments?client_email=${encodeURIComponent(clientEmail)}&title=${encodeURIComponent(title)}`);
    hydrateElderWidowAssessment(assessment);
    showElderWidowAssessmentMessage(
      assessment
        ? "Latest saved elder copy restored. Review before saving or sending."
        : "No saved elder copy yet. Complete the form and save it when ready.",
      false,
    );
  } catch (error) {
    showElderWidowAssessmentMessage(error.message);
  }
}

async function loadElderWidowAssessmentClients() {
  if (!elderWidowAssessmentClientSelect) return;

  try {
    const { clients } = await portalFetch("/api/portal/clients");
    cachedPortalClients = clients || [];
    renderElderWidowAssessmentClientOptions(cachedPortalClients);
    await loadLatestElderWidowAssessment();
  } catch (error) {
    showElderWidowAssessmentMessage(error.message);
  }
}

elderWidowAssessmentClientSelect?.addEventListener("change", loadLatestElderWidowAssessment);

elderWidowAssessmentForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = event.submitter || elderWidowAssessmentForm.querySelector("button[type='submit']");
  const sendToClient = submitButton?.value === "send";
  const payload = collectElderWidowAssessmentPayload(sendToClient);

  if (!payload.client_email) {
    showElderWidowAssessmentMessage("Choose a widow before saving this assessment.");
    return;
  }

  if (!payload.has_answer) {
    showElderWidowAssessmentMessage("Complete at least one assessment field before saving.");
    return;
  }

  if (sendToClient && !window.confirm("Send this completed assessment to the client now?")) {
    return;
  }

  const buttons = elderWidowAssessmentForm.querySelectorAll("button[type='submit']");
  buttons.forEach((button) => {
    button.disabled = true;
  });
  submitButton.textContent = sendToClient ? "Saving and sending..." : "Saving...";
  showElderWidowAssessmentMessage(sendToClient ? "Saving and sending completed assessment..." : "Saving elder copy...", false);

  try {
    const { sent } = await portalFetch("/api/portal/elder-assessments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    showElderWidowAssessmentMessage(
      sent ? "Completed assessment saved and sent to the client." : "Elder copy saved privately.",
      false,
    );
  } catch (error) {
    showElderWidowAssessmentMessage(error.message);
  } finally {
    buttons.forEach((button) => {
      button.disabled = false;
    });
    if (submitButton?.value === "send") {
      submitButton.textContent = "Save and send to client";
    } else if (submitButton) {
      submitButton.textContent = "Save elder copy";
    }
  }
});

if (elderWidowAssessmentForm) {
  resetElderWidowAssessmentFields();
  loadElderWidowAssessmentClients();
}

if (portalAssignment) {
  portalFetch("/api/portal/assignment")
    .then(({ assignment, setupNeeded }) => {
      if (setupNeeded) {
        cachedStudentAssignment = null;
        renderStudentCourseProgress();
        setCourseHomeLocked(true);
        portalAssignment.innerHTML = `
          <p class="portal-eyebrow">Course Access</p>
          <h3>No course access assigned</h3>
          <p>Course materials appear only after this account is set up as a client.</p>
          <p><a class="portal-inline-link" href="member.html">Return to member home</a></p>
        `;
        if (courseModuleRoadmap) courseModuleRoadmap.innerHTML = "<p>No course modules are available yet.</p>";
        if (portalReadingList) {
          portalReadingList.hidden = true;
        }
        return;
      }

      if (!assignment) {
        cachedStudentAssignment = null;
        renderStudentCourseProgress();
        setCourseHomeLocked(true);
        portalAssignment.innerHTML = `
          <p class="portal-eyebrow">Course Access</p>
          <h3>No course access assigned</h3>
          <p>Course materials appear only after this account is set up as a client.</p>
          <p><a class="portal-inline-link" href="member.html">Return to member home</a></p>
        `;
        if (courseModuleRoadmap) courseModuleRoadmap.innerHTML = "<p>Your module roadmap will appear after you are enrolled in a course.</p>";
        if (portalReadingList) {
          portalReadingList.hidden = true;
        }
        return;
      }

      cachedStudentAssignment = assignment;
      setCourseHomeLocked(false);
      renderStudentCourseProgress();

      if (portalReadingList && portalReadingContent) {
        portalReadingList.hidden = false;
        portalReadingContent.innerHTML = `<p>${textBlock(assignment.book_list, "Required reading will appear here soon.")}</p>`;
      }

      portalAssignment.innerHTML = `
        <p class="portal-eyebrow">${escapeHtml(assignment.course_code || assignment.account_type)}</p>
        <h3>${escapeHtml(assignment.path_title || assignment.portal_title)}</h3>
        <p>${textBlock(assignment.overview, "Your path overview will appear here soon.")}</p>
        <div class="portal-course-syllabus-grid">
          <div class="portal-assignment-detail">
            <strong>Learning Objectives</strong>
            <p>${textBlock(assignment.learning_objectives, "Your learning objectives will appear here soon.")}</p>
          </div>
          <div class="portal-assignment-detail">
            <strong>Completion Requirements</strong>
            <p>${textBlock(assignment.completion_requirements, "Your completion requirements will appear here soon.")}</p>
          </div>
        </div>
        <div class="portal-assignment-detail">
          <strong>Starting Lesson</strong>
          <p>${textBlock(assignment.first_lesson, "Your first lesson will appear here soon.")}</p>
        </div>
      `;

      if (courseModuleRoadmap) {
        const modules = assignment.modules || [];
        const progressByModule = new Map((assignment.module_progress || []).map((entry) => [Number(entry.module_index), entry]));
        courseModuleRoadmap.innerHTML = modules.length
          ? modules.map((module, index) => {
            const moduleProgress = progressByModule.get(index) || {};
            const status = moduleProgress.status || "not_started";
            return `
            <article class="portal-student-module">
              <div class="portal-student-module-heading">
                <span>Module ${index + 1}</span>
                <small class="portal-module-status" data-state="${escapeHtml(status)}">${escapeHtml(moduleStatusLabel(status))}</small>
              </div>
              <h4>${escapeHtml(module.title)}</h4>
              <p>${escapeHtml(module.objective || "Objective will be provided by your elder.")}</p>
              ${moduleProgress.elder_notes ? `
                <div class="portal-student-elder-guidance">
                  <strong>Elder Guidance</strong>
                  <p>${textBlock(moduleProgress.elder_notes)}</p>
                </div>
              ` : ""}
              <details>
                <summary>Module focus</summary>
                <p>${textBlock(module.lesson_summary, "Lesson summary will appear here soon.")}</p>
                <p>Assigned activities for this module appear in Assignments when your elder selects them for you.</p>
              </details>
            </article>
          `;
          }).join("")
          : "<p>Your module roadmap will appear here soon.</p>";
      }
    })
    .catch(() => {
      cachedStudentAssignment = null;
      renderStudentCourseProgress();
      setCourseHomeLocked(true);
      portalAssignment.innerHTML = "<p>Unable to load your assigned account path.</p>";
      if (courseModuleRoadmap) courseModuleRoadmap.innerHTML = "<p>Unable to load your module roadmap.</p>";
    });
}
