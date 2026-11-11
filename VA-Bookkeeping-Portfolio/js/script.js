
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");
    const logo = document.querySelector(".logo");

    if (navbar && navLinks && logo) {

        // Create the mobile menu button
        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.type = "button";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "main-navigation");
        menuButton.innerHTML = "<span></span><span></span><span></span>";

        navLinks.id = "main-navigation";

        // Place button beside the logo
        logo.insertAdjacentElement("afterend", menuButton);

        // Open and close the menu
        menuButton.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("is-open");

            menuButton.classList.toggle("active", isOpen);
            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetId = link.getAttribute("href");

                if (targetId && targetId.startsWith("#")) {
                    const target = document.querySelector(targetId);

                    if (target) {
                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                        history.replaceState(null, "", targetId);
                    }
                }

                navLinks.classList.remove("is-open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

        // Close menu when Escape is pressed
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                navLinks.classList.remove("is-open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });

        // Close menu when clicking outside the navigation
        document.addEventListener("click", function (event) {

            if (!navbar.contains(event.target)) {
                navLinks.classList.remove("is-open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });

    }


    // ==========================================
    // 2. SMOOTH SCROLLING FOR PAGE LINKS
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        // Skip navigation links because they are handled above
        if (navLinks && navLinks.contains(link)) {
            return;
        }

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }

        });

    });




// ==========================================
// 3. WEB3FORMS CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    const nameField = document.getElementById("client-name");
    const emailField = document.getElementById("client-email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    // Create a message area below the form
    const formStatus = document.createElement("p");

    formStatus.className = "form-status";
    formStatus.setAttribute("role", "status");
    formStatus.setAttribute("aria-live", "polite");

    contactForm.insertAdjacentElement("afterend", formStatus);

    // Make all fields required
    [nameField, emailField, subjectField, messageField].forEach(
        function (field) {
            if (field) {
                field.required = true;
            }
        }
    );

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Validate required fields
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailField.value.trim())) {

            emailField.setCustomValidity(
                "Please enter a valid email address."
            );

            emailField.reportValidity();
            emailField.setCustomValidity("");
            return;
        }

        // Show sending status
        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formStatus.textContent = "Sending your message...";
        formStatus.classList.add("visible");

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {

                formStatus.textContent =
                    "Thank you! Your message has been sent successfully. I'll get back to you soon.";

                contactForm.reset();

            } else {

                formStatus.textContent =
                    result.message ||
                    "Sorry, your message could not be sent. Please try again.";

            }

        } catch (error) {

            formStatus.textContent =
                "Connection error. Please check your internet connection and try again.";

            console.error("Contact form error:", error);

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

        }

    });

}



    // ==========================================
    // 4. UPDATE COPYRIGHT YEAR
    // ==========================================

    const copyrightYear = document.getElementById("current-year");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }


// ==========================================
// 5. PORTFOLIO CATEGORY FILTERS
// ==========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioProjects = document.querySelectorAll(".portfolio-project");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.filter;

        // Update active button
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        // Show matching projects
        portfolioProjects.forEach(function (project) {

            const projectCategory = project.dataset.category;

            if (
                selectedCategory === "all" ||
                projectCategory === selectedCategory
            ) {
                project.classList.remove("is-hidden");
            } else {
                project.classList.add("is-hidden");
            }

        });

    });

});


// ==========================================
// 6. REAL GOOGLE DRIVE PORTFOLIO FILES
// ==========================================


const projectSamples = {

    // ==========================================
    // 1. BOOKKEEPING
    // ==========================================

    "cash-journal": {
        category: "BOOKKEEPING",
        title: "Cash Receipts & Disbursements Journal",
        description: "A sample of recording daily business income and expenses.",
        driveLink: "PASTE_CASH_JOURNAL_PREVIEW_LINK_HERE"
    },

    "bank-categorization": {
        category: "BOOKKEEPING",
        title: "Monthly Bank Feed Categorization Report",
        description: "A sample of categorizing bank and credit card transactions.",
        driveLink: "PASTE_BANK_CATEGORIZATION_PREVIEW_LINK_HERE"
    },

    "bank-reconciliation": {
        category: "BOOKKEEPING",
        title: "Bank Reconciliation & Variance Report",
        description: "A sample of matching bank statement balances with recorded transactions.",
        driveLink: "PASTE_BANK_RECONCILIATION_PREVIEW_LINK_HERE"
    },

    "accounts-payable": {
        category: "BOOKKEEPING",
        title: "Accounts Payable Aging & Bill Tracker",
        description: "A sample of organizing vendor bills, due dates, and outstanding balances.",
        driveLink: "PASTE_ACCOUNTS_PAYABLE_PREVIEW_LINK_HERE"
    },

    "accounts-receivable": {
        category: "BOOKKEEPING",
        title: "Accounts Receivable Aging Dashboard",
        description: "A sample of tracking customer invoices, collections, and outstanding balances.",
        driveLink: "PASTE_ACCOUNTS_RECEIVABLE_PREVIEW_LINK_HERE"
    },


    // ==========================================
    // 2. ACCOUNTING
    // ==========================================

    journal: {
        category: "ACCOUNTING",
        title: "General Journal: Accruals & Prepayments",
        description: "A sample of transaction analysis and journal entries for accruals and prepayments.",
        driveLink: "https://docs.google.com/spreadsheets/d/1M5JdV8RFhz2FRhZztFyAIOdZzqOiD-j9/preview"
    },

    "ledger-mapping": {
        category: "ACCOUNTING",
        title: "General Ledger to Trial Balance Mapping",
        description: "A sample of posting journal entries and mapping ledger balances.",
        driveLink: "PASTE_LEDGER_MAPPING_PREVIEW_LINK_HERE"
    },

    "trial-balance": {
        category: "ACCOUNTING",
        title: "Unadjusted & Adjusted Trial Balance",
        description: "An illustrative trial balance worksheet showing debit and credit balances.",
        driveLink: "PASTE_TRIAL_BALANCE_PREVIEW_LINK_HERE"
    },

    "adjusting-entries": {
        category: "ACCOUNTING",
        title: "Year-End Adjusting Entries Schedule",
        description: "A sample schedule of year-end accrual and depreciation adjustments.",
        driveLink: "PASTE_ADJUSTING_ENTRIES_PREVIEW_LINK_HERE"
    },

    "financial-statements": {
        category: "ACCOUNTING",
        title: "Comparative Financial Statement Package",
        description: "An illustrative compilation of comparative financial statements.",
        driveLink: "PASTE_FINANCIAL_STATEMENTS_PREVIEW_LINK_HERE"
    },


    // ==========================================
    // 3. TAX ASSISTANCE
    // ==========================================

    "tax-archive": {
        category: "TAX ASSISTANCE",
        title: "Digital Tax Compliance Folder & Receipt Archive",
        description: "A sample folder structure for organizing tax documents and receipts.",
        driveLink: "PASTE_TAX_ARCHIVE_PREVIEW_LINK_HERE"
    },

    "vat-schedules": {
        category: "TAX ASSISTANCE",
        title: "VAT & Percentage Tax Computation Schedules",
        description: "An illustrative monthly tax computation and supporting schedule.",
        driveLink: "PASTE_VAT_SCHEDULES_PREVIEW_LINK_HERE"
    },

    "withholding-tax": {
        category: "TAX ASSISTANCE",
        title: "Annual Withholding Tax Reconciliation Worksheet",
        description: "A sample worksheet for organizing and reconciling withholding tax data.",
        driveLink: "PASTE_WITHHOLDING_TAX_PREVIEW_LINK_HERE"
    },

    "tax-tracker": {
        category: "TAX ASSISTANCE",
        title: "Digital Tax Documentation Index & Filing Tracker",
        description: "A sample index for maintaining tax records and tracking filing documentation.",
        driveLink: "PASTE_TAX_TRACKER_PREVIEW_LINK_HERE"
    },

    "tax-checklist": {
        category: "TAX ASSISTANCE",
        title: "Tax Filing Supporting Document Checklist",
        description: "A sample checklist for organizing documents needed for tax filing preparation.",
        driveLink: "PASTE_TAX_CHECKLIST_PREVIEW_LINK_HERE"
    },


    // ==========================================
    // 4. ADMINISTRATIVE SUPPORT
    // ==========================================

    "customer-database": {
        category: "ADMINISTRATIVE SUPPORT",
        title: "Master Customer Database",
        description: "A sample of a cleaned and organized customer information database.",
        driveLink: "PASTE_CUSTOMER_DATABASE_PREVIEW_LINK_HERE"
    },

    "operations-dashboard": {
        category: "ADMINISTRATIVE SUPPORT",
        title: "Operations & Project Tracking Dashboard",
        description: "A sample dashboard for tracking operational tasks and project progress.",
        driveLink: "PASTE_OPERATIONS_DASHBOARD_PREVIEW_LINK_HERE"
    },

    "folder-structure": {
        category: "ADMINISTRATIVE SUPPORT",
        title: "Cloud Folder Structure & Naming Guide",
        description: "A sample digital filing system with organized folders and naming conventions.",
        driveLink: "PASTE_FOLDER_STRUCTURE_PREVIEW_LINK_HERE"
    },

    "client-onboarding": {
        category: "ADMINISTRATIVE SUPPORT",
        title: "Client Onboarding Form & Document Template",
        description: "A sample questionnaire and document template for client onboarding.",
        driveLink: "PASTE_CLIENT_ONBOARDING_PREVIEW_LINK_HERE"
    },

    "rate-card": {
        category: "ADMINISTRATIVE SUPPORT",
        title: "Service Rate Card & Portfolio Brochure",
        description: "A sample visual document designed for presenting services and business information.",
        driveLink: "PASTE_RATE_CARD_PREVIEW_LINK_HERE"
    },


    // ==========================================
    // 5. PAYROLL & REPORTING
    // ==========================================

    "timesheet": {
        category: "PAYROLL & REPORTING",
        title: "Employee Timesheet & Attendance Consolidation",
        description: "A sample of organizing employee attendance and timesheet records.",
        driveLink: "PASTE_TIMESHEET_PREVIEW_LINK_HERE"
    },

    "payroll-register": {
        category: "PAYROLL & REPORTING",
        title: "Bi-Weekly Payroll Computation Register",
        description: "An illustrative gross-to-net payroll computation register.",
        driveLink: "PASTE_PAYROLL_REGISTER_PREVIEW_LINK_HERE"
    },

    "contribution-ledger": {
        category: "PAYROLL & REPORTING",
        title: "Statutory Contribution Tracking Ledger",
        description: "A sample tracker for employee contributions and payroll deductions.",
        driveLink: "PASTE_CONTRIBUTION_LEDGER_PREVIEW_LINK_HERE"
    },

    "monthly-report": {
        category: "PAYROLL & REPORTING",
        title: "Monthly Financial Performance Summary",
        description: "An illustrative monthly financial management summary.",
        driveLink: "PASTE_MONTHLY_REPORT_PREVIEW_LINK_HERE"
    },

    "cashflow-dashboard": {
        category: "PAYROLL & REPORTING",
        title: "Cash Flow & Expense Trend Dashboard",
        description: "A sample dashboard for reviewing cash flow and monthly expense trends.",
        driveLink: "PASTE_CASHFLOW_DASHBOARD_PREVIEW_LINK_HERE"
    }

};


// ==========================================
// 7. OPEN AND CLOSE PROJECT PREVIEWS
// ==========================================

const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalSample = document.getElementById("modal-sample");

const projectViewButtons = document.querySelectorAll(".project-view-btn");
const modalCloseButton = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");


function openProjectPreview(projectId) {

    const project = projectSamples[projectId];

    if (!project || !projectModal) {
        return;
    }

    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    // Clear previous preview
    modalSample.replaceChildren();

    const isPlaceholder = project.driveLink.startsWith("PASTE_");

    if (isPlaceholder || !project.driveLink.trim()) {

        const message = document.createElement("p");

        message.textContent =
            "This sample is being prepared. Please check back soon.";

        modalSample.appendChild(message);

    } else {

        // Display the actual Google Drive file
        const previewFrame = document.createElement("iframe");

        previewFrame.src = project.driveLink;
        previewFrame.title = project.title + " portfolio sample";
        previewFrame.width = "100%";
        previewFrame.height = "550";
        previewFrame.loading = "lazy";
        previewFrame.setAttribute("allowfullscreen", "");

        previewFrame.style.border = "0";
        previewFrame.style.borderRadius = "8px";

        modalSample.appendChild(previewFrame);

    }

    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (modalCloseButton) {
        modalCloseButton.focus();
    }

}


function closeProjectPreview() {

    if (!projectModal) {
        return;
    }

    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");

    // Stop the embedded document when closing
    modalSample.replaceChildren();

    document.body.style.overflow = "";

}



// Attach preview buttons
projectViewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const projectId = button.dataset.project;

        openProjectPreview(projectId);

    });

});


// Close using the X button
if (modalCloseButton) {

    modalCloseButton.addEventListener("click", closeProjectPreview);

}


// Close when clicking outside the preview
if (modalOverlay) {

    modalOverlay.addEventListener("click", closeProjectPreview);

}


// Close when pressing Escape
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeProjectPreview();
    }

});


    // ==========================================
    // 8. CONSOLE MESSAGE
    // ==========================================

    console.log("Portfolio website successfully loaded!");

});


    // ==========================================
    // 9. RESUME POPUP
    // ==========================================

    const resumeButton = document.getElementById("resume-btn");
    const resumeModal = document.getElementById("resume-modal");
    const resumeCloseButton = document.getElementById("resume-close");

    if (resumeButton && resumeModal && resumeCloseButton) {

        // Open resume popup
        resumeButton.addEventListener("click", function () {
            resumeModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        // Close resume popup
        function closeResumeModal() {
            resumeModal.classList.remove("active");
            document.body.style.overflow = "";
        }

        resumeCloseButton.addEventListener("click", closeResumeModal);

        // Close when clicking outside the popup content
        resumeModal.addEventListener("click", function (event) {
            if (event.target === resumeModal) {
                closeResumeModal();
            }
        });

        // Close when pressing Escape
        document.addEventListener("keydown", function (event) {
            if (
                event.key === "Escape" &&
                resumeModal.classList.contains("active")
            ) {
                closeResumeModal();
            }
        });

    }
	
	
// ==========================================
// QUICKBOOKS CERTIFICATE POPUP
// ==========================================

const quickbooksCertificateButton =
    document.getElementById("quickbooks-certificate-btn");

const quickbooksCertificateModal =
    document.getElementById("quickbooks-certificate-modal");

const quickbooksCertificateClose =
    document.getElementById("quickbooks-certificate-close");

if (
    quickbooksCertificateButton &&
    quickbooksCertificateModal &&
    quickbooksCertificateClose
) {

    quickbooksCertificateButton.addEventListener("click", function () {

        quickbooksCertificateModal.classList.add("active");
        document.body.style.overflow = "hidden";

    });

    function closeQuickBooksCertificate() {

        quickbooksCertificateModal.classList.remove("active");
        document.body.style.overflow = "";

    }

    quickbooksCertificateClose.addEventListener(
        "click",
        closeQuickBooksCertificate
    );

    quickbooksCertificateModal.addEventListener("click", function (event) {

        if (event.target === quickbooksCertificateModal) {
            closeQuickBooksCertificate();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            quickbooksCertificateModal.classList.contains("active")
        ) {
            closeQuickBooksCertificate();
        }

    });

}

