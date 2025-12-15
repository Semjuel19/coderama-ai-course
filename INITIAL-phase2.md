## FEATURE:

In the app we need to integrate the OAuth flow to let user logg in into the github and see his profile with his projects.

We would need to implement the navbar which will have the button "Sign in with GitHub" on the most right corner. The app should have implment smooth oauth flow with session management login/logout. Once logged in, the navbar content will contain the Avatar and username and next to it button to logout. Once logged in, we want to have protected route for the profile of the user. In profile page, we want to have following content:

  - Show public repos list (top 10):
    - Repo name (link na GitHub)
    - Description
    - Stars count
    - Primary language
    - Last updated

For this phase we do not have figma desings. 

The oauth flow in github should follow the guide described in Documentation section and adapt it to our needs.

## EXAMPLES:

## DOCUMENTATION:

Github Oauth flow: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

## OTHER CONSIDERATIONS:

As we do not have FIGMA design, we should try to make those new page as close as possible with actual features we have (design wise). We need to strictly follow design system we have. 