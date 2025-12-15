## FEATURE:

I want to build simple Github - Dashboard app.

The app should be implemented in React 18.3 with TS (compatible version) and Vite, with the Zod lib for schemas/models/validations. Since REST communication is not that complex here lets proceed with just axios lib and react patterns for handling requests. As for Component lib, we could use shadcn in combination with tailwind so we can easily implement styleguide and components. Versions of libs should be compatible within each other, so use Context7 to gather some info about it.

Folder structure should follow some nice guidelines like this: https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc

Feature description:

    We need to have public page which will allows user to search the user by their name and present user in public profile. This page needs to strictly follow the guildelines, stylesheet and designs provided in Figma (see documentation part). So we will gonna have searching field, where user will insert searching string, and the field will provides options from which you can choose user. When clicking on one of the output option, we will gonna have the profile present with:
        - Avatar, name, username
        - Bio, location, website
        - Stats: Public Repos | Followers | Following
        - Join date
        - Repos count

    This app will have the dark and light mode and hast to be fully responsive (see in documentation we will have 3 states of responsiveness).

    API GET https://api.github.com/users/{username} for the fetching users.

## EXAMPLES:

## DOCUMENTATION:

File structure: https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc

FIGMA:

The Design system - colors: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-318&m=dev - typography: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-136&m=dev - spacing: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-169&m=dev - radius: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-256&m=dev

Parts of designs
Search bar - lightmode: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-503&m=dev - darkmode: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-588&m=dev

Design of page light mode - Desktop version: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-705&m=dev - Tablet version: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-688&m=dev - Mobile version: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-841&m=dev - Example of hover: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-1235&m=dev - Example of focus: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-1338&m=dev - Example of error: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-1522&m=dev

    Some examples for dark mode from which you can get the coloring for dark mode in general: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-244&m=dev

## OTHER CONSIDERATIONS:

The app should follow general patterns. Like handling loading states, handling no data found states. 
Code should be clean, we want to have everything typed correctly and not violating any of clean/quality code principles.

