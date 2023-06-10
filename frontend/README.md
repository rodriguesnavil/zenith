Zenith App Folder Structure:

```
/frontend
  /src
    /components
      /auth
        - Login.js
        - RoleSelect.js
      /dashboard
        - Dashboard.js
        /author
          - PaperSubmission.js
          - AuthorPapers.js
        /reviewer
          - PaperReview.js
          - ReviewerPapers.js
        /editor
          - ManageReviews.js
          - EditorPapers.js
      /purchase
        - PurchasePaper.js
        - Reader.js
      /layout
        - Navbar.js
        - Footer.js
        - Navbar.js
      /home
        - Homepage.js
        - LatestPublications.js
        - FAQs.js
      /shared
        - MetamaskButton.js
        - ZenithBalance.js
    /helpers
      - EthereumHelper.js
      - IPFSHelper.js
      - ApiHelper.js
    /contexts
      - EthereumContext.js
      - UserContext.js
    /styles
      /materialUI
        - Theme.js
      /css
        - Main.css
    - Routes.js
    - App.js
    - index.js
  /public
    - index.html
  /tests
    - Component.test.js
  package.json
  README.md
```